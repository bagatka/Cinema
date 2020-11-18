using System.Collections.Generic;

namespace iTechArt.CinemaWebApp.API.Application.RequestFeatures
{
    public class TicketParameters : RequestParameters
    {
        public IEnumerable<int> SeatIds { get; set; }
        public int? ShowId { get; set; }
    }
}