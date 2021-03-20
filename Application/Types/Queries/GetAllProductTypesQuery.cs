using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using Application.Types.Dtos;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Types.Queries
{
    public class GetAllProductTypesQuery : IRequest<List<ProductTypeForReturnDto>>
    {
        public class GetAllProductTypesQueryHandler : IRequestHandler<GetAllProductTypesQuery, List<ProductTypeForReturnDto>>
        {
            private readonly IApplicationDbContext _context;
            private readonly IMapper _mapper;
            public GetAllProductTypesQueryHandler(IApplicationDbContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;

            }
            public async Task<List<ProductTypeForReturnDto>> Handle(GetAllProductTypesQuery request, CancellationToken cancellationToken)
            {
                var productTypes = await _context.ProductTypes.ToListAsync();

                return _mapper.Map<List<ProductTypeForReturnDto>>(productTypes);
            }
        }
    }
}