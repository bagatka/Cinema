using iTechArt.CinemaWebApp.API.Application.Contracts;
using iTechArt.CinemaWebApp.API.Models;

namespace iTechArt.CinemaWebApp.API.Data
{
    public class ServiceRepository : RepositoryBase<Service>, IServiceRepository
    {
        public ServiceRepository(RepositoryContext repositoryContext) : base(repositoryContext)
        {
        }
    }
}