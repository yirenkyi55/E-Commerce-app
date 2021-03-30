using AutoMapper;

namespace Application.Abouts.Dtos
{
    public class MappingProfile: Profile
    {
        public MappingProfile()
        {
            CreateMap<Domain.About, AboutForReturnDto>();
            
            CreateMap<AboutForCreateDto, Domain.About>();
        }
    }
}