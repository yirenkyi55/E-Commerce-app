using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Application.Types.Dtos;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Types.Commands
{
    public class CreateProductTypeCommand : IRequest<ProductTypeForReturnDto>
    {
        public ProductTypeForCreateDto ProductType { get; set; }
        public class CreateProductTypeCommandHandler : IRequestHandler<CreateProductTypeCommand, ProductTypeForReturnDto>
        {
            private readonly IApplicationDbContext _context;
            private readonly IMapper _mapper;
            public CreateProductTypeCommandHandler(IApplicationDbContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;

            }
            public async Task<ProductTypeForReturnDto> Handle(CreateProductTypeCommand request, CancellationToken cancellationToken)
            {
                // check if the name of the type already exists
                var productTypeExists = await _context.ProductTypes.AnyAsync(type => type.Name.ToLower() == request.ProductType.Name.ToLower());

                if (productTypeExists)
                {
                    throw new RestException(HttpStatusCode.BadRequest, "Product  type already exists");
                }

                var productType = _mapper.Map<ProductType>(request.ProductType);

                _context.ProductTypes.Add(productType);

                await _context.SaveChangesAsync(cancellationToken);

                return _mapper.Map<ProductTypeForReturnDto>(productType);
            }
        }
    }
}