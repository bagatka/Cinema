import {Injectable} from '@angular/core';

import {InMemoryDbService} from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb(): object {
    const films = [
      {
        id: 1,
        title: 'Green Mile',
        description: 'The lives of guards on Death Row are affected by one of their charges: a black man accused of child murder and rape, yet who has a mysterious gift.',
        posterUrl: 'http://image.tmdb.org/t/p/w500//velWPhVMQeQKcxggNEU8YmIo52R.jpg',
        bannerUrl: 'https://images.pexels.com/photos/4903255/pexels-photo-4903255.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      },
      {
        id: 2,
        title: 'Red Mile',
        description: 'The lives of guards on Death Row are affected by one of their charges: a black man accused of child murder and rape, yet who has a mysterious gift.',
        posterUrl: 'http://image.tmdb.org/t/p/w500//velWPhVMQeQKcxggNEU8YmIo52R.jpg',
        bannerUrl: 'https://images.pexels.com/photos/5195671/pexels-photo-5195671.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      },
      {
        id: 3,
        title: 'Yellow Mile',
        description: 'The lives of guards on Death Row are affected by one of their charges: a black man accused of child murder and rape, yet who has a mysterious gift.',
        posterUrl: 'http://image.tmdb.org/t/p/w500//velWPhVMQeQKcxggNEU8YmIo52R.jpg',
        bannerUrl: 'https://images.pexels.com/photos/4526712/pexels-photo-4526712.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      },
      {
        id: 4,
        title: 'Blue Mile',
        description: 'The lives of guards on Death Row are affected by one of their charges: a black man accused of child murder and rape, yet who has a mysterious gift.',
        posterUrl: 'http://image.tmdb.org/t/p/w500//velWPhVMQeQKcxggNEU8YmIo52R.jpg',
        bannerUrl: 'https://images.pexels.com/photos/5195671/pexels-photo-5195671.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      },
      {
        id: 5,
        title: 'Black Mile',
        description: 'The lives of guards on Death Row are affected by one of their charges: a black man accused of child murder and rape, yet who has a mysterious gift.',
        posterUrl: 'http://image.tmdb.org/t/p/w500//velWPhVMQeQKcxggNEU8YmIo52R.jpg',
        bannerUrl: 'https://images.pexels.com/photos/4903255/pexels-photo-4903255.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      },
      {
        id: 6,
        title: 'White Mile',
        description: 'The lives of guards on Death Row are affected by one of their charges: a black man accused of child murder and rape, yet who has a mysterious gift.',
        posterUrl: 'http://image.tmdb.org/t/p/w500//velWPhVMQeQKcxggNEU8YmIo52R.jpg',
        bannerUrl: 'https://images.pexels.com/photos/4526712/pexels-photo-4526712.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      },
      {
        id: 7,
        title: 'Orange Mile',
        description: 'The lives of guards on Death Row are affected by one of their charges: a black man accused of child murder and rape, yet who has a mysterious gift.',
        posterUrl: 'http://image.tmdb.org/t/p/w500//velWPhVMQeQKcxggNEU8YmIo52R.jpg',
        bannerUrl: 'https://images.pexels.com/photos/4903255/pexels-photo-4903255.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      },
    ];
    return {films};
  }
}
