using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace iTechArt.CinemaWebApp.API.Models
{
    public class TicketSeat
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required(ErrorMessage = "SeatPositionId.")]
        public int SeatPositionId { get; set; }
        [Required(ErrorMessage = "Status is required.")]
        public string Status { get; set; }
        
        [ForeignKey(nameof(SeatPositionId))]
        public SeatPosition SeatPosition { get; set; }
    }
}