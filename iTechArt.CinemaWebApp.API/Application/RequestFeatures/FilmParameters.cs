namespace iTechArt.CinemaWebApp.API.Application.RequestFeatures
{
    public class FilmParameters : RequestParameters
    {
        public string Title { get; set; }
        public string CinemaName { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }
        public int? Seats { get; set; }
        public bool WithPoster { get; set; }  = false;
        public bool WithBanner { get; set; } = false;
    }
}