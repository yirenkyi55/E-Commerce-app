using Domain.Common;

namespace Domain
{
    public class About: BaseEntity
    {
        public string NameOfCompany { get; set; }
        
        public string AboutTitle { get; set; }
        
        public string AboutMessage { get; set; }
    }
}