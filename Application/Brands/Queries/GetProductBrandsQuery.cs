using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Brands.Dtos;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Brands.Queries
{
    public class GetProductBrandsQuery : IRequest<List<ProductBrandForReturnDto>>
    {
        public Guid TypeId { get; set; }

        public class GetProductBrandsQueryHandler : IRequestHandler<GetProductBrandsQuery, List<ProductBrandForReturnDto>>
        {
            private readonly IApplicationDbContext _context;
            private readonly IMapper _mapper;
            public GetProductBrandsQueryHandler(IApplicationDbContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;

            }
            public async Task<List<ProductBrandForReturnDto>> Handle(GetProductBrandsQuery request, CancellationToken cancellationToken)
            {
                var productType = await _context.ProductTypes.FindAsync(request.TypeId);

                if (productType == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, "Product type does not exists");
                }

                var brands = await _context.ProductBrands.Where(b => b.ProductTypeId == request.TypeId).ToListAsync();

                return _mapper.Map<List<ProductBrandForReturnDto>>(brands);
            }
        }
    }
}