export interface Show {
  id?: number;
  startDateTime: Date;
  price: number;
  freeSeats: number;
  filmTitle: string;
  filmPoster?: string;
  cinemaName: string;
}
