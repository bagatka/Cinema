import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';

import {EditHallDialogComponent} from './edit-hall-dialog/edit-hall-dialog.component';
import {Hall} from '../../../Interfaces/hall';
import {SnackbarService} from '../../../Services/snackbar.service';
import {CinemaService} from '../../../Services/cinema.service';
import {SnackbarMessages} from '../../../Enums/snackbar-messages.enum';
import {Cinema} from '../../../Interfaces/cinema';

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
    public dialog: MatDialog,
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
      seatsSchemas: []
    });
  }

  createCinema(): void {
    this.cinemaData = this.addCinemaInput.value;
    this.cinemaData.halls = this.halls;
    this.cinemaService.createCinema(this.cinemaData).subscribe();
    this.snackbarService.displaySnackbar(SnackbarMessages.created);
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
