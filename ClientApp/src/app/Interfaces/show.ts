export interface Show {
  id?: number;
  startDateTime: string;
  filmDuration: number;
  price: number;
  freeSeats: number;
  hallSize?: number;
  soldTickets?: number;
  hallId?: number;
  filmTitle: string;
  filmPoster?: string;
  cinemaName: string;
  cinemaImageUrl?: string;
}
