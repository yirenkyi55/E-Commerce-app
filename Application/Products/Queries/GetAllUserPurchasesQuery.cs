using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Application.Products.Dtos;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Products.Queries
{
    public class GetAllUserPurchases: IRequest<List<ProductPurchaseForReturnDto>>
    {
        public class  GetAllUserPurchaseHandler: IRequestHandler<GetAllUserPurchases, List<ProductPurchaseForReturnDto>>
        {
            private readonly IApplicationDbContext _context;
            private readonly IMapper _mapper;
            private readonly ILoggedInUserService _loggedInUserService;

            public GetAllUserPurchaseHandler(
                IApplicationDbContext context, 
                IMapper mapper,
                ILoggedInUserService loggedInUserService
                )
            {
                _context = context;
                _mapper = mapper;
                _loggedInUserService = loggedInUserService;
            }
            
            public async Task<List<ProductPurchaseForReturnDto>> Handle(GetAllUserPurchases request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.FirstOrDefaultAsync(u =>
                    u.Email == _loggedInUserService.GetLoggedInUserEmail());

                if (user == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, "Account does not exists");
                }

                var purchases = await _context.ProductPurchases.Where(p => p.User.Id == user.Id).ToListAsync();

                return _mapper.Map<List<ProductPurchaseForReturnDto>>(purchases);
            }
        }
     
    }
}