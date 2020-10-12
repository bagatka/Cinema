import {SeatPosition} from './seat-position';

export interface Hall {
  name: string;
  size: number;
  cinemaName: string;
  seatsSchema: SeatPosition[];
}
