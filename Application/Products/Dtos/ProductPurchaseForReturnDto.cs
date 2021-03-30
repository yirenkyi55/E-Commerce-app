using System;
using Domain;
using Domain.Identity;

namespace Application.Products.Dtos
{
    public class ProductPurchaseForReturnDto
    {
        public Guid Id { get; set; }
        
        public ProductForReturnDto  Product { get; set; }
        
        public UserForReturnDto  User { get; set; }

        public int QuantityPurchased { get; set; }

        public decimal PurchasedPrice { get; set; }

        public DateTime PurchasedDate { get; set; }
        
        public bool IsConfirmed { get; set; }
        
        public  ShippingInfoForReturnDto ShippingInfo { get; set; }
    }
    
    public class ShippingInfoForReturnDto
    {
        public Guid Id { get; set; }
        
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Address { get; set; }

        public string City { get; set; }

        public string PostalCode { get; set; }

        public string Country { get; set; }

        public string PhoneNumber { get; set; }
    }
}