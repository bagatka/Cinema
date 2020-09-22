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
    const cinemas = [
      {
        id: 1,
        name: 'Cinema 1',
        description: 'New cinema in the city center.',
        city: 'Minsk',
        imageUrl: null
      },
      {
        id: 2,
        name: 'Cinema 2',
        description: 'Old cinema in the suburbs.',
        city: 'Minsk',
        imageUrl: null
      },
      {
        id: 3,
        name: 'SuperCinema9D',
        description: 'Bla-bla-bla cinema in bla-bla-bla with bla-bla-bla.',
        city: 'Las Vegas',
        imageUrl: 'https://assets.simpleviewcms.com/simpleview/image/upload/c_limit,h_1200,q_75,w_1200/v1/clients/lasvegas/strip_b86ddbea-3add-4995-b449-ac85d700b027.jpg'
      }
    ];
    return {films, cinemas};
  }
}
