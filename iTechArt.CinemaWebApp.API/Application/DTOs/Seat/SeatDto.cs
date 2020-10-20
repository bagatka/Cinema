namespace iTechArt.CinemaWebApp.API.Application.DTOs.Seat
{
    public class SeatDto
    {
        public int Id { get; set; }
        public int HallName { get; set; }
        public int SeatNumber { get; set; }
        public int Row { get; set; }
        public string Type { get; set; }
    }
}