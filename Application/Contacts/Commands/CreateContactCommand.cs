using System.Threading;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using Application.Contacts.Dtos;
using AutoMapper;
using Domain;
using MediatR;

namespace Application.Contacts.Commands
{
    public class CreateContactCommand: IRequest
    {
        public ContactForCreateDto Contact { get; set; }
        
        public class  CreateContactCommandHandler: IRequestHandler<CreateContactCommand>
        {
            private readonly IApplicationDbContext _context;
            private readonly IMapper _mapper;

            public CreateContactCommandHandler(IApplicationDbContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }
            
            public async Task<Unit> Handle(CreateContactCommand request, CancellationToken cancellationToken)
            {
                var contact = _mapper.Map<Contact>(request.Contact);

                _context.Contacts.Add(contact);
                await _context.SaveChangesAsync(cancellationToken);
                return Unit.Value;

            }
        }
    }
}