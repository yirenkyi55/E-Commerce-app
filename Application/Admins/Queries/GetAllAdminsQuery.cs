using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Admins.Dtos;
using Application.Common.Interfaces;
using AutoMapper;
using MediatR;

namespace Application.Admins.Queries
{
    public class GetAllAdminsQuery : IRequest<List<AdminUserForReturnDto>>
    {
        public class GetAllAdminsQueryHandler : IRequestHandler<GetAllAdminsQuery, List<AdminUserForReturnDto>>
        {

            private readonly IRoleService _roleService;
            private readonly IMapper _mapper;

            public GetAllAdminsQueryHandler(IRoleService roleService, IMapper mapper)
            {

                _roleService = roleService;
                _mapper = mapper;
            }
            public async Task<List<AdminUserForReturnDto>> Handle(GetAllAdminsQuery request, CancellationToken cancellationToken)
            {
                var users = await _roleService.GetAllUsersInARole("admin");

                return _mapper.Map<List<AdminUserForReturnDto>>(users);
            }
        }
    }
}