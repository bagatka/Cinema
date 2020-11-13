import {TicketFullData} from './ticket-full-data';
import {OrderAddonDetails} from './order-addon-details';

export interface Order {
  userName: string;
  total: number;
  tickets: TicketFullData[];
  orderAddons: OrderAddonDetails[];
}
