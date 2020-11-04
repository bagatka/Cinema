import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {Observable, Subject} from 'rxjs';
import {debounceTime, switchMap} from 'rxjs/operators';

import {Cinema} from '../../../Interfaces/cinema';

import {SnackbarMessages} from '../../../Enums/snackbar-messages.enum';

import {SnackbarService} from '../../../Services/snackbar.service';
import {CinemaService} from '../../../Services/cinema.service';

@Component({
  selector: 'app-admin-all-cinemas',
  templateUrl: './admin-all-cinemas.component.html',
  styleUrls: ['./admin-all-cinemas.component.css']
})
export class AdminAllCinemasComponent implements OnInit, AfterViewInit {

  cinemas$: Observable<Cinema[]>;
  private searchTerms = new Subject<string>();
  searchName: string;

  constructor(
    private cinemaService: CinemaService,
    private snackBarService: SnackbarService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  public ngOnInit(): void {
    this.cinemas$ = this.searchTerms.pipe(
      debounceTime(300),
      switchMap((title: string) => {
        this.updateQuery();
        return this.cinemaService.getCinemasByName(title);
      }),
    );
  }

  public ngAfterViewInit(): void {
    setTimeout(() => {
      this.searchFromQuery();
    }, 0);
  }

  private searchFromQuery(): void {
    this.searchName = this.route.snapshot.queryParamMap.get('name');
    if (this.searchName) {
      this.search(this.searchName);
    }
  }

  search(title: string): void {
    this.searchTerms.next(title);
  }

  delete(id: number): void {
    this.cinemaService.deleteCinema(id).subscribe(
      () => {
        this.snackBarService.displaySnackbar(SnackbarMessages.deleted);
      },
      error => {
        if (error) {
          this.snackBarService.displaySnackbar(SnackbarMessages.error);
        }
      }
    );
    this.search(this.searchName);
  }

  updateQuery(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        name: this.searchName
      },
      skipLocationChange: false
    });
  }

}
