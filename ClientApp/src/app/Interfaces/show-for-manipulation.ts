import {TypePrice} from './type-price';

export interface ShowForManipulation {
  id?: number;
  startDateTime?: Date;
  freeSeats?: number;
  filmId?: number;
  hallId?: number;
  typePrices?: TypePrice[];
}
