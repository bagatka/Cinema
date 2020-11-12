using System.Collections.Generic;

namespace iTechArt.CinemaWebApp.API.Application.RequestFeatures
{
    public class SeatPositionParameters : RequestParameters
    {
        public IEnumerable<int> SeatIds { get; set; }
    }
}