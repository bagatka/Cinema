import {Component} from '@angular/core';

import {Film} from '../film';

@Component({
  selector: 'app-film-card',
  templateUrl: './film-card.component.html',
  styleUrls: ['./film-card.component.css']
})
export class FilmCardComponent {

  @Input filmData: Film;
}
