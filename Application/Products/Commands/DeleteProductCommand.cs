using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using MediatR;

namespace Application.Products.Commands
{
    public class DeleteProductCommand : IRequest
    {
        public Guid ProductId { get; set; }

        public class DeleteProductCommandHandler : IRequestHandler<DeleteProductCommand>
        {
            private readonly IApplicationDbContext _context;
            public DeleteProductCommandHandler(IApplicationDbContext context)
            {
                _context = context;

            }
            public async Task<Unit> Handle(DeleteProductCommand request, CancellationToken cancellationToken)
            {
                var product = await _context.Products.FindAsync(request.ProductId);

                if (product == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, "Product does not exists");
                }

                _context.Products.Remove(product);

                await _context.SaveChangesAsync(cancellationToken);

                return Unit.Value;
            }
        }
    }
}