import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Cinema} from '../../../../Interfaces/cinema';

@Component({
  selector: 'app-edit-hall-dialog',
  templateUrl: './edit-hall-dialog.component.html',
  styleUrls: ['./edit-hall-dialog.component.css']
})
export class EditHallDialogComponent implements OnInit{

  addHallInput: FormGroup;
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
  }

  updateHall(): void {
    if (this.addHallInput.dirty && this.addHallInput.valid) {
      this.data.hallData.name = this.addHallInput.value.name;
      this.data.hallData.size = this.addHallInput.value.size;
      this.data.hallData.cinemaName = this.addHallInput.value.cinemaName;
    }
  }
}
