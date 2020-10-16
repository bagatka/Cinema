using iTechArt.CinemaWebApp.API.Application.Contracts;
using iTechArt.CinemaWebApp.API.Models;

namespace iTechArt.CinemaWebApp.API.Data
{
    public class CinemaRepository : RepositoryBase<Cinema>, ICinemaRepository
    {
        public CinemaRepository(RepositoryContext repositoryContext) : base(repositoryContext)
        {
        }
    }
}