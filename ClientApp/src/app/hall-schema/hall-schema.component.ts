import {Component, OnInit, AfterViewInit, EventEmitter, Input, Output} from '@angular/core';

import {SeatPosition} from '../Interfaces/seat-position';
import {SeatType} from '../Enums/seat-type.enum';

const MAX_COLUMNS = 32;
const MAX_ROWS = 18;

@Component({
  selector: 'app-hall-schema',
  templateUrl: './hall-schema.component.html',
  styleUrls: ['./hall-schema.component.css']
})
export class HallSchemaComponent implements OnInit, AfterViewInit {

  @Output() enterSeatPosition = new EventEmitter<SeatPosition>();
  @Output() schemaDataChange = new EventEmitter<SeatPosition[]>();
  @Output() hallSize = new EventEmitter<number>();
  @Output() userSelectSeats = new EventEmitter<SeatPosition[]>();
  @Input() schemaData: SeatPosition[];
  @Input() activeSeatType: SeatType;
  @Input() userSelect: boolean;

  columns = Array(MAX_COLUMNS).fill(1).map((x, i) => i);
  rows = Array(MAX_ROWS).fill(1).map((x, i) => i);
  activeSeat;
  userSelectedSeats: SeatPosition[] = [];

  public ngOnInit(): void {
    this.enterSeatPosition.emit(null);
    if (this.userSelect) {
      this.activeSeatType = SeatType.Booked;
    }
  }

  public ngAfterViewInit(): void {
    if (this.userSelect) {
      this.initUserSelectSchema();
    }
    this.drawSchema();
  }

  selectSeat(selectedRow, selectedColumn): void {
    if (!this.activeSeatType) {
      return;
    }
    const seat = {seat: selectedColumn, row: selectedRow, type: this.activeSeatType};
    if (this.userSelect) {
      const status = this.userSelectCheckBookingStatus(seat);
      this.userSelectColorizeSeat(seat, status);
    } else {
      const status = this.checkSeat(seat);
      this.colorizeSeat(this.countIndex(seat), status);
    }
  }

  private colorizeSeat(index: number, status: boolean, type: SeatType = this.activeSeatType): void {
    const element = document.getElementsByClassName('seat')[index];
    element.classList.remove(SeatType.Common, SeatType.Sofa, SeatType.VIP);
    if (status) {
      element.classList.add(type);
    }
  }

  private userSelectColorizeSeat(seat: SeatPosition, status: boolean, type: SeatType = this.activeSeatType): void {
    const index = this.countIndex(seat);
    const element = document.getElementsByClassName('seat')[index];
    if (status) {
      element.classList.remove(SeatType.Booked);
      this.userSelectedSeats = this.userSelectedSeats.filter(selectedSeat =>
        selectedSeat.seat !== seat.seat || selectedSeat.row !== seat.row);
    } else {
      if (!element.classList.contains(SeatType.Empty)) {
        element.classList.add(type);
        const newSelectedSeat = this.schemaData.find(schemasSeat => schemasSeat.seat === seat.seat && schemasSeat.row === seat.row);
        this.userSelectedSeats.push(newSelectedSeat);
      }
    }
    this.userSelectSeats.emit(this.userSelectedSeats);
  }

  private initUserSelectSchema(): void {
    const length = document.getElementsByClassName('seat').length;
    for (let i = 0; i < length; i++) {
      document.getElementsByClassName('seat')[i].classList.add(SeatType.Empty);
    }
  }

  private userSelectCheckBookingStatus(seat: SeatPosition): boolean {
    const index = this.countIndex(seat);
    const element = document.getElementsByClassName('seat')[index];
    return element.classList.contains(SeatType.Booked);
  }

  private countIndex(seat: SeatPosition): number {
    return seat.row * this.columns.length + seat.seat;
  }

  private checkSeat(seat: SeatPosition): boolean {
    if (this.schemaData.find(s => s.row === seat.row && s.seat === seat.seat)) {
      this.removeSeat(seat);
      return false;
    }
    this.addSeat(seat);
    this.updateSelectedSeatsData();
    return true;
  }

  private removeSeat(seat: SeatPosition): void {
    this.schemaData = this.schemaData.filter(savedSeat => savedSeat.row !== seat.row || savedSeat.seat !== seat.seat);
    this.updateSelectedSeatsData();
  }

  private addSeat(seat: SeatPosition): void {
    this.schemaData.push(seat);
  }

  private drawSchema(): void {
    for (const seat of this.schemaData) {
      const index = this.countIndex(seat);
      document.getElementsByClassName('seat')[index].classList.remove(SeatType.Empty);
      this.colorizeSeat(index, true, seat.type);
    }
  }

  updateSelectedSeatsData(): void {
    this.schemaDataChange.emit(this.schemaData);
    this.hallSize.emit(this.schemaData.length);
  }

  updateSelectedHint(selectedRow, selectedColumn): void {
    this.enterSeatPosition.emit({seat: selectedColumn, row: selectedRow, type: this.activeSeatType});
  }

  deleteSelectedHint(): void {
    this.enterSeatPosition.emit(null);
  }
}
