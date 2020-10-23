namespace iTechArt.CinemaWebApp.API.Application.RequestFeatures
{
    public class FilmParameters : RequestParameters
    {
        public string Title { get; set; }
        public bool WithBanner { get; set; } = false;
    }
}