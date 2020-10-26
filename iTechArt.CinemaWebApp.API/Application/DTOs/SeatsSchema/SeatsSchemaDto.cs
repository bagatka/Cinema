namespace iTechArt.CinemaWebApp.API.Application.DTOs.Seat
{
    public class SeatsSchemaDto
    {
        public int Id { get; set; }
        public int HallName { get; set; }
        public int Seat { get; set; }
        public int Row { get; set; }
        public string Type { get; set; }
    }
}