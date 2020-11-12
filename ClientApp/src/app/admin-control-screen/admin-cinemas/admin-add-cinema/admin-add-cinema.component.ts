import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';

import {EditHallDialogComponent} from './edit-hall-dialog/edit-hall-dialog.component';

import {Hall} from '../../../Interfaces/hall';
import {Cinema} from '../../../Interfaces/cinema';

import {SnackbarMessages} from '../../../Enums/snackbar-messages.enum';

import {SnackbarService} from '../../../Services/snackbar.service';
import {CinemaService} from '../../../Services/cinema.service';
import {SeatType} from '../../../Enums/seat-type.enum';

@Component({
  selector: 'app-admin-add-cinema',
  templateUrl: './admin-add-cinema.component.html',
  styleUrls: ['./admin-add-cinema.component.css']
})
export class AdminAddCinemaComponent implements OnInit {

  addCinemaInput: FormGroup;
  halls: Hall[] = [];
  cinemaData: Cinema;

  constructor(
    private formBuilder: FormBuilder,
    private snackbarService: SnackbarService,
    private cinemaService: CinemaService,
    public dialog: MatDialog
  ) {
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
      seats: 0,
      cinemaName: '',
      seatPositions: [],
      hallServices: []
    });
  }

  createCinema(): void {
    this.cinemaData = this.addCinemaInput.value;
    this.cinemaData.halls = this.halls;
    this.cinemaData.halls.forEach(hall => hall.seatPositions.map(seatPosition => {
      let seatId: number;
      switch (seatPosition.seatType) {
        case SeatType.Common:
          seatId = 1;
          break;
        case SeatType.Sofa:
          seatId = 2;
          break;
        case SeatType.VIP:
          seatId = 3;
          break;
      }
      seatPosition.seatTypeId = seatId;
      seatPosition.seatType = null;
    }));
    this.cinemaService.createCinema(this.cinemaData).subscribe(
      () => {
        this.snackbarService.displaySnackbar(SnackbarMessages.created);
        // TODO: Clean fields or redirect?
      },
      () => this.snackbarService.displaySnackbar(SnackbarMessages.error)
    );
  }

  openEditHallDialog(hall): void {
    const dialogRef = this.dialog.open(EditHallDialogComponent, {
      width: '60vw',
      height: '85vh',
      data: {hallData: hall}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.halls = this.halls.filter(h => h.name !== result.name || h.seats !== result.seats);
      }
    });
  }
}
