using AutoMapper;
using Domain.Identity;

namespace Application.Admins.Dtos
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<User, AdminUserForReturnDto>();
        }

    }
}