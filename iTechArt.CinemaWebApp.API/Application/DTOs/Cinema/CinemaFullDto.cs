using System.Collections.Generic;
using iTechArt.CinemaWebApp.API.Application.DTOs.Hall;

namespace iTechArt.CinemaWebApp.API.Application.DTOs.Cinema
{
    public class CinemaFullDto : CinemaDto
    {
        public ICollection<HallFullDto> Halls { get; set; }
    }
}