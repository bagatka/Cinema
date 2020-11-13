import {Component, OnInit} from '@angular/core';

import {Observable} from 'rxjs';

import {Order} from '../../Interfaces/order';

import {OrderService} from '../../Services/order.service';
import {DateTransformService} from '../../Services/date-transform.service';

@Component({
  selector: 'app-user-tickets',
  templateUrl: './user-tickets.component.html',
  styleUrls: ['./user-tickets.component.css']
})
export class UserTicketsComponent implements OnInit {

  orders$: Observable<Order[]>;

  constructor(
    private orderService: OrderService,
    private dateTransform: DateTransformService
  ) {
  }

  ngOnInit(): void {
    this.orders$ = this.orderService.getUserOrders(true);
  }

  transformDate(dateString: string): string {
    return  this.dateTransform.formateDateHM(dateString);
  }
}
