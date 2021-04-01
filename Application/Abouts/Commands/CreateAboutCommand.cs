using System.Threading;
using System.Threading.Tasks;
using Application.Abouts.Dtos;
using Application.Common.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Abouts.Commands
{
    public class CreateAboutCommand: IRequest<AboutForReturnDto>
    {
        public AboutForCreateDto AboutForCreate { get; set; }
        
        public class CreateAboutCommandHandler: IRequestHandler<CreateAboutCommand, AboutForReturnDto>
        {
            private readonly IApplicationDbContext _context;
            private readonly IMapper _mapper;

            public CreateAboutCommandHandler(IApplicationDbContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }
            
            public async Task<AboutForReturnDto> Handle(CreateAboutCommand request, CancellationToken cancellationToken)
            {
              

                var aboutEntity = await _context.Abouts.FirstOrDefaultAsync();

                if (aboutEntity != null)
                {
                    aboutEntity.NameOfCompany = request.AboutForCreate.NameOfCompany;
                    aboutEntity.AboutTitle = request.AboutForCreate.AboutTitle;
                    aboutEntity.AboutMessage = request.AboutForCreate.AboutMessage;

                    await _context.SaveChangesAsync(cancellationToken);

                    return _mapper.Map<AboutForReturnDto>(aboutEntity);
                }
                else
                {
                    var about = _mapper.Map<About>(request.AboutForCreate);
                    _context.Abouts.Add(about);
                    await _context.SaveChangesAsync(cancellationToken);

                    return _mapper.Map<AboutForReturnDto>(about);
                }
            }
        }
    }
}