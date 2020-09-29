using System;

namespace iTechArt.CinemaWebApp.API.Models
{
    public class Filter
    {
        public string FilmTitle { get; set; }
        public string City { get; set; }
        public string CinemaName { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int? Sits { get; set; }
    }
}
