import {SeatType} from '../Enums/seat-type.enum';

export interface SeatPosition {
  id?: number;
  seat: number;
  row: number;
  type?: SeatType;
}
