import {SeatType} from '../Enums/seat-type.enum';
import {SeatStatus} from '../Enums/seat-status.enum';

export interface SeatPosition {
  id?: number;
  seat: number;
  row: number;
  seatTypeId?: number;
  seatType?: SeatType | SeatStatus;
  price?: number;
}
