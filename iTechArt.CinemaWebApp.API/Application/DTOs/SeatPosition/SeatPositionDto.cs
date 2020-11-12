namespace iTechArt.CinemaWebApp.API.Application.DTOs.SeatPosition
{
    public class SeatPositionDto
    {
        public int Id { get; set; }
        public string HallName { get; set; }
        public int Seat { get; set; }
        public int Row { get; set; }
        public string SeatType { get; set; }
        public int SeatTypeId { get; set; }
    }
}