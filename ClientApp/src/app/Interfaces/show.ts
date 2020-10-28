export interface Show {
  id?: number;
  startDateTime: Date;
  filmDuration: number;
  price: number;
  freeSeats: number;
  filmTitle: string;
  filmPoster?: string;
  cinemaName: string;
}
