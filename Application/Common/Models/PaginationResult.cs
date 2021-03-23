using System;
using System.Collections.Generic;

namespace Application.Common.Models
{
    public class PaginationResult<T>
    {
        public PaginationResult(List<T> items, int count, int pageNumber, int pageSize)
        {
            totalCount = count;
            PageSize = pageSize;
            CurrentPage = pageNumber;
            TotalPages = (int)Math.Ceiling(count / (double)pageSize);
            Results = items;
        }

        public IReadOnlyList<T> Results { get; private set; }

        public int CurrentPage { get; private set; }

        public int TotalPages { get; private set; }

        public int PageSize { get; private set; }

        public int totalCount { get; private set; }

        public bool HasPrevious => CurrentPage > 1;

        public bool HasNext => CurrentPage < TotalPages;
    }
}