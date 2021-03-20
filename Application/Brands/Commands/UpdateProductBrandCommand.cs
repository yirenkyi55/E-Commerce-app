using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Brands.Dtos;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using AutoMapper;
using MediatR;

namespace Application.Brands.Commands
{
    public class UpdateProductBrandCommand : IRequest<ProductBrandForReturnDto>
    {
        public Guid TypeId { get; set; }

        public Guid BrandId { get; set; }
        public ProductBrandForCreateDto Brand { get; set; }

        public class UpdateProductBrandCommandHandler : IRequestHandler<UpdateProductBrandCommand, ProductBrandForReturnDto>
        {
            private readonly IApplicationDbContext _context;
            private readonly IMapper _mapper;
            public UpdateProductBrandCommandHandler(IApplicationDbContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;

            }
            public async Task<ProductBrandForReturnDto> Handle(UpdateProductBrandCommand request, CancellationToken cancellationToken)
            {
                var productType = await _context.ProductTypes.FindAsync(request.TypeId);

                if (productType == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, "Product type does not exists");
                }

                var brand = await _context.ProductBrands.FindAsync(request.BrandId);

                if (brand == null || brand.ProductTypeId != productType.Id)
                {
                    throw new RestException(HttpStatusCode.NotFound, "Brand does not exists");
                }

                _mapper.Map(request.Brand, brand);

                await _context.SaveChangesAsync(cancellationToken);

                return _mapper.Map<ProductBrandForReturnDto>(brand);
            }
        }
    }
}