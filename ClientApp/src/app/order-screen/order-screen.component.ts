import {Component, OnInit, ViewChild} from '@angular/core';
import {MatStep, MatStepper} from '@angular/material/stepper';
import {ActivatedRoute, Router} from '@angular/router';

import {Subject} from 'rxjs';
import {debounceTime, switchMap} from 'rxjs/operators';

import {Filter} from '../Interfaces/filter';
import {ShowParameters} from '../Interfaces/show-parameters';
import {Show} from '../Interfaces/show';
import {Hall} from '../Interfaces/hall';

import {ShowService} from '../Services/show.service';
import {DateTransformService} from '../Services/date-transform.service';
import {HallService} from '../Services/hall.service';
import {SeatPosition} from '../Interfaces/seat-position';
import {OrderDetails} from '../Interfaces/order-details';
import {OrderService} from '../Services/order.service';
import {SnackbarService} from '../Services/snackbar.service';
import {SnackbarMessages} from '../Enums/snackbar-messages.enum';
import {TypePrice} from '../Interfaces/type-price';

@Component({
  selector: 'app-order-screen',
  templateUrl: './order-screen.component.html',
  styleUrls: ['./order-screen.component.css']
})
export class OrderScreenComponent implements OnInit {

  @ViewChild('stepper') stepper: MatStepper;
  @ViewChild('cinemaStep') cinemaStep: MatStep;
  @ViewChild('seatsStep') seatsStep: MatStep;
  @ViewChild('servicesStep') servicesStep: MatStep;
  @ViewChild('confirmStep') confirmStep: MatStep;

  shows;
  filmTitle: string;
  filmPosterUrl: string;
  filter: Filter = {};
  dates: string[] = [];
  showParameters: ShowParameters = {
    actual: true
  };
  selectedShowId: number;
  selectedShow: Show;
  selectedHall: Hall;
  selectedSeats: SeatPosition[];
  soldSeats: SeatPosition[];
  selectedServices = [];
  selectedShowPrices: TypePrice[] = [];
  totalPrice: number;
  private orderDetails: OrderDetails;
  private searchTerms = new Subject<Filter>();
  private searchSelectedShow = new Subject<number>();
  private searchSoldSeats = new Subject<number>();
  private searchSelectedHall = new Subject<number>();
  private searchSelectedShowPrice = new Subject<number>();

  constructor(
    private showService: ShowService,
    private hallService: HallService,
    private orderService: OrderService,
    private snackbarService: SnackbarService,
    private route: ActivatedRoute,
    private router: Router,
    private dateTransform: DateTransformService
  ) {
  }

  ngOnInit(): void {
    this.parseQuery();
    this.checkFilterDates();

    this.searchTerms.pipe(
      debounceTime(400),
      switchMap((showParameters: ShowParameters) => this.showService.getShowsByParameters(showParameters))
    ).subscribe(shows => this.shows = this.groupBy(shows, show => {
      return this.dateTransform.formateDateDMY(new Date(show.startDateTime));
    }));

    this.searchSelectedShowPrice.pipe(
      switchMap((showId: number) => this.showService.getSeatPricesByShowId(showId))
    ).subscribe(typePrices => {
      this.selectedShowPrices = typePrices;
    });

    this.searchSelectedHall.pipe(
      switchMap((hallId: number) => this.hallService.getHallById(hallId))
    ).subscribe(hall => {
      this.selectedHall = hall;
      this.initializeServices();
    });

    this.searchSoldSeats.pipe(
      switchMap((showId: number) => this.showService.getSoldSeatsByShowId(showId))
    ).subscribe(soldSeats => {
      this.soldSeats = soldSeats;
      this.searchShowPricesByShowId(this.selectedShowId);
    });

    this.searchSelectedShow.pipe(
      switchMap((showId: number) => this.showService.getShowById(showId))
    ).subscribe(show => {
      this.selectedShow = show;
      this.searchSoldSeatsByShowId(show.id);
      this.searchHallById(show.hallId);
    });
  }

  clearNextSteps(stepper): void {
    const index = stepper.selectedIndex;
    switch (index) {
      case 0:
        this.cinemaStep.completed = false;
        this.seatsStep.completed = false;
        this.seatsStep.reset();
        this.selectedShowId = null;
        this.selectedHall = null;
        this.selectedSeats = [];
        this.selectedServices = [];
        this.selectedShowPrices = [];
      case 1:
        this.servicesStep.reset();
        this.servicesStep.completed = false;
      case 2:
        this.confirmStep.reset();
        this.totalPrice = 0;
        this.confirmStep.completed = false;
    }
  }

  onFilterChange(filter: Filter): void {
    this.filter = filter;
    this.searchShows();
  }

  groupCinemasBy(cinemas): any {
    return this.groupBy(cinemas, cinema => cinema.cinemaName);
  }

  selectShow(showId: number): void {
    this.searchShowById(showId);
    this.selectedShowId = showId;
    this.changeStep(1);
  }

  getTimeHM(dateString?: string): string {
    return this.dateTransform.formateDateHM(dateString);
  }

  updateSelectedSeats(selectedSeats: SeatPosition[]): void {
    this.selectedSeats = selectedSeats;
    this.selectedSeats.map(selectedSeat => {
        selectedSeat.price = this.selectedShowPrices.find(typePrice => typePrice.seatTypeId === selectedSeat.seatTypeId).price;
        return selectedSeat;
      }
    );
    if (this.selectedSeats.length === 0) {
      this.seatsStep.completed = false;
    }
  }

  confirmSeats(): void {
    this.changeStep(2);
  }

  setSelectedServiceNumber(serviceId: number, isIncrease: boolean): void {
    const index = this.selectedServices.findIndex(selectedService => selectedService.hallServiceId === serviceId);
    if (isIncrease) {
      this.selectedServices[index].number++;
    } else {
      this.selectedServices[index].number > 0 ? this.selectedServices[index].number-- : this.selectedServices[index].number = 0;
    }
  }

  confirmServices(): void {
    this.updateOrderDetails();
    this.changeStep(3);
  }

  getServiceName(id: number): string {
    const service = this.selectedHall.hallServices.find(hallService => hallService.id === id);
    return service.name;
  }

  getServicePrice(id: number): number {
    const service = this.selectedHall.hallServices.find(hallService => hallService.id === id);
    return service.price;
  }

  buy(): void {
    this.selectedServices = this.removeUnselectedServices();
    this.orderService.buy(this.orderDetails).subscribe(
      () => this.router.navigateByUrl('/profile/tickets'),
      () => {
        this.snackbarService.displaySnackbar(SnackbarMessages.error);
      }
    );
  }

  private initializeServices(): void {
    this.selectedServices = [];
    this.selectedHall.hallServices.forEach(service => {
      this.selectedServices.push({hallServiceId: service.id, number: 0});
    });
  }

  private updateOrderDetails(): void {
    let total = 0;
    this.selectedSeats.forEach(selectedSeat => total += selectedSeat.price);
    this.selectedServices.forEach(service => {
      const addon = this.selectedHall.hallServices.find(hallService => hallService.id === service.hallServiceId);
      total += addon.price * service.number;
    });
    this.totalPrice = total;
    this.orderDetails = {
      showId: this.selectedShowId,
      seatIds: this.selectedSeats.map(seat => seat.id),
      orderAddons: this.selectedServices,
      totalPrice: total
    };
  }

  private removeUnselectedServices(): any[] {
    return this.selectedServices.filter(service => service.number > 0);
  }

  private groupBy(array, keyGetter): ArrayLike<any> {
    const map = new Map();
    array.forEach((item) => {
      const key = keyGetter(item);
      const collection = map.get(key);
      if (!collection) {
        map.set(key, [item]);
      } else {
        collection.push(item);
      }
    });
    return Array.from(map);
  }

  // TODO: Create MapperService

  private searchShows(): void {
    this.showParameters.startDate = this.filter.startDate;
    this.showParameters.endDate = this.filter.endDate;
    this.showParameters.title = this.filmTitle;
    this.showParameters.city = this.filter?.city;
    this.showParameters.cinemaName = this.filter?.cinemaName;
    this.searchTerms.next(this.showParameters);
  }

  private searchShowById(showId: number): void {
    this.searchSelectedShow.next(showId);
  }

  private searchHallById(hallId: number): void {
    this.searchSelectedHall.next(hallId);
  }

  private searchSoldSeatsByShowId(showId: number): void {
    this.searchSoldSeats.next(showId);
  }

  private searchShowPricesByShowId(showId: number): void {
    this.searchSelectedShowPrice.next(showId);
  }

  private checkFilterDates(): void {
    if (!this.filter.startDate) {
      const today = new Date();
      this.filter.startDate = this.dateTransform.formateDate(today);
    }
    if (!this.filter.endDate) {
      const today = new Date();
      this.filter.endDate = this.dateTransform.formateDate(today);
    }
  }

  private changeStep(index: number): void {
    this.stepper.selected.completed = true;
    this.stepper.selectedIndex = index;
  }

  // TODO: Create custom query service

  private parseQueryParameter(parameter: string): string {
    return this.route.snapshot.queryParamMap.get(parameter);
  }

  private parseQuery(): void {
    this.filmTitle = this.parseQueryParameter('title');
    this.filter.city = this.parseQueryParameter('city');
    this.filter.cinemaName = this.parseQueryParameter('cinemaName');
    this.filter.seats = Number(this.parseQueryParameter('seats'));
    if (this.filter.seats === 0) {
      this.filter.seats = 1;
    }
    this.filter.startDate = this.parseQueryParameter('startDate');
    this.filter.endDate = this.parseQueryParameter('endDate');
    this.filmPosterUrl = this.parseQueryParameter('posterUrl');
  }
}
