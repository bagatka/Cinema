using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace iTechArt.CinemaWebApp.API.Models
{
    public class Order
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required(ErrorMessage = "Total is required.")]
        [Range(0, double.MaxValue, ErrorMessage = "Total must be greater than {1}.")]
        [Column(TypeName = "decimal(18,2)")]
        public decimal Total { get; set; }
        [Required(ErrorMessage = "UserId is required.")]
        public int UserId { get; set; }

        [ForeignKey(nameof(UserId))]
        public User User { get; set; }
        public ICollection<Ticket> Tickets { get; set; }
        public ICollection<OrderAddon> OrderAddons { get; set; }
    }
}
