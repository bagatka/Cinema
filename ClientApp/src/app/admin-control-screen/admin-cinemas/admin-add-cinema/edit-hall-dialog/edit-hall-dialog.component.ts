import {Component, Inject, OnInit, AfterContentChecked} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Cinema} from '../../../../Interfaces/cinema';
import {SeatPosition} from '../../../../Interfaces/seat-position';
import {SeatType} from '../../../../Enums/seat-type.enum';
import {CinemaService} from '../../../../cinema.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-edit-hall-dialog',
  templateUrl: './edit-hall-dialog.component.html',
  styleUrls: ['./edit-hall-dialog.component.css']
})
export class EditHallDialogComponent implements OnInit, AfterContentChecked {

  addHallInput: FormGroup;
  onCurrentSeatPosition: SeatPosition;
  seatsSchema: SeatPosition[];
  activeSeatType: SeatType;
  selectedSeatsNumber: number;
  hallSizeError: boolean;
  cinemas$ = new Observable<Cinema[]>();

  constructor(
    public dialogRef: MatDialogRef<EditHallDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder,
    private cinemaService: CinemaService) {
  }



  ngOnInit(): void {
    this.seatsSchema = JSON.parse(JSON.stringify(this.data.hallData.seatsSchema));
    this.selectedSeatsNumber = this.seatsSchema.length;
    this.hallSizeError = this.selectedSeatsNumber !== this.seatsSchema.length;
    this.addHallInput = this.formBuilder.group({
      name: new FormControl(this.data.hallData.name, Validators.required),
      size: new FormControl(this.data.hallData.size, [Validators.required, Validators.min(1)]),
      cinemaName: new FormControl(this.data.hallData.cinemaName, Validators.required)
    });
    this.cinemas$ = this.cinemaService.getCinemas();
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
      this.data.hallData.size = this.addHallInput.value.size;
      this.data.hallData.cinemaName = this.addHallInput.value.cinemaName;
    }
    if (!this.schemasCompare(this.data.hallData.seatsSchema, this.seatsSchema) && this.addHallInput.valid) {
      this.data.hallData.seatsSchema = this.seatsSchema;
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
    if (value !== this.addHallInput.value.size) {
      this.setHallSizeError(true);
    } else {
      this.setHallSizeError(false);
    }
  }

  checkHallSize(): void {
    if (this.selectedSeatsNumber !== this.addHallInput.value.size) {
      this.setHallSizeError(true);
    } else {
      this.setHallSizeError(false);
    }
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
