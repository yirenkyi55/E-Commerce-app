using System;

namespace Application.Contacts.Dtos
{
    public class ContactForReturnDto
    {
        public Guid Id { get; set; }
        
        public string Name { get; set; }

        public string Email { get; set; }

        public string Message { get; set; }
    }
}