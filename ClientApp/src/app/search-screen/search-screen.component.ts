<<<<<<< HEAD
import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
=======
import { Component, OnInit } from '@angular/core';
>>>>>>> 818ef25c5f4f86fab4c6a7212b847ac52c014a93

@Component({
  selector: 'app-search-screen',
  templateUrl: './search-screen.component.html',
  styleUrls: ['./search-screen.component.css']
})
export class SearchScreenComponent implements OnInit {

<<<<<<< HEAD
  myControl = new FormControl();

  constructor() {
  }

  search(filmName: string): void {
    return;
  }
=======
  constructor() { }
>>>>>>> 818ef25c5f4f86fab4c6a7212b847ac52c014a93

  ngOnInit(): void {
  }

}
