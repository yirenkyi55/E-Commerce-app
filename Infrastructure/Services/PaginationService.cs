using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Services
{
    public class PaginationService<T> : IPaginationService<T>
    {
        public async Task<List<T>> PaginateAsync(IQueryable<T> source, int pageNumber, int pageSize)
        {
            return await source.Skip(pageSize * (pageNumber - 1)).Take(pageSize).ToListAsync();
        }
    }
}