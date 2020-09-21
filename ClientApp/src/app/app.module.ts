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

import {AppRoutingModule} from './app-routing.module';
import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';

import {AppComponent} from './app.component';
import {NavbarComponent} from './navbar/navbar.component';
import {CarouselComponent} from './carousel/carousel.component';
import {HomeScreenComponent} from './home-screen/home-screen.component';
import {SearchBarComponent} from './search-bar/search-bar.component';

import {InMemoryDataService} from './in-memory-data.service';
<<<<<<< HEAD
import {SearchScreenComponent} from './search-screen/search-screen.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {SearchFiltersComponent} from './search-filters/search-filters.component';


=======
import { SearchScreenComponent } from './search-screen/search-screen.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import { SearchFiltersComponent } from './search-filters/search-filters.component';
>>>>>>> 818ef25c5f4f86fab4c6a7212b847ac52c014a93


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CarouselComponent,
    HomeScreenComponent,
    SearchBarComponent,
    SearchScreenComponent,
    SearchFiltersComponent
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
<<<<<<< HEAD
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
=======
>>>>>>> 818ef25c5f4f86fab4c6a7212b847ac52c014a93
    FlexLayoutModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, {dataEncapsulation: false}
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
