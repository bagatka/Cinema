import {Hall} from './hall';

export interface Cinema {
  id: number;
  name: string;
  description: string;
  city: string;
  imageUrl?: string;
  halls?: Hall[];
}
