using System.Threading.Tasks;
using iTechArt.CinemaWebApp.API.Application.Contracts;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace iTechArt.CinemaWebApp.API.Application.ActionFilters
{
    public class ValidateShowExistsAttribute
    {
        private readonly IRepositoryManager _repository;

        public ValidateShowExistsAttribute(IRepositoryManager repository)
        {
            _repository = repository;
        }

        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var trackChanges = context.HttpContext.Request.Method.Equals("PUT");
            var id = (int) context.ActionArguments["id"];
            var show = await _repository.Shows.GetShowAsync(id, trackChanges);

            if (show == null)
            {
                context.Result = new NotFoundResult();
            }
            else
            {
                context.HttpContext.Items.Add("show", show);
                await next();
            }
        }
    }
}