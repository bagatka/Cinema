import {OnInit, Component} from '@angular/core';

import {Order} from '../../Interfaces/order';
import {OrderService} from '../../Services/order.service';
import {Observable} from 'rxjs';
import {DateTransformService} from '../../Services/date-transform.service';

@Component({
  selector: 'app-user-history',
  templateUrl: './user-history.component.html',
  styleUrls: ['./user-history.component.css']
})
export class UserHistoryComponent implements OnInit {

  orders$: Observable<Order[]>;

  constructor(
    private orderService: OrderService,
    private dateTransform: DateTransformService
  ) {
  }

  ngOnInit(): void {
    this.orders$ = this.orderService.getUserOrders(false);
  }

  transformDate(dateString: string): string {
    return  this.dateTransform.formateDateHM(dateString);
  }
}
