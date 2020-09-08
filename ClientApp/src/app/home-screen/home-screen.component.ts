import {Component, OnInit} from '@angular/core';
import {Film} from '../film';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.css']
})
export class HomeScreenComponent implements OnInit {

  popularFilms: Film[];
  todayFilms: Film[];

  private loadFilms(): void {
    this.popularFilms = [
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

    this.todayFilms = [
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
      }
    ];
  }

  constructor() {
  }

  ngOnInit(): void {
    this.loadFilms();
  }

}
