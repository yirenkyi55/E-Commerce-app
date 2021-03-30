using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using Application.Contacts.Dtos;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Contacts.Queries
{
    public class GetAllContactsQuery: IRequest<List<ContactForReturnDto>>
    {
        public class GetAllContactsQueryHandler: IRequestHandler<GetAllContactsQuery,List<ContactForReturnDto>>
        {
            private readonly IApplicationDbContext _context;
            private readonly IMapper _mapper;

            public GetAllContactsQueryHandler(IApplicationDbContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }
            
            
            public async Task<List<ContactForReturnDto>> Handle(GetAllContactsQuery request, CancellationToken cancellationToken)
            {
                var results = await _context.Contacts.ToListAsync();

                return _mapper.Map<List<ContactForReturnDto>>(results);
            }
        }
    }
}