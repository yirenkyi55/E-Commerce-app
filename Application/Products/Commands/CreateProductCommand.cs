using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Application.Common.Models;
using Application.Products.Dtos;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Products.Commands
{
    public class CreateProductCommand : IRequest<ProductForReturnDto>
    {
        public ProductForCreateDto Product { get; set; }
        public class CreateProductCommandHandler : IRequestHandler<CreateProductCommand, ProductForReturnDto>
        {
            private readonly IApplicationDbContext _context;
            private readonly IFileService _fileService;
            private readonly IMapper _mapper;
            public CreateProductCommandHandler(
                IApplicationDbContext context,
            IFileService fileService,
             IMapper mapper
             )
            {
                _mapper = mapper;
                _fileService = fileService;
                _context = context;

            }
            public async Task<ProductForReturnDto> Handle(CreateProductCommand request, CancellationToken cancellationToken)
            {

                if (!await _context.ProductBrands.AnyAsync(
                    brand => brand.Id == request.Product.ProductBrandId
                    ))
                {
                    throw new RestException(HttpStatusCode.NotFound, "Product brand does not exists");
                }

                if (!await _context.ProductTypes.AnyAsync(
                    productType => productType.Id == request.Product.ProductTypeId
                    ))
                {
                    throw new RestException(HttpStatusCode.NotFound, "Product type does not exists");
                }

                // Save the product photo
                var productPhoto = await _fileService.SaveFileAsync(request.Product.Photo, AppSettings.MediaFolder);

                var product = _mapper.Map<Product>(request.Product);

                product.Picture = productPhoto;

                _context.Products.Add(product);

                await _context.SaveChangesAsync(cancellationToken);

                product = await _context.Products
                    .Include(p=>p.ProductBrand)
                    .Include(p=>p.ProductType).FirstOrDefaultAsync(p=>p.Id==product.Id);

                return _mapper.Map<ProductForReturnDto>(product);
            }
        }
    }
}