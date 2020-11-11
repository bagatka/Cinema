import {OrderAddonDetails} from './order-addon-details';

export interface OrderDetails {
  showId: number;
  seatIds: number[];
  orderAddons?: OrderAddonDetails[];
  totalPrice: number;
}
