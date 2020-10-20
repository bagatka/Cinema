using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace iTechArt.CinemaWebApp.API.Application.DTOs.Hall
{
    public abstract class HallForManipulationDto
    {
        [Required(ErrorMessage = "Name is required.")]
        [StringLength(200, ErrorMessage = "Name length can't be more than 200.")]
        public string Name { get; set; }
        [Required(ErrorMessage = "Size is required.")]
        [Range(1, int.MaxValue)]
        public int SeatsNumber { get; set; }
    }
}