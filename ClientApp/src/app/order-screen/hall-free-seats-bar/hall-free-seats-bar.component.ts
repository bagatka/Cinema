import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Show} from '../../Interfaces/show';

@Component({
  selector: 'app-hall-free-seats-bar',
  templateUrl: './hall-free-seats-bar.component.html',
  styleUrls: ['./hall-free-seats-bar.component.css']
})
export class HallFreeSeatsBarComponent {

  @Output() setTime = new EventEmitter<object>();
  @Input() show: Show;

  setSelected(): void {

  }
}
