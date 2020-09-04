import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.css']
})
export class HomeScreenComponent implements OnInit {

  slides = [
    {
      src: 'https://images.pexels.com/photos/4903255/pexels-photo-4903255.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      name: 'Alex'
    },
    {
      src: 'https://images.pexels.com/photos/5195671/pexels-photo-5195671.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      name: 'John'
    },
    {src: 'https://images.pexels.com/photos/4526712/pexels-photo-4526712.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
