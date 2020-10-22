import {Component, Input} from '@angular/core';

import {Film} from '../Interfaces/film';

@Component({
  selector: 'app-film-card',
  templateUrl: './film-card.component.html',
  styleUrls: ['./film-card.component.css']
})
export class FilmCardComponent {

  @Input() filmData: Film;

  buttonPress(): void {
    console.log(this.filmData);
    console.log(this.filmData.title);
  }
}
