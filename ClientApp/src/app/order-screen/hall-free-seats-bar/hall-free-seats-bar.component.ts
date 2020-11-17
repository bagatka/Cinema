import {Component, EventEmitter, Input, Output} from '@angular/core';

import {Show} from '../../Interfaces/show';

import * as moment from 'moment';

@Component({
  selector: 'app-hall-free-seats-bar',
  templateUrl: './hall-free-seats-bar.component.html',
  styleUrls: ['./hall-free-seats-bar.component.css']
})
export class HallFreeSeatsBarComponent {

  @Output() setTime = new EventEmitter<number>();
  @Input() show: Show;

  getTime(dateString: string): string {
    return moment.utc(dateString).local().format('hh:mm');
  }

  getPercentage(sold, size): number {
    return (100 / size) * sold;
  }

  selectShow(showId: number): void {
    this.setTime.emit(showId);
  }
}
