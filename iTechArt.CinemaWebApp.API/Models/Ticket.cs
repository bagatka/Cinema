using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace iTechArt.CinemaWebApp.API.Models
{
    public class Ticket
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required(ErrorMessage = "ShowId is required.")]
        public int ShowId { get; set; }
        [Required(ErrorMessage = "OrderId is required.")]
        public int OrderId { get; set; }
        [Required(ErrorMessage = "SeatId is required.")]
        public int SeatId { get; set; }
        [Required(ErrorMessage = "Price is required.")]
        [Range(0, double.MaxValue, ErrorMessage = "Price must be greater than {1}.")]
        [Column(TypeName = "decimal(18,2)")]
        public decimal Price { get; set; }

        [ForeignKey(nameof(ShowId))]
        public Show Show { get; set; }
        [ForeignKey(nameof(OrderId))]
        public Order Order { get; set; }
        [ForeignKey(nameof(SeatId))]
        public SeatsSchema SeatsSchema { get; set; }
    }
}
