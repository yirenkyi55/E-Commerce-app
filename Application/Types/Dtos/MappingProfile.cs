using AutoMapper;
using Domain;

namespace Application.Types.Dtos
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<ProductType, ProductTypeForReturnDto>();
            CreateMap<ProductTypeForCreateDto, ProductType>();
        }
    }
}