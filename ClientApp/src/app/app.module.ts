import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';

import {FlexLayoutModule} from '@angular/flex-layout';

import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {NavbarComponent} from './navbar/navbar.component';
import {CarouselComponent} from './carousel/carousel.component';
import {HomeScreenComponent} from './home-screen/home-screen.component';
import {SearchBarComponent} from './search-bar/search-bar.component';
import {SearchScreenComponent} from './search-screen/search-screen.component';
import {SearchFiltersComponent} from './search-filters/search-filters.component';
import { FilmCardComponent } from './film-card/film-card.component';
import { AccountFormComponent } from './account-form/account-form.component';
import { RegistrationScreenComponent } from './registration-screen/registration-screen.component';
import { UserControlScreenComponent } from './user-control-screen/user-control-screen.component';
import { UserSettingsComponent } from './user-control-screen/user-settings/user-settings.component';
import { UserBookmarksComponent } from './user-control-screen/user-bookmarks/user-bookmarks.component';
import { AdminControlScreenComponent } from './admin-control-screen/admin-control-screen.component';
import { UserTicketsComponent } from './user-control-screen/user-tickets/user-tickets.component';
import { UserHistoryComponent } from './user-control-screen/user-history/user-history.component';
import { AdminFilmsComponent } from './admin-control-screen/admin-films/admin-films.component';
import { AdminSettingsComponent } from './admin-control-screen/admin-settings/admin-settings.component';
import { AdminCinemasComponent } from './admin-control-screen/admin-cinemas/admin-cinemas.component';
import { AdminShowsComponent } from './admin-control-screen/admin-shows/admin-shows.component';
import { AdminServicesComponent } from './admin-control-screen/admin-services/admin-services.component';
import { AdminUsersComponent } from './admin-control-screen/admin-users/admin-users.component';
import { AdminAddFilmComponent } from './admin-control-screen/admin-films/admin-add-film/admin-add-film.component';
import { AdminAddCinemaComponent } from './admin-control-screen/admin-cinemas/admin-add-cinema/admin-add-cinema.component';
import { AdminAddServiceComponent } from './admin-control-screen/admin-services/admin-add-service/admin-add-service.component';
import { AdminAddShowComponent } from './admin-control-screen/admin-shows/admin-add-show/admin-add-show.component';
import { AdminAllFilmsComponent } from './admin-control-screen/admin-films/admin-all-films/admin-all-films.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CarouselComponent,
    HomeScreenComponent,
    SearchBarComponent,
    SearchScreenComponent,
    SearchFiltersComponent,
    FilmCardComponent,
    AccountFormComponent,
    RegistrationScreenComponent,
    UserControlScreenComponent,
    UserSettingsComponent,
    UserBookmarksComponent,
    UserTicketsComponent,
    UserHistoryComponent,
    AdminControlScreenComponent,
    AdminFilmsComponent,
    AdminSettingsComponent,
    AdminCinemasComponent,
    AdminShowsComponent,
    AdminServicesComponent,
    AdminUsersComponent,
    AdminAddFilmComponent,
    AdminAddCinemaComponent,
    AdminAddServiceComponent,
    AdminAddShowComponent,
    AdminAllFilmsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatDividerModule,
    MatExpansionModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    FlexLayoutModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
