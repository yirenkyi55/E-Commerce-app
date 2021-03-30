using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using Application.Products.Dtos;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Products.Queries
{
    public class GetAllPurchasesQuery: IRequest<List<ProductPurchaseForReturnDto>>
    {
        public class  GetAllPurchasesQueryHandler: IRequestHandler<GetAllPurchasesQuery, List<ProductPurchaseForReturnDto>>
        {
            private readonly IApplicationDbContext _context;
            private readonly IMapper _mapper;

            public GetAllPurchasesQueryHandler(IApplicationDbContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }
            
            public async Task<List<ProductPurchaseForReturnDto>> Handle(GetAllPurchasesQuery request, CancellationToken cancellationToken)
            {
                var purchases = await _context.ProductPurchases.ToListAsync();

                return _mapper.Map<List<ProductPurchaseForReturnDto>>(purchases);
            }
        }
     
    }
}