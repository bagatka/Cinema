import {Component, OnInit} from '@angular/core';

import {Film} from '../Interfaces/film';
import {FilmService} from '../Services/film.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.css']
})
export class HomeScreenComponent implements OnInit {

  films$: Observable<Film[]>;

  private loadFilms(): void {
    this.films$ = this.filmService.getFilms();
  }

  ngOnInit(): void {
    this.loadFilms();
  }

  constructor(private filmService: FilmService) {
  }

}
