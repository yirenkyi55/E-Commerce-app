using AutoMapper;
using Domain;

namespace Application.Contacts.Dtos
{
    public class MappingProfile: Profile
    {
        public MappingProfile()
        {
            CreateMap<Contact, ContactForReturnDto>();
            
            CreateMap<ContactForCreateDto, Contact>();
        }
    }
}