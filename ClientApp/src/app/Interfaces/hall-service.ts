export interface HallService {
  id?: number;
  name?: string;
  description?: string;
  iconUrl?: string;
  price: number;
  available: boolean;
  hallId?: number;
  serviceId?: number;
}
