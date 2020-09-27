import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {Film} from '../../film';

@Component({
  selector: 'app-user-tickets',
  templateUrl: './user-tickets.component.html',
  styleUrls: ['./user-tickets.component.css']
})
export class UserTicketsComponent {

  films$: Observable<Film[]>;
}
