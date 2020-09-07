import {Component, OnInit} from '@angular/core';
import {Slide} from '../carousel/slide';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.css']
})
export class HomeScreenComponent implements OnInit {

  slides = [
    {
      pictureSrc: 'https://images.pexels.com/photos/4903255/pexels-photo-4903255.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      filmName: 'Alex'
    },
    {
      pictureSrc: 'https://images.pexels.com/photos/5195671/pexels-photo-5195671.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      filmName: 'John'
    },
    {
      pictureSrc: 'https://images.pexels.com/photos/4526712/pexels-photo-4526712.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      filmName: 'Test3'
    }
  ];

  popularFilms: Slide[];

  loadFilms(): void {
    this.popularFilms = [
      {
        pictureSrc: 'http://image.tmdb.org/t/p/w500//velWPhVMQeQKcxggNEU8YmIo52R.jpg',
        filmName: 'Green Mile'
      },
      {
        pictureSrc: 'http://image.tmdb.org/t/p/w500//velWPhVMQeQKcxggNEU8YmIo52R.jpg',
        filmName: 'Green Mile'
      },
      {
        pictureSrc: 'http://image.tmdb.org/t/p/w500//velWPhVMQeQKcxggNEU8YmIo52R.jpg',
        filmName: 'Green Mile'
      },
      {
        pictureSrc: 'http://image.tmdb.org/t/p/w500//velWPhVMQeQKcxggNEU8YmIo52R.jpg',
        filmName: 'Green Mile'
      },
    ];
  }

  constructor() {
  }

  ngOnInit(): void {
  }

}
