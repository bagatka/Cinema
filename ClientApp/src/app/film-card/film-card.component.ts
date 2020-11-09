import {Component, EventEmitter, Input, Output} from '@angular/core';

import {Film} from '../Interfaces/film';

@Component({
  selector: 'app-film-card',
  templateUrl: './film-card.component.html',
  styleUrls: ['./film-card.component.css']
})
export class FilmCardComponent {

  @Input() filmData: Film;
  @Output() buyTicket = new EventEmitter<object>();

  buy(): void {
    this.buyTicket.emit({
      title: this.filmData.title,
      posterUrl: this.filmData.posterUrl
    });
  }
}
