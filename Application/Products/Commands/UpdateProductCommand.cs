using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Application.Common.Models;
using Application.Products.Dtos;
using AutoMapper;
using MediatR;

namespace Application.Products.Commands
{
    public class UpdateProductCommand : IRequest<ProductForReturnDto>
    {
        public Guid ProductId { get; set; }

        public ProductForUpdateDto ProductForUpdate { get; set; }
        public class UpdateProductCommandHandler : IRequestHandler<UpdateProductCommand, ProductForReturnDto>
        {
            private readonly IApplicationDbContext _context;
            private readonly IMapper _mapper;
            private readonly IFileService _fileService;
            public UpdateProductCommandHandler(IApplicationDbContext context, IMapper mapper, IFileService fileService)
            {
                _fileService = fileService;
                _mapper = mapper;
                _context = context;

            }
            public async Task<ProductForReturnDto> Handle(UpdateProductCommand request, CancellationToken cancellationToken)
            {
                var product = await _context.Products.FindAsync(request.ProductId);

                if (product == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, "Product does not exists");
                }

                var productImage = product.Picture;
                
                //_mapper.Map(request.ProductForUpdate, product);

                if (request.ProductForUpdate.Photo != null)
                {
                    var picture = await _fileService.SaveFileAsync(request.ProductForUpdate.Photo, AppSettings.MediaFolder);

                    _fileService.DeleteFile(product.Picture, AppSettings.MediaFolder);
                    product.Picture = picture;
                }
                else
                {
                    product.Picture = productImage;
                }

                product.Name = request.ProductForUpdate.Name ;
                product.Description = request.ProductForUpdate.Description ;
                product.Price = request.ProductForUpdate.Price;
                product.ProductBrandId = request.ProductForUpdate.ProductBrandId;
                product.ProductTypeId = request.ProductForUpdate.ProductTypeId;

                await _context.SaveChangesAsync(cancellationToken);

                return _mapper.Map<ProductForReturnDto>(product);
            }
        }
    }
}