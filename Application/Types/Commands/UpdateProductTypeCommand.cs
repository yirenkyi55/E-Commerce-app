using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Application.Types.Dtos;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Types.Commands
{
    public class UpdateProductTypeCommand : IRequest<ProductTypeForReturnDto>
    {
        public Guid TypeId { get; set; }

        public ProductTypeForCreateDto ProductType { get; set; }
        public class UpdateProductTypeCommandHandler : IRequestHandler<UpdateProductTypeCommand, ProductTypeForReturnDto>
        {
            private readonly IApplicationDbContext _context;
            private readonly IMapper _mapper;
            public UpdateProductTypeCommandHandler(IApplicationDbContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;

            }
            public async Task<ProductTypeForReturnDto> Handle(UpdateProductTypeCommand request, CancellationToken cancellationToken)
            {
                var productType = await _context.ProductTypes.FindAsync(request.TypeId);

                if (productType == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, "product type does not exists");
                }

                var typeExists = await _context.ProductTypes.AnyAsync(type => type.Name.ToLower() == request.ProductType.Name.ToLower() && type.Id != productType.Id);

                if (typeExists)
                {
                    throw new RestException(HttpStatusCode.BadRequest, "Product type already exists");
                }

                _mapper.Map(request.ProductType, productType);

                await _context.SaveChangesAsync(cancellationToken);

                return _mapper.Map<ProductTypeForReturnDto>(productType);
            }
        }
    }
}