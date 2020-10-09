import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';

import {EditHallDialogComponent} from './edit-hall-dialog/edit-hall-dialog.component';
import {Hall} from '../../../Interfaces/hall';

@Component({
  selector: 'app-admin-add-cinema',
  templateUrl: './admin-add-cinema.component.html',
  styleUrls: ['./admin-add-cinema.component.css']
})
export class AdminAddCinemaComponent implements OnInit {

  addCinemaInput: FormGroup;
  halls: Hall[] = [];

  constructor(private formBuilder: FormBuilder, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.addCinemaInput = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      imageUrl: new FormControl('')
    });
  }

  onAddCinemaClick(): void {
    this.halls.push({
      name: 'Change the name',
      size: 0,
      cinemaName: '',
      seatsSchema: []
    });
  }

  openEditHallDialog(hall): void {
    const dialogRef = this.dialog.open(EditHallDialogComponent, {
      width: '60vw',
      height: '85vh',
      data: {hallData: hall}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.halls = this.halls.filter(h => h.name !== result);
      }
    });
  }
}
