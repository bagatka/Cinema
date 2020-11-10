import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-cinema-card',
  templateUrl: './cinema-card.component.html',
  styleUrls: ['./cinema-card.component.css']
})
export class CinemaCardComponent {

  @Input() showData;
  @Output() setShow = new EventEmitter<number>();

  setTime(data): void {
    this.setShow.emit(data);
  }
}
