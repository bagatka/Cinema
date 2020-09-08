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
        id: 1,
        pictureSrc: 'https://images.pexels.com/photos/4903255/pexels-photo-4903255.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        filmName: 'Alex'
      },
      {
        id: 2,
        pictureSrc: 'https://images.pexels.com/photos/5195671/pexels-photo-5195671.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        filmName: 'John'
      },
      {
        id: 3,
        pictureSrc: 'https://images.pexels.com/photos/4526712/pexels-photo-4526712.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        filmName: 'Test3'
      }
    ];

    this.todayFilms = [
      {
        id: 1,
        pictureSrc: 'http://image.tmdb.org/t/p/w500//velWPhVMQeQKcxggNEU8YmIo52R.jpg',
        filmName: 'Green Mile'
      },
      {
        id: 2,
        pictureSrc: 'http://image.tmdb.org/t/p/w500//velWPhVMQeQKcxggNEU8YmIo52R.jpg',
        filmName: 'Green Mile'
      },
      {
        id: 3,
        pictureSrc: 'http://image.tmdb.org/t/p/w500//velWPhVMQeQKcxggNEU8YmIo52R.jpg',
        filmName: 'Green Mile'
      },
      {
        id: 4,
        pictureSrc: 'http://image.tmdb.org/t/p/w500//velWPhVMQeQKcxggNEU8YmIo52R.jpg',
        filmName: 'Green Mile'
      },
      {
        id: 5,
        pictureSrc: 'http://image.tmdb.org/t/p/w500//velWPhVMQeQKcxggNEU8YmIo52R.jpg',
        filmName: 'Green Mile'
      },
      {
        id: 6,
        pictureSrc: 'http://image.tmdb.org/t/p/w500//velWPhVMQeQKcxggNEU8YmIo52R.jpg',
        filmName: 'Green Mile'
      },
      {
        id: 7,
        pictureSrc: 'http://image.tmdb.org/t/p/w500//velWPhVMQeQKcxggNEU8YmIo52R.jpg',
        filmName: 'Green Mile'
      }
    ];
  }

  ngOnInit(): void {
    this.loadFilms();
  }

}
