import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Cinema} from '../../../../Interfaces/cinema';
import {SeatPosition} from '../../../../Interfaces/seat-position';
import {SeatType} from '../../../../Enums/seat-type.enum';

@Component({
  selector: 'app-edit-hall-dialog',
  templateUrl: './edit-hall-dialog.component.html',
  styleUrls: ['./edit-hall-dialog.component.css']
})
export class EditHallDialogComponent implements OnInit {

  addHallInput: FormGroup;
  onCurrentSeatPosition: SeatPosition;
  seatsSchema: SeatPosition[];
  activeSeatType: SeatType;
  cinemas: Cinema[] = [
    {
      name: 'SuperCinema',
      description: 'asdasd',
      id: 1,
      city: 'Minsk'
    },
    {
      name: 'SilverScreen',
      description: 'asdasd',
      id: 2,
      city: 'Minsk'
    },
    {
      name: 'GoldenScreen',
      description: 'asdasd',
      id: 3,
      city: 'Brest'
    }
  ];

  constructor(
    public dialogRef: MatDialogRef<EditHallDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.addHallInput = this.formBuilder.group({
      name: new FormControl(this.data.hallData.name, Validators.required),
      size: new FormControl(this.data.hallData.size, [Validators.required, Validators.min(1)]),
      cinemaName: new FormControl(this.data.hallData.cinemaName, Validators.required)
    });
    this.seatsSchema = JSON.parse(JSON.stringify(this.data.hallData.seatsSchema));
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
