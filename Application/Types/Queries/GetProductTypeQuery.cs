using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Application.Types.Dtos;
using AutoMapper;
using MediatR;

namespace Application.Types.Queries
{
    public class GetProductTypeQuery : IRequest<ProductTypeForReturnDto>
    {
        public Guid TypeId { get; set; }
        public class GetProductTypeQueryHandler : IRequestHandler<GetProductTypeQuery, ProductTypeForReturnDto>
        {
            private readonly IApplicationDbContext _context;
            private readonly IMapper _mapper;
            public GetProductTypeQueryHandler(IApplicationDbContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;

            }
            public async Task<ProductTypeForReturnDto> Handle(GetProductTypeQuery request, CancellationToken cancellationToken)
            {
                var productType = await _context.ProductTypes.FindAsync(request.TypeId);

                if (productType == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, "product type does not exists");
                }

                return _mapper.Map<ProductTypeForReturnDto>(productType);
            }
        }
    }
}