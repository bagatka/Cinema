import {Component, Input, OnInit} from '@angular/core';

import {Observable} from 'rxjs';

import {Cinema} from '../../Interfaces/cinema';
import {Filter} from '../../Interfaces/filter';
import {ShowParameters} from '../../Interfaces/show-parameters';
import {Show} from '../../Interfaces/show';

import {ShowService} from '../../Services/show.service';

@Component({
  selector: 'app-cinema-card',
  templateUrl: './cinema-card.component.html',
  styleUrls: ['./cinema-card.component.css']
})
export class CinemaCardComponent implements OnInit {

  @Input() cinema: Cinema;
  @Input() filter: Filter;
  @Input() date: string;
  showParameters: ShowParameters;
  shows$: Observable<Show[]>;

  constructor(
    private showService: ShowService
  ) {
  }

  ngOnInit(): void {
    this.showParameters.cinemaName = this.cinema.name;
    this.showParameters.filmTitle = this.filter.title;
    this.showParameters.date = this.date;
    this.shows$ = this.showService.getShowsByParameters(this.showParameters);
  }
}
