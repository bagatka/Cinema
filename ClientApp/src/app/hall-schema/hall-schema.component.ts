import {AfterViewInit, Component, EventEmitter, Input, Output} from '@angular/core';

import {SeatPosition} from '../Interfaces/seat-position';

import {SeatType} from '../Enums/seat-type.enum';
import {SeatStatus} from '../Enums/seat-status.enum';

const MAX_COLUMNS = 32;
const MAX_ROWS = 18;

@Component({
  selector: 'app-hall-schema',
  templateUrl: './hall-schema.component.html',
  styleUrls: ['./hall-schema.component.css']
})
export class HallSchemaComponent implements AfterViewInit {

  @Output() enterSeatPosition = new EventEmitter<SeatPosition>();
  @Output() seatPositionsDataChange = new EventEmitter<SeatPosition[]>();
  @Output() hallSize = new EventEmitter<number>();
  @Output() userSelectSeats = new EventEmitter<SeatPosition[]>();
  @Input() seatPositionsData: SeatPosition[];
  @Input() soldSeats: SeatPosition[];
  @Input() activeSeatType: SeatType;
  @Input() userSelect: boolean;

  columns = Array(MAX_COLUMNS).fill(1).map((x, i) => i);
  rows = Array(MAX_ROWS).fill(1).map((x, i) => i);
  activeSeat;
  userSelectedSeats: SeatPosition[] = [];

  ngAfterViewInit(): void {
    if (this.userSelect) {
      this.initUserSelectSchema();
      this.initSoldSeats();
    }
    this.drawSchema();
  }

  private initSoldSeats(): void {
    for (const seat of this.soldSeats) {
      this.applySeatStatusStyle(seat, SeatStatus.Sold);
    }
  }

  selectSeat(selectedRow, selectedColumn): void {
    const seat = {seat: selectedColumn, row: selectedRow, seatType: this.activeSeatType};
    if (this.userSelect) {
      const status = this.userSelectCheckBookingStatus(seat);
      this.userSelectColorizeSeat(seat, status);
    } else {
      if (this.activeSeatType) {
        const status = this.checkSeat(seat);
        this.colorizeSeat(seat, status, true);
      }
    }
  }

  private colorizeSeat(seat: SeatPosition, status: boolean, commonStyle: boolean): void {
    this.removeSeatStyle(seat, SeatType.Common, SeatType.Sofa, SeatType.VIP);
    if (status) {
      this.applySeatTypeStyle(seat, commonStyle);
    }
  }

  private userSelectColorizeSeat(seat: SeatPosition, status: boolean): void {
    if (status) {
      this.removeSeatStyle(seat, SeatStatus.Booked);
      this.userSelectedSeats = this.userSelectedSeats.filter(selectedSeat =>
        selectedSeat.seat !== seat.seat || selectedSeat.row !== seat.row);
    } else {
      if (!this.checkSeatElementStyle(seat, SeatStatus.Empty)) {
        this.applySeatStatusStyle(seat, SeatStatus.Booked);
        const newSelectedSeat = this.seatPositionsData.find(schemasSeat => schemasSeat.seat === seat.seat && schemasSeat.row === seat.row);
        this.userSelectedSeats.push(newSelectedSeat);
      }
    }
    this.userSelectSeats.emit(this.userSelectedSeats);
  }

  private initUserSelectSchema(): void {
    const length = document.getElementsByClassName('seat').length;
    for (let i = 0; i < length; i++) {
      document.getElementsByClassName('seat')[i].classList.add(SeatStatus.Empty);
    }
  }

  private userSelectCheckBookingStatus(seat: SeatPosition): boolean {
    return this.checkSeatElementStyle(seat, SeatStatus.Booked) || this.checkSeatElementStyle(seat, SeatStatus.Sold);
  }

  private countIndex(seat: SeatPosition): number {
    return seat.row * this.columns.length + seat.seat;
  }

  private checkSeat(seat: SeatPosition): boolean {
    if (this.seatPositionsData.find(s => s.row === seat.row && s.seat === seat.seat)) {
      this.removeSeat(seat);
      return false;
    }
    this.addSeat(seat);
    this.updateSelectedSeatsData();
    return true;
  }

  private removeSeat(seat: SeatPosition): void {
    this.seatPositionsData = this.seatPositionsData.filter(savedSeat => savedSeat.row !== seat.row || savedSeat.seat !== seat.seat);
    this.updateSelectedSeatsData();
  }

  private addSeat(seat: SeatPosition): void {
    this.seatPositionsData.push(seat);
  }

  private drawSchema(): void {
    for (const seat of this.seatPositionsData) {
      this.removeSeatStyle(seat, SeatStatus.Empty);
      this.colorizeSeat(seat, true, false);
    }
  }

  private applySeatTypeStyle(seat: SeatPosition, commonStyle: boolean): void {
    const element = this.getSeatElement(seat);
    if (commonStyle) {
      element.classList.add(this.activeSeatType);
    } else {
      element.classList.add(seat.seatType);
    }
  }

  private applySeatStatusStyle(seat: SeatPosition, seatStatus: SeatStatus): void {
    const element = this.getSeatElement(seat);
    element.classList.add(seatStatus);
  }

  private removeSeatStyle(seat: SeatPosition, ...criteria: Array<SeatType | SeatStatus>): void {
    const element = this.getSeatElement(seat);
    element.classList.remove(...criteria);
  }

  private checkSeatElementStyle(seat: SeatPosition, criterion: SeatType | SeatStatus): boolean {
    const element = this.getSeatElement(seat);
    return element.classList.contains(criterion);
  }

  private getSeatElement(seat: SeatPosition): Element {
    const index = this.countIndex(seat);
    return document.getElementsByClassName('seat')[index];
  }

  updateSelectedSeatsData(): void {
    this.seatPositionsDataChange.emit(this.seatPositionsData);
    this.hallSize.emit(this.seatPositionsData.length);
  }

  updateSelectedHint(selectedRow, selectedColumn): void {
    this.enterSeatPosition.emit({seat: selectedColumn, row: selectedRow, seatType: this.activeSeatType});
  }

  deleteSelectedHint(): void {
    this.enterSeatPosition.emit(null);
  }
}
