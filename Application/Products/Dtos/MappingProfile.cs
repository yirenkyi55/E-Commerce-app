using Application.Common.Models;
using Application.Common.Static;
using AutoMapper;
using Domain;

namespace Application.Products.Dtos
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Product, ProductForReturnDto>()
            .ForMember(p => p.Picture, memberOptions =>
            memberOptions.MapFrom(dest => FileResolver.GetFullFilePath(AppSettings.MediaFolder, dest.Picture)));

            CreateMap<ProductForCreateDto, Product>();
        }
    }
}