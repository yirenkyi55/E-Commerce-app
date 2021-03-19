using AutoMapper;
using Domain.Identity;

namespace Application.Auth.Dtos
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<User, AuthUserForReturnDto>();
            CreateMap<AuthUserForCreateDto, User>();
        }

    }
}