using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using Application.Products.Dtos;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Products.Queries
{
    public class GetAllProductQuery : IRequest<List<ProductForReturnDto>>
    {
        public class GetAllProductQueryHandler : IRequestHandler<GetAllProductQuery, List<ProductForReturnDto>>
        {
            private readonly IApplicationDbContext _context;
            private readonly IMapper _mapper;

            public GetAllProductQueryHandler(IApplicationDbContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }
            public async Task<List<ProductForReturnDto>> Handle(GetAllProductQuery request, CancellationToken cancellationToken)
            {
                var products = await _context.Products.ToListAsync();

                return _mapper.Map<List<ProductForReturnDto>>(products);
            }
        }
    }
}