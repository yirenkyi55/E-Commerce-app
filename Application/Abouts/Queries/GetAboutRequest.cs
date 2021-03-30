using System.Threading;
using System.Threading.Tasks;
using Application.Abouts.Dtos;
using Application.Common.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Abouts.Queries
{
    public class GetAboutRequest: IRequest<AboutForReturnDto>
    {
        public class GetAboutRequestHandler:IRequestHandler<GetAboutRequest,AboutForReturnDto>
        {
            private readonly IApplicationDbContext _context;
            private readonly IMapper _mapper;

            public GetAboutRequestHandler(IApplicationDbContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }
            
            public async Task<AboutForReturnDto> Handle(GetAboutRequest request, CancellationToken cancellationToken)
            {
                var about = await _context.Abouts.FirstOrDefaultAsync();

                return about != null ? _mapper.Map<AboutForReturnDto>(about) : new AboutForReturnDto();
            }
        }
    }
}