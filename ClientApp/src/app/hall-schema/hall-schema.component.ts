import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SeatPosition} from '../Interfaces/seat-position';
import {SeatType} from '../Enums/seat-type.enum';

@Component({
  selector: 'app-hall-schema',
  templateUrl: './hall-schema.component.html',
  styleUrls: ['./hall-schema.component.css']
})
export class HallSchemaComponent implements OnInit, AfterViewInit {

  @Output() enterSeatPosition = new EventEmitter<SeatPosition>();
  @Output() schemaDataChange = new EventEmitter<SeatPosition[]>();
  @Input() schemaData: SeatPosition[];
  @Input() activeSeatType: SeatType;

  columns = Array(32).fill(1).map((x, i) => i);
  rows = Array(18).fill(1).map((x, i) => i);
  activeSeat;


  public ngOnInit(): void {
    this.enterSeatPosition.emit(null);
  }

  public ngAfterViewInit(): void {
    this.drawSchema();
  }

  selectSeat(selectedRow, selectedColumn): void {
    const seat = {seat: selectedColumn, row: selectedRow, type: this.activeSeatType};
    let status: boolean;
    status = this.checkSeat(seat);
    this.colorizeSeat(this.countIndex(seat), status);
  }

  private colorizeSeat(index: number, status: boolean): void {
    const element = document.getElementsByClassName('seat')[index];
    if (status) {
      element.classList.remove(SeatType.Common, SeatType.Sofa, SeatType.VIP);
      element.classList.add(this.activeSeatType);
    } else {
      element.classList.remove(SeatType.Common, SeatType.Sofa, SeatType.VIP);
    }
  }

  private countIndex(seat: SeatPosition): number {
    return seat.row * this.columns.length + seat.seat;
  }

  private checkSeat(seat: SeatPosition): boolean {
    if (this.schemaData.find(s => s.row === seat.row && s.seat === seat.seat)) {
      this.schemaData = this.schemaData.filter(savedSeat => savedSeat.row !== seat.row || savedSeat.seat !== seat.seat);
      this.updateSelectedSeatsData();
      return false;
    }
    this.schemaData.push(seat);
    this.updateSelectedSeatsData();
    return true;
  }

  private drawSchema(): void {
    for (const seat of this.schemaData) {
      this.colorizeSeat(this.countIndex(seat), true);
    }
  }

  updateSelectedSeatsData(): void {
    this.schemaDataChange.emit(this.schemaData);
  }

  updateSelectedHint(selectedRow, selectedColumn): void {
    this.enterSeatPosition.emit({seat: selectedColumn, row: selectedRow, type: this.activeSeatType});
  }

  deleteSelectedHint(): void {
    this.enterSeatPosition.emit(null);
  }
}
