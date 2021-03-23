using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using Application.Common.Models;
using Application.Products.Dtos;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Products.Queries
{
    public class GetAllProductQuery : IRequest<PaginationResult<ProductForReturnDto>>
    {
        public ProductParams Params { get; set; }
        public class GetAllProductQueryHandler : IRequestHandler<GetAllProductQuery, PaginationResult<ProductForReturnDto>>
        {
            private readonly IApplicationDbContext _context;
            private readonly IMapper _mapper;
            private readonly IPaginationService<Product> _paginationService;

            public GetAllProductQueryHandler(
                IApplicationDbContext context,
             IMapper mapper,
            IPaginationService<Product> paginationService)
            {
                _paginationService = paginationService;
                _context = context;
                _mapper = mapper;
            }
            public async Task<PaginationResult<ProductForReturnDto>> Handle(GetAllProductQuery request, CancellationToken cancellationToken)
            {
                var queryable = _context.Products.OrderBy(p => p.Id).AsQueryable();

                if (request.Params.Search != null)
                {
                    queryable = queryable.Where(p => p.Name.ToLower().Contains(request.Params.Search) ||
                    p.Description.ToLower().Contains(request.Params.Search));
                }

                if (request.Params.TypdId != null)
                {
                    queryable = queryable.Where(p => p.ProductTypeId == request.Params.TypdId);
                }

                if (request.Params.BrandId != null)
                {
                    queryable = queryable.Where(p => p.ProductBrandId == request.Params.BrandId);
                }

                // Perform pagination on the queryable object
                var results = await _paginationService.PaginateAsync(queryable, request.Params.PageNumber, request.Params.PageSize);

                // map the results using auto-mapper
                var productListToReturn = _mapper.Map<List<ProductForReturnDto>>(results);

                // Return pagination results
                return new PaginationResult<ProductForReturnDto>(
                    productListToReturn,
                    queryable.Count(),
                    request.Params.PageNumber,
                    request.Params.PageSize
                );

            }
        }
    }
}