using AutoMapper;
using Domain;

namespace Application.Brands.Dtos
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<ProductBrand, ProductBrandForReturnDto>();
            CreateMap<ProductBrandForCreateDto, ProductBrand>();
        }
    }
}