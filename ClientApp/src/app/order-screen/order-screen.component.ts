import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {MatStep, MatStepper} from '@angular/material/stepper';
import {ActivatedRoute, Router} from '@angular/router';

import {Observable, Subject} from 'rxjs';
import {debounceTime, switchMap} from 'rxjs/operators';

import {Filter} from '../Interfaces/filter';
import {Cinema} from '../Interfaces/cinema';

import {CinemaService} from '../Services/cinema.service';

@Component({
  selector: 'app-order-screen',
  templateUrl: './order-screen.component.html',
  styleUrls: ['./order-screen.component.css']
})
export class OrderScreenComponent implements OnInit, AfterViewInit {

  @ViewChild('stepper') stepper: MatStepper;
  @ViewChild('cinemaStep') cinemaStep: MatStep;
  @ViewChild('seatsStep') seatsStep: MatStep;
  @ViewChild('servicesStep') servicesStep: MatStep;
  @ViewChild('confirmStep') confirmStep: MatStep;

  cinemas$: Observable<Cinema[]>;
  filmTitle: string;
  filmPosterUrl: string;
  filter: Filter = {};
  dates: string[] = [];
  private searchTerms = new Subject<Filter>();

  constructor(
    private cinemaService: CinemaService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.parseQuery();
    this.cinemas$ = this.searchTerms.pipe(
      debounceTime(400),
      switchMap((filter: Filter) => this.cinemaService.getCinemasByFilter(filter))
    );
    this.countDates();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.searchFromQuery();
    }, 0);
  }

  clearNextSteps(stepper): void {
    const index = stepper.selectedIndex;
    switch (index) {
      case 0:
        this.seatsStep.reset();
      case 1:
        this.servicesStep.reset();
      case 2:
        this.confirmStep.reset();
    }
  }

  onFilterChange(filter: Filter): void {
    this.filter = filter;
    this.search();
  }

  private countDates(): void {
    if (this.filter.startDate && this.filter.endDate) {
      const startDate = new Date(this.filter.startDate);
      const endDate = new Date(this.filter.endDate);
      const difference = endDate.getTime() - startDate.getTime();
      const count = Math.ceil(difference / (1000 * 3600 * 24));
      for (let i = 0; i < count; i++) {
        const date = new Date();
        date.setDate(startDate.getDate() + i);
        this.dates.push(`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`);
      }
    }
  }

  private search(): void {
    this.searchTerms.next(this.filter);
  }

  private searchFromQuery(): void {
    this.parseQuery();
    this.search();
  }

  private changeStep(index: number): void {
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
