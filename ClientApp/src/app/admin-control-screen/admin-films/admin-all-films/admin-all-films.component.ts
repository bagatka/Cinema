import {Component, OnInit, AfterViewInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {Observable, Subject} from 'rxjs';
import {debounceTime, switchMap} from 'rxjs/operators';

import {Film} from '../../../Interfaces/film';

import {SnackbarMessages} from '../../../Enums/snackbar-messages.enum';

import {FilmService} from '../../../Services/film.service';
import {SnackbarService} from '../../../Services/snackbar.service';

@Component({
  selector: 'app-admin-all-films',
  templateUrl: './admin-all-films.component.html',
  styleUrls: ['./admin-all-films.component.css']
})
export class AdminAllFilmsComponent implements OnInit, AfterViewInit {

  films$: Observable<Film[]>;
  private searchTerms = new Subject<string>();
  searchTitle: string;

  constructor(
    private filmService: FilmService,
    private snackBarService: SnackbarService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  public ngOnInit(): void {
    this.films$ = this.searchTerms.pipe(
      debounceTime(300),
      switchMap((title: string) => {
        this.updateQuery();
        return this.filmService.getFilmsByName(title);
      }),
    );
  }

  public ngAfterViewInit(): void {
    setTimeout(() => {
      this.searchFromQuery();
    }, 0);
  }

  private searchFromQuery(): void {
    this.searchTitle = this.route.snapshot.queryParamMap.get('title');
    if (this.searchTitle) {
      this.search(this.searchTitle);
    }
  }

  search(title: string): void {
    this.searchTerms.next(title);
  }

  delete(id: number): void {
    this.filmService.deleteFilm(id).subscribe(
      () => {
        this.snackBarService.displaySnackbar(SnackbarMessages.deleted);
      },
      error => {
        if (error) {
          this.snackBarService.displaySnackbar(SnackbarMessages.error);
        }
      }
    );
    this.search(this.searchTitle);
  }

  updateQuery(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        title: this.searchTitle
      },
      skipLocationChange: false
    });
  }
}
