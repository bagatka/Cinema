using iTechArt.CinemaWebApp.API.Application.Contracts;
using iTechArt.CinemaWebApp.API.Models;

namespace iTechArt.CinemaWebApp.API.Data
{
    public class HallServiceRepository : RepositoryBase<HallService>, IHallServiceRepository
    {
        public HallServiceRepository(RepositoryContext repositoryContext) : base(repositoryContext)
        {
        }
    }
}