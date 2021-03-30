using System;

namespace Application.Abouts.Dtos
{
    public class AboutForReturnDto
    {
        public Guid Id { get; set; }
        
        public string NameOfCompany { get; set; }
        
        public string AboutTitle { get; set; }
        
        public string AboutMessage { get; set; }
    }
}