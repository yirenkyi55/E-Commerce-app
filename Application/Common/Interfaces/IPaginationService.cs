using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Common.Interfaces
{
    public interface IPaginationService<T>
    {
        Task<List<T>> PaginateAsync(IQueryable<T> source, int pageNumber, int pageSize);
    }
}