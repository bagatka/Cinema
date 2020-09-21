import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-search-screen',
  templateUrl: './search-screen.component.html',
  styleUrls: ['./search-screen.component.css']
})
export class SearchScreenComponent implements OnInit {

  myControl = new FormControl();

  constructor() {
  }

  search(filmName: string): void {
    return;
  }

  ngOnInit(): void {
  }

}
