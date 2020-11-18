import {OnInit, Component} from '@angular/core';

import {Observable} from 'rxjs';

import * as moment from 'moment';

import {Order} from '../../Interfaces/order';

import {OrderService} from '../../Services/order.service';

@Component({
  selector: 'app-user-history',
  templateUrl: './user-history.component.html',
  styleUrls: ['./user-history.component.css']
})
export class UserHistoryComponent implements OnInit {

  orders$: Observable<Order[]>;

  constructor(
    private orderService: OrderService
  ) {
  }

  ngOnInit(): void {
    this.orders$ = this.orderService.getUserOrders(false);
  }

  transformDate(dateString: string): string {
    return moment.utc(dateString).local().format('hh:mm');
  }
}
