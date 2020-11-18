using System.Collections.Generic;

namespace iTechArt.CinemaWebApp.API.Application.RequestFeatures
{
    public class HallServiceParameters : RequestParameters
    {
        public IEnumerable<int> HallServicesIds { get; set; }
    }
}