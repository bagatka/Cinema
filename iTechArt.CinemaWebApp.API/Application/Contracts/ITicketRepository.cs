using System.Threading.Tasks;

using iTechArt.CinemaWebApp.API.Application.RequestFeatures;
using iTechArt.CinemaWebApp.API.Models;

namespace iTechArt.CinemaWebApp.API.Application.Contracts
{
    public interface ITicketRepository
    {
        Task<PagedList<Ticket>> GetTicketsAsync(TicketParameters ticketParameters);
        Task<Ticket> GetTicketAsync(int ticketId);
        Task CreateTicketAsync(Ticket ticket);
    }
}