using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

using iTechArt.CinemaWebApp.API.Application.DTOs.HallService;
using iTechArt.CinemaWebApp.API.Application.DTOs.SeatsSchema;

namespace iTechArt.CinemaWebApp.API.Application.DTOs.Hall
{
    public class HallForManipulationDto
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "Name is required.")]
        [StringLength(200, ErrorMessage = "Name length can't be more than 200.")]
        public string Name { get; set; }
        [Required(ErrorMessage = "Seats is required.")]
        [Range(1, int.MaxValue)]
        public int Seats { get; set; }
        
        [Required(ErrorMessage = "Seat schema is required.")]
        public IEnumerable<SeatsSchemaForManipulationDto> SeatsSchemas { get; set; }
        public IEnumerable<HallServiceForManipulationDto> HallServices { get; set; }
    }
}