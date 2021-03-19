using AutoMapper;
using Domain;

namespace Application.Products.Dtos
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Product, ProductForReturnDto>();
        }
    }
}