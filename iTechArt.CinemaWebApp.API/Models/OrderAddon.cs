using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace iTechArt.CinemaWebApp.API.Models
{
    public class OrderAddon
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required(ErrorMessage = "OrderId is required.")]
        public int OrderId { get; set; }
        [Required(ErrorMessage = "HallServiceId is required.")]
        public int HallServiceId { get; set; }
        [Required(ErrorMessage = "Number is required.")]
        [Range(0, int.MaxValue)]
        public int Number { get; set; }

        [ForeignKey(nameof(OrderId))]
        public Order Order { get; set; }
        [ForeignKey(nameof(HallServiceId))]
        public HallService HallService { get; set; }
    }
}
