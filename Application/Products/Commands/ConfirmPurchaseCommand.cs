using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Application.Products.Dtos;
using AutoMapper;
using MediatR;

namespace Application.Products.Commands
{
    public class ConfirmPurchaseCommand : IRequest<ProductPurchaseForReturnDto>
    {
        public Guid PurchaseId { get; set; }
        
        public class ConfirmPurchaseCommandHandler: IRequestHandler<ConfirmPurchaseCommand, ProductPurchaseForReturnDto>
        {
            private readonly IApplicationDbContext _context;
            private readonly IMapper _mapper;

            public ConfirmPurchaseCommandHandler(
                IApplicationDbContext context,
                IMapper mapper
                )
            {
                _context = context;
                _mapper = mapper;
            }
            public async Task<ProductPurchaseForReturnDto> Handle(ConfirmPurchaseCommand request, CancellationToken cancellationToken)
            {
                var purchase = await _context.ProductPurchases.FindAsync(request.PurchaseId);

                if (purchase == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, "Purchase does not exists");
                }

               
                    purchase.IsConfirmed = !purchase.IsConfirmed;

                    await _context.SaveChangesAsync(cancellationToken);
            

                return _mapper.Map<ProductPurchaseForReturnDto>(purchase);
            }
        }
    }
}