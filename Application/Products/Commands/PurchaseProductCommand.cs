using System.Collections.Generic;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Application.Products.Dtos;
using AutoMapper;
using Domain;
using MediatR;

namespace Application.Products.Commands
{
    public class PurchaseProductCommand: IRequest<List<ProductPurchaseForReturnDto>>
    {
        public ProductPurchaseForCreateDto ProductsPurchased { get; set; }
        
        public class PurchaseProductCommandHandler: IRequestHandler<PurchaseProductCommand, List<ProductPurchaseForReturnDto>>
        {
            private readonly IApplicationDbContext _context;
            private readonly ILoggedInUserService _loggedInUserService;
            private readonly IMapper _mapper;
            private readonly IIdentityService _identityService;

            public PurchaseProductCommandHandler(
                IApplicationDbContext context, 
                ILoggedInUserService loggedInUserService,
                IMapper mapper,
                IIdentityService identityService)
            {
                _context = context;
                _loggedInUserService = loggedInUserService;
                _mapper = mapper;
                _identityService = identityService;
            }
            public async Task<List<ProductPurchaseForReturnDto>> Handle(PurchaseProductCommand request, CancellationToken cancellationToken)
            {
                var user = await _identityService.FindUserByEmailAsync(_loggedInUserService.GetLoggedInUserEmail());

                if (user == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, "Account does not exists");
                }
                
                foreach (var purchase in request.ProductsPurchased.PurchaseDetails)
                {
                    var product = await _context.Products.FindAsync(purchase.ProductId);

                    if (product == null)
                    {
                        throw new RestException(HttpStatusCode.NotFound, "Product does not exists");
                    }

                    if ( purchase.QuantityPurchased > product.Quantity)
                    {
                        throw new RestException(HttpStatusCode.BadRequest, $"Purchased quantity of " +
                                                                           $"{purchase.QuantityPurchased} is greater than the on " +
                                                                           $"in stock for product {product.Name}" +
                                                                           $" of available stock {product.Quantity}. Please try again");
                    }
                }
                
                var purchaseProducts = _mapper.Map<List<ProductPurchase>>(request.ProductsPurchased.PurchaseDetails);
                var shippingInfo = _mapper.Map<ShippingInfo>(request.ProductsPurchased.ShippingInfo);
                
                foreach (var purchase in request.ProductsPurchased.PurchaseDetails)
                {
                    var product = await _context.Products.FindAsync(purchase.ProductId);

                    product.Quantity -= purchase.QuantityPurchased;

                    await _context.SaveChangesAsync(cancellationToken);
                }

           
                shippingInfo.User = user;

                foreach (var purchase in purchaseProducts)
                {
                    purchase.User = user;
                    purchase.ShippingInfo = shippingInfo;
                }

                _context.ProductPurchases.AddRange(purchaseProducts);

                await _context.SaveChangesAsync(cancellationToken);

                return _mapper.Map<List<ProductPurchaseForReturnDto>>(purchaseProducts);
            }
        }
    }
}