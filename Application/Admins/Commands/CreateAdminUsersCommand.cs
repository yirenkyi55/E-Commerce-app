using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Admins.Dtos;
using Application.Auth.Commands;
using Application.Auth.Dtos;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using AutoMapper;
using MediatR;

namespace Application.Admins.Commands
{
    public class CreateAdminUsersCommand : IRequest<AdminUserForReturnDto>
    {
        public AuthUserForCreateDto AuthUser { get; set; }
        public class CreateAdminUsersCommandHandler : IRequestHandler<CreateAdminUsersCommand, AdminUserForReturnDto>
        {
            private readonly IApplicationDbContext _context;
            private readonly IMediator _mediator;
            private readonly IIdentityService _identityService;
            private readonly IMapper _mapper;
            private readonly IRoleService _roleService;

            public CreateAdminUsersCommandHandler(
            IApplicationDbContext context,
            IMediator mediator,
            IIdentityService identityService,
            IMapper mapper,
            IRoleService roleService)
            {
                _context = context;
                _mediator = mediator;
                _identityService = identityService;
                _mapper = mapper;
                _roleService = roleService;
            }
            public async Task<AdminUserForReturnDto> Handle(CreateAdminUsersCommand request, CancellationToken cancellationToken)
            {
                var (_, user) = await _mediator.Send(new CreateAccountCommand { AuthUser = request.AuthUser });

                var role = await _roleService.GetRoleByNameAsync("admin");

                if (role == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, "Role does not exists");
                }

                var result = await _identityService.AddUserToRoleAsync(user, "admin");

                if (!result.Succeeded)
                {
                    throw new RestException(HttpStatusCode.BadRequest, "Adding user to role failed");
                }

                return _mapper.Map<AdminUserForReturnDto>(user);
            }
        }
    }
}