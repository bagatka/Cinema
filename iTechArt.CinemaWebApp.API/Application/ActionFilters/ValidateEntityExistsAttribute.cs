using System.Threading.Tasks;

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

using iTechArt.CinemaWebApp.API.Application.Contracts;

namespace iTechArt.CinemaWebApp.API.Application.ActionFilters
{
    public abstract class ValidateEntityExistsAttribute<TEntity> : IAsyncActionFilter
    {
        protected readonly IRepositoryManager Repository;

        protected ValidateEntityExistsAttribute(IRepositoryManager repository)
        {
            Repository = repository;
        }

        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var trackChanges = context.HttpContext.Request.Method.Equals("PUT");
            var id = (int)context.ActionArguments["id"];
            var entity = await GetEntityById(id, trackChanges);

            if (entity == null)
            {
                context.Result = new NotFoundResult();
            }
            else
            {
                context.HttpContext.Items.Add("entity", entity);
                await next();
            }
        }

        protected abstract Task<TEntity> GetEntityById(int id, bool trackChanges);
    }
}