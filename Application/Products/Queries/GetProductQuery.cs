using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Application.Products.Dtos;
using AutoMapper;
using MediatR;

namespace Application.Products.Queries
{
    public class GetProductQuery : IRequest<ProductForReturnDto>
    {
        public Guid ProductId { get; set; }
        public class GetProductQueryHandler : IRequestHandler<GetProductQuery, ProductForReturnDto>
        {
            private readonly IApplicationDbContext _context;
            private readonly IMapper _mapper;
            public GetProductQueryHandler(IApplicationDbContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;

            }
            public async Task<ProductForReturnDto> Handle(GetProductQuery request, CancellationToken cancellationToken)
            {
                var product = await _context.Products.FindAsync(request.ProductId);

                if (product == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, "Product does not exists");
                }

                return _mapper.Map<ProductForReturnDto>(product);
            }
        }
    }
}