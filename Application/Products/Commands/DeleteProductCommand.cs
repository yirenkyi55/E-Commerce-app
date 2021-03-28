using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Application.Common.Models;
using MediatR;

namespace Application.Products.Commands
{
    public class DeleteProductCommand : IRequest
    {
        public Guid ProductId { get; set; }

        public class DeleteProductCommandHandler : IRequestHandler<DeleteProductCommand>
        {
            private readonly IApplicationDbContext _context;
            private readonly IFileService _fileService;

            public DeleteProductCommandHandler(IApplicationDbContext context, IFileService fileService)
            {
                _context = context;
                _fileService = fileService;
            }
            public async Task<Unit> Handle(DeleteProductCommand request, CancellationToken cancellationToken)
            {
                var product = await _context.Products.FindAsync(request.ProductId);

                if (product == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, "Product does not exists");
                }

                _fileService.DeleteFile(product.Picture, AppSettings.MediaFolder);
                
                _context.Products.Remove(product);

                await _context.SaveChangesAsync(cancellationToken);

                return Unit.Value;
            }
        }
    }
}