using System.Collections.Generic;
using iTechArt.CinemaWebApp.API.Application.DTOs.SeatsSchema;
using iTechArt.CinemaWebApp.API.Application.DTOs.Show;

namespace iTechArt.CinemaWebApp.API.Application.DTOs.Hall
{
    public class HallFullDto : HallDto
    {
        public ICollection<SeatsSchemaDto> SeatsSchemas { get; set; }
    }
}