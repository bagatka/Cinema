import {SeatType} from '../Enums/seat-type.enum';

export interface SeatPosition {
  id?: number;
  seat: number;
  row: number;
  seatTypeId?: number;
  seatType?: SeatType;
  price?: number;
}
