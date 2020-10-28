using System;

namespace iTechArt.CinemaWebApp.API.Application.RequestFeatures
{
    public class ShowParameters : RequestParameters
    {
        public int HallId { get; set; } = -1;
        public string Date { get; set; }
    }
}