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
    UserBookmarksComponent
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
    FlexLayoutModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
