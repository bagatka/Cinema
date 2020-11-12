import {SeatPosition} from './seat-position';
import {HallService} from './hall-service';

export interface Hall {
  id?: number;
  name: string;
  seats: number;
  cinemaName: string;
  seatPositions: SeatPosition[];
  hallServices: HallService[];
}
