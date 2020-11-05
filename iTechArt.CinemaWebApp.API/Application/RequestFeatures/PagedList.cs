using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;

namespace iTechArt.CinemaWebApp.API.Application.RequestFeatures
{
    public class PagedList<T> : List<T>
    {
        public PagingMetaData PagingMetaData { get; set; }

        public PagedList(List<T> items, int count, int pageNumber, int pageSize)
        {
            PagingMetaData = new PagingMetaData()
            {
                TotalCount = count,
                PageSize = pageSize,
                CurrentPage = pageNumber,
                TotalPages = (int) Math.Ceiling(count / (double) pageSize)
            };
            
            AddRange(items);
        }

        public static async Task<PagedList<T>> ToPagedList(IQueryable<T> source, int pageNumber, int pageSize)
        {
            var count = source.Count();
            var items = await source.Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
            
            return new PagedList<T>(items, count, pageNumber, pageSize);
        }
    }
}