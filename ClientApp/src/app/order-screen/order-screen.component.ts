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
  private searchTerms = new Subject<Filter>();
  private searchSelectedShow = new Subject<number>();
  private searchSelectedHall = new Subject<number>();

  constructor(
    private showService: ShowService,
    private hallService: HallService,
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

    this.searchSelectedShow.pipe(
      switchMap((showId: number) => this.showService.getShowById(showId))
    ).subscribe(show => {
      this.selectedShow = show;
      this.searchSelectedHall.next(show.hallId);
    });

    this.searchSelectedHall.pipe(
      switchMap((hallId: number) => this.hallService.getHallById(hallId))
    ).subscribe(hall => {
      this.selectedHall = hall;
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
      case 1:
        this.servicesStep.reset();
        this.selectedSeats = [];
        this.servicesStep.completed = false;
      case 2:
        this.confirmStep.reset();
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
  }

  confirmSeats(): void {
    this.changeStep(2);
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
