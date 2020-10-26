import {Component, Inject, OnInit, AfterContentChecked} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

import {SeatPosition} from '../../../../Interfaces/seat-position';
import {SeatType} from '../../../../Enums/seat-type.enum';

@Component({
  selector: 'app-edit-hall-dialog',
  templateUrl: './edit-hall-dialog.component.html',
  styleUrls: ['./edit-hall-dialog.component.css']
})
export class EditHallDialogComponent implements OnInit, AfterContentChecked {

  addHallInput: FormGroup;
  onCurrentSeatPosition: SeatPosition;
  seatsSchemas: SeatPosition[];
  activeSeatType: SeatType;
  selectedSeatsNumber: number;
  hallSizeError: boolean;

  constructor(
    public dialogRef: MatDialogRef<EditHallDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.seatsSchemas = [...this.data.hallData.seatsSchemas];
    this.selectedSeatsNumber = this.seatsSchemas.length;
    this.hallSizeError = this.selectedSeatsNumber !== this.seatsSchemas.length;
    this.addHallInput = this.formBuilder.group({
      name: new FormControl(this.data.hallData.name, Validators.required),
      seatsNumber: new FormControl(this.data.hallData.seatsNumber, [Validators.required, Validators.min(1)])
    });
  }

  ngAfterContentChecked(): void {
    this.checkHallSize();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  updateHall(): void {
    if (this.addHallInput.dirty && this.addHallInput.valid) {
      this.data.hallData.name = this.addHallInput.value.name;
      this.data.hallData.seatsNumber = this.addHallInput.value.seatsNumber;
    }
    if (!this.schemasCompare(this.data.hallData.seatsSchemas, this.seatsSchemas) && this.addHallInput.valid) {
      this.data.hallData.seatsSchemas = this.seatsSchemas;
    }
    this.dialogRef.close();
  }

  displayCurrentSeatPosition(value): void {
    this.onCurrentSeatPosition = value;
  }

  setActiveSeatType(type: SeatType, event): void {
    this.activeSeatType = type;
    const seats = document.getElementsByClassName('seatSelector');
    Array.from(seats).forEach((el) => el.classList.remove('active-seat-type'));
    const element = event.target;
    element.classList.add('active-seat-type');
  }

  setSelectedSeatsNumber(value): void {
    this.selectedSeatsNumber = value;
    const hallSizeErrorStatus = value !== this.addHallInput.value.seatsNumber;
    this.setHallSizeError(hallSizeErrorStatus);
  }

  checkHallSize(): void {
    const hallSizeErrorStatus = this.selectedSeatsNumber !== this.addHallInput.value.seatsNumber;
    this.setHallSizeError(hallSizeErrorStatus);
  }

  setHallSizeError(status: boolean): void {
    status ? this.addHallInput.setErrors(Validators) : this.addHallInput.setErrors(null);
    this.hallSizeError = status;
  }

  public get SeatType(): typeof SeatType {
    return SeatType;
  }

  private schemasCompare(x, y): boolean {
    let objectsAreSame = true;
    if (!x || !y || x.length !== y.length) {
      return false;
    }
    for (let i = 0; i < x.length; i++) {
      if ((x[i].seat !== y[i].seat) || (x[i].row !== y[i].row)) {
        objectsAreSame = false;
      }
    }
    return objectsAreSame;
  }
}
