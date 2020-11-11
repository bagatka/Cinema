using System.Collections.Generic;

namespace iTechArt.CinemaWebApp.API.Application.RequestFeatures
{
    public class SeatSchemaParameters : RequestParameters
    {
        public IEnumerable<int> SeatIds { get; set; }
    }
}