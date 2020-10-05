import {Component} from '@angular/core';

interface SeatPosition {
  seat: number;
  row: number;
}

@Component({
  selector: 'app-hall-schema',
  templateUrl: './hall-schema.component.html',
  styleUrls: ['./hall-schema.component.css']
})
export class HallSchemaComponent {

  columns = Array(32).fill(1).map((x, i) => i);
  rows = Array(18).fill(1).map((x, i) => i);
  saved: SeatPosition[] = [];
  activeSeat;

  constructor() {
  }

  selectSeat(selectedRow, selectedColumn, index): void {
    const element = document.getElementsByClassName('seat')[index];
    if (this.checkSeat({seat: selectedColumn, row: selectedRow})) {
      element.classList.add('selected');
    } else {
      element.classList.remove('selected');
    }
  }

  private checkSeat(seat: SeatPosition): boolean {
    if (this.saved.find(s => s.row === seat.row && s.seat === seat.seat)) {
      this.saved = this.saved.filter(savedSeat => savedSeat.row !== seat.row && savedSeat.seat !== seat.seat);
      return false;
    }
    this.saved.push(seat);
    return true;
  }
}
