using System;
using System.Collections.Generic;

namespace Application.Products.Dtos
{
    public class ProductPurchaseForCreateDto
    {
        public ShippingInfoDto ShippingInfo { get; set; }

        public List<PurchaseDetailsDto> PurchaseDetails { get; set; }

    }

    public class ShippingInfoDto
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Address { get; set; }

        public string City { get; set; }

        public string PostalCode { get; set; }

        public string Country { get; set; }

        public string PhoneNumber { get; set; }
    }

    public class PurchaseDetailsDto
    {
        public Guid ProductId { get; set; }

        public int QuantityPurchased { get; set; }

        public decimal PurchasedPrice { get; set; }
    }
}