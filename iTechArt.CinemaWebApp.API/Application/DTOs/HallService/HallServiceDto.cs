namespace iTechArt.CinemaWebApp.API.Application.DTOs.HallService
{
    public class HallServiceDto
    {
        public int Id { get; set; }
        public int Name { get; set; }
        public string Description { get; set; }
        public string IconUrl { get; set; }
        public decimal Price { get; set; }
        public bool Available { get; set; }
    }
}