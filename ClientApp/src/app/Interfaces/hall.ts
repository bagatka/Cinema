import {SeatPosition} from './seat-position';

export interface Hall {
  id?: number;
  name: string;
  seats: number;
  cinemaName: string;
  seatsSchemas: SeatPosition[];
}
