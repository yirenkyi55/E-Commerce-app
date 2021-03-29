using System;
using Domain.Common;
using Domain.Identity;

namespace Domain
{
    public class ShippingInfo: BaseEntity
    {
        public string UserId { get; set; }

        public virtual User User { get; set; }

        public Guid ProductPurchaseId { get; set; }

        public virtual ProductPurchase ProductPurchase { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Address { get; set; }

        public string City { get; set; }

        public string PostalCode { get; set; }

        public string Country { get; set; }

        public string PhoneNumber { get; set; }
    }
}