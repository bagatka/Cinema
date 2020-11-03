import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Hall} from '../../../Interfaces/hall';
import {Cinema} from '../../../Interfaces/cinema';
import {SnackbarService} from '../../../Services/snackbar.service';
import {CinemaService} from '../../../Services/cinema.service';
import {MatDialog} from '@angular/material/dialog';
import {SnackbarMessages} from '../../../Enums/snackbar-messages.enum';
import {EditHallDialogComponent} from '../admin-add-cinema/edit-hall-dialog/edit-hall-dialog.component';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-admin-edit-cinema',
  templateUrl: './admin-edit-cinema.component.html',
  styleUrls: ['./admin-edit-cinema.component.css']
})
export class AdminEditCinemaComponent implements OnInit {

  editCinemaInput: FormGroup;
  halls: Hall[] = [];
  cinemaData: Cinema;
  id: number;
  isFormReady = false;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private snackbarService: SnackbarService,
    private cinemaService: CinemaService,
    public dialog: MatDialog,
    private location: Location
  ) {
  }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.loadCinema();
  }

  private loadCinema(): void {
    this.cinemaService.getCinemaById(this.id).subscribe(cinema => {
      this.cinemaData = cinema;
      this.createForm();
      this.halls = this.cinemaData.halls;
      this.isFormReady = true;
    });
  }

  private createForm(): void {
    this.editCinemaInput = this.formBuilder.group({
      name: new FormControl(this.cinemaData.name, Validators.required),
      description: new FormControl(this.cinemaData.description, Validators.required),
      city: new FormControl(this.cinemaData.city, Validators.required),
      imageUrl: new FormControl(this.cinemaData.imageUrl)
    });
  }

  onAddCinemaClick(): void {
    this.halls.push({
      id: null,
      name: 'Change the name',
      seats: 0,
      cinemaName: '',
      seatsSchemas: [],
      hallServices: []
    });
  }

  updateCinema(): void {
    this.cinemaData = this.editCinemaInput.value;
    this.cinemaData.halls = this.halls;
    this.cinemaData.id = this.id;
    this.cinemaService.updateCinema(this.cinemaData, this.id).subscribe();
    this.snackbarService.displaySnackbar(SnackbarMessages.updated);
    this.location.back();
  }

  cancel(): void {
    this.location.back();
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
