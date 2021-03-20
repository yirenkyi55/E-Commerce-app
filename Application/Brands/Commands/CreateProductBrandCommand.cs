using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Brands.Dtos;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using AutoMapper;
using Domain;
using MediatR;

namespace Application.Brands.Commands
{
    public class CreateProductBrandCommand : IRequest<ProductBrandForReturnDto>
    {
        public Guid TypeId { get; set; }

        public ProductBrandForCreateDto Brand { get; set; }
        public class CreateProductBrandCommandHandler : IRequestHandler<CreateProductBrandCommand, ProductBrandForReturnDto>
        {
            private readonly IApplicationDbContext _context;
            private readonly IMapper _mapper;
            public CreateProductBrandCommandHandler(IApplicationDbContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;

            }
            public async Task<ProductBrandForReturnDto> Handle(CreateProductBrandCommand request, CancellationToken cancellationToken)
            {
                var productType = await _context.ProductTypes.FindAsync(request.TypeId);

                if (productType == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, "Product type does not exists");
                }

                var brand = _mapper.Map<ProductBrand>(request.Brand);
                brand.ProductType = productType;

                _context.ProductBrands.Add(brand);

                await _context.SaveChangesAsync(cancellationToken);

                return _mapper.Map<ProductBrandForReturnDto>(brand);
            }
        }
    }
}