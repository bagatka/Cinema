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
        filmName: 'Green Mile',
        pictureSrc: 'http://image.tmdb.org/t/p/w500//velWPhVMQeQKcxggNEU8YmIo52R.jpg'
      },
      {
        id: 2,
        filmName: 'Red Mile',
        pictureSrc: 'http://image.tmdb.org/t/p/w500//velWPhVMQeQKcxggNEU8YmIo52R.jpg'
      },
      {
        id: 3,
        filmName: 'Yellow Mile',
        pictureSrc: 'http://image.tmdb.org/t/p/w500//velWPhVMQeQKcxggNEU8YmIo52R.jpg'
      },
      {
        id: 4,
        filmName: 'Black Mile',
        pictureSrc: 'http://image.tmdb.org/t/p/w500//velWPhVMQeQKcxggNEU8YmIo52R.jpg'
      },
      {
        id: 5,
        filmName: 'White Mile',
        pictureSrc: 'http://image.tmdb.org/t/p/w500//velWPhVMQeQKcxggNEU8YmIo52R.jpg'
      },
      {
        id: 6,
        filmName: 'Pink Mile',
        pictureSrc: 'http://image.tmdb.org/t/p/w500//velWPhVMQeQKcxggNEU8YmIo52R.jpg'
      },
      {
        id: 7,
        filmName: 'Blue Mile',
        pictureSrc: 'http://image.tmdb.org/t/p/w500//velWPhVMQeQKcxggNEU8YmIo52R.jpg'
      }
    ];
    return {films};
  }
}
