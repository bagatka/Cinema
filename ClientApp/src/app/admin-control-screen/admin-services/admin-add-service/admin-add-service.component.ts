import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {SnackbarMessages} from '../../../Enums/snackbar-messages.enum';

import {FilmService} from '../../../Services/film.service';
import {SnackbarService} from '../../../Services/snackbar.service';
import {HallServiceService} from '../../../Services/hall-service.service';

@Component({
  selector: 'app-admin-add-service',
  templateUrl: './admin-add-service.component.html',
  styleUrls: ['./admin-add-service.component.css']
})
export class AdminAddServiceComponent implements OnInit {

  addServiceInput: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private filmService: FilmService,
    private snackbarService: SnackbarService,
    private hallServiceService: HallServiceService
  ) {
  }

  ngOnInit(): void {
    this.addServiceInput = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      iconUrl: new FormControl(''),
    });
  }

  createService(): void {
    this.hallServiceService.createService(this.addServiceInput.value).subscribe(
      () => {
        this.snackbarService.displaySnackbar(SnackbarMessages.created);
      },
      () => this.snackbarService.displaySnackbar(SnackbarMessages.error)
    );
  }
}
