namespace iTechArt.CinemaWebApp.API.Application.DTOs.Film
{
    public class FilmDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int Duration { get; set; }
        public int Year { get; set; }
        public string PosterUrl { get; set; }
        public string BannerUrl { get; set; }
    }
}