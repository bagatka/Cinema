import {Component, OnInit} from '@angular/core';

import {Observable} from 'rxjs';

import * as moment from 'moment';

import {Order} from '../../Interfaces/order';

import {OrderService} from '../../Services/order.service';

@Component({
  selector: 'app-user-tickets',
  templateUrl: './user-tickets.component.html',
  styleUrls: ['./user-tickets.component.css']
})
export class UserTicketsComponent implements OnInit {

  orders$: Observable<Order[]>;

  constructor(
    private orderService: OrderService
  ) {
  }

  ngOnInit(): void {
    this.orders$ = this.orderService.getUserOrders(true);
  }

  transformDate(dateString: string): string {
    return moment.utc(dateString).local().format('hh:mm');
  }
}
