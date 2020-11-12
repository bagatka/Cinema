using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace iTechArt.CinemaWebApp.API.Models
{
    public class SeatPosition
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required(ErrorMessage = "HallId is required.")]
        public int HallId { get; set; }
        [Required(ErrorMessage = "Seat is required.")]
        [Range(0, int.MaxValue)]
        public int Seat { get; set; }
        [Required(ErrorMessage = "Row is required.")]
        [Range(0, int.MaxValue)]
        public int Row { get; set; }
        [Required(ErrorMessage = "SeatTypeId is required.")]
        public int SeatTypeId { get; set; }
        
        [ForeignKey(nameof(HallId))]
        public Hall Hall { get; set; }
        [ForeignKey(nameof(SeatTypeId))]
        public SeatType SeatType { get; set; }
    }
}