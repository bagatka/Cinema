import {SeatType} from '../Enums/seat-type.enum';

export interface SeatPosition {
  seat: number;
  row: number;
  type: SeatType;
}
