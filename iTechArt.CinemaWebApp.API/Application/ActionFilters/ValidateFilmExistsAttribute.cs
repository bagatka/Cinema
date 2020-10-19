using System.Threading.Tasks;

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

using iTechArt.CinemaWebApp.API.Application.Contracts;

namespace iTechArt.CinemaWebApp.API.Application.ActionFilters
{
    public class ValidateFilmExistsAttribute : IAsyncActionFilter
    {
        private readonly IRepositoryManager _repository;

        public ValidateFilmExistsAttribute(IRepositoryManager repository)
        {
            _repository = repository;
        }

        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var trackChanges = context.HttpContext.Request.Method.Equals("PUT");
            var id = (int) context.ActionArguments["id"];
            var film = await _repository.Films.GetFilmAsync(id, trackChanges);

            if (film == null)
            {
                context.Result = new NotFoundResult();
            }
            else
            {
                context.HttpContext.Items.Add("film", film);
                await next();
            }
        }
    }
}