using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace iTechArt.CinemaWebApp.API.Application.DTOs.Ticket
{
    public abstract class TicketForManipulationDto
    {

        [Required(ErrorMessage = "Price is required.")]
        [Range(0, double.MaxValue, ErrorMessage = "Price must be greater than {1}.")]
        [Column(TypeName = "decimal(18,2)")]
        public decimal Price { get; set; }
    }
}