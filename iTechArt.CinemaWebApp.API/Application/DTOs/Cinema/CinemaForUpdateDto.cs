using System.Collections.Generic;

using iTechArt.CinemaWebApp.API.Application.DTOs.Hall;

namespace iTechArt.CinemaWebApp.API.Application.DTOs.Cinema
{
    public class CinemaForUpdateDto : CinemaForManipulationDto
    {
        public IEnumerable<HallForCreationDto> Halls { get; set; }
    }
}