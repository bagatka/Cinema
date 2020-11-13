using System.Linq;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;

using iTechArt.CinemaWebApp.API.Application.Contracts;
using iTechArt.CinemaWebApp.API.Application.RequestFeatures;
using iTechArt.CinemaWebApp.API.Models;

namespace iTechArt.CinemaWebApp.API.Data
{
    public class TicketRepository : RepositoryBase<Ticket>, ITicketRepository
    {
        public TicketRepository(RepositoryContext repositoryContext) : base(repositoryContext)
        {
        }
        
        public async Task<PagedList<Ticket>> GetTicketsAsync(TicketParameters ticketParameters)
        {
            var tickets = FindAll()
                .Include(ticket => ticket.Show)
                .AsNoTracking();

            if (ticketParameters.SeatIds != null)
            {
                tickets = tickets.Where(ticket => ticketParameters.SeatIds.Contains(ticket.TicketSeat.SeatPosition.Id));
            }

            if (ticketParameters.ShowId != null)
            {
                tickets = tickets.Where(ticket => ticket.Show.Id.Equals(ticketParameters.ShowId));
            }

            return await PagedList<Ticket>.ToPagedList(
                tickets.OrderBy(ticket => ticket.Id),
                ticketParameters.PageNumber,
                ticketParameters.PageSize
            );
        }

        public async Task<Ticket> GetTicketAsync(int ticketId)
        {
            return await FindByCondition(ticket => ticket.Id.Equals(ticketId))
                .AsNoTracking()
                .SingleOrDefaultAsync();
        }
        
        public async Task CreateTicketAsync(Ticket ticket) => await CreateAsync(ticket);
    }
}