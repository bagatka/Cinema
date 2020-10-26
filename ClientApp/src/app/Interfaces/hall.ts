import {SeatPosition} from './seat-position';

export interface Hall {
  id: number;
  name: string;
  seatsNumber: number;
  cinemaName: string;
  seatsSchemas: SeatPosition[];
}
