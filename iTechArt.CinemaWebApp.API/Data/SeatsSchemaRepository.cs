using System.Threading.Tasks;

using iTechArt.CinemaWebApp.API.Application.Contracts;
using iTechArt.CinemaWebApp.API.Models;

namespace iTechArt.CinemaWebApp.API.Data
{
    public class SeatsSchemaRepository : RepositoryBase<SeatsSchema>, ISeatsSchemaRepository
    {
        public SeatsSchemaRepository(RepositoryContext repositoryContext) : base(repositoryContext)
        {
        }
        
        public async Task CreateSeatAsync(SeatsSchema seatsSchema) => await CreateAsync(seatsSchema);
        
        public void DeleteSeat(SeatsSchema seatsSchema) => Delete(seatsSchema);
    }
}