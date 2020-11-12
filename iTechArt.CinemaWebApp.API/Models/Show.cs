using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace iTechArt.CinemaWebApp.API.Models
{
    public class Show
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required(ErrorMessage = "Date and time is required.")]
        public DateTime StartDateTime { get; set; }
        [Required(ErrorMessage = "FilmId is required.")]
        public int FilmId { get; set; }
        [Required(ErrorMessage = "HallId is required.")]
        public int HallId { get; set; }

        [ForeignKey(nameof(FilmId))]
        public Film Film { get; set; }
        [ForeignKey(nameof(HallId))]
        public Hall Hall { get; set; }

        public ICollection<Ticket> Tickets { get; set; }
        public ICollection<TypePrice> TypePrices { get; set; }
    }
}
