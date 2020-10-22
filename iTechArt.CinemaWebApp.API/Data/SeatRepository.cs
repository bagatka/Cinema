using iTechArt.CinemaWebApp.API.Application.Contracts;
using iTechArt.CinemaWebApp.API.Models;

namespace iTechArt.CinemaWebApp.API.Data
{
    public class SeatRepository : RepositoryBase<Seat>, ISeatRepository
    {
        public SeatRepository(RepositoryContext repositoryContext) : base(repositoryContext)
        {
        }
    }
}