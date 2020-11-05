namespace iTechArt.CinemaWebApp.API.Application.RequestFeatures
{
    public class ShowParameters : RequestParameters
    {
        public int? HallId { get; set; }
        public int? Seats { get; set; }
        public string FilmTitle { get; set; }
        public string City { get; set; }
        public string CinemaName { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }
        public string Date { get; set; }
    }
}