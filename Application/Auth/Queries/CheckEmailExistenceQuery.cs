using System.Threading;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using MediatR;

namespace Application.Auth.Queries
{
    public class CheckEmailExistenceQuery : IRequest<bool>
    {
        public string Email { get; set; }

        public class CheckEmailExistenceHandler : IRequestHandler<CheckEmailExistenceQuery, bool>
        {

            private readonly IIdentityService _identityService;

            public CheckEmailExistenceHandler(IIdentityService identityService)
            {
                _identityService = identityService;
            }

            public async Task<bool> Handle(CheckEmailExistenceQuery request, CancellationToken cancellationToken)
            {
                return await _identityService.FindUserByEmailAsync(request.Email) != null;
            }
        }
    }
}