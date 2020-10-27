namespace iTechArt.CinemaWebApp.API.Application.DTOs.SeatsSchema
{
    public class SeatsSchemaDto
    {
        public int Id { get; set; }
        public string HallName { get; set; }
        public int Seat { get; set; }
        public int Row { get; set; }
        public string Type { get; set; }
    }
}