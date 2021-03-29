using System;
using Domain;
using Domain.Identity;

namespace Application.Products.Dtos
{
    public class ProductPurchaseForReturnDto
    {
        public ProductForReturnDto  Product { get; set; }
        
        public UserForReturnDto  User { get; set; }

        public int QuantityPurchased { get; set; }

        public decimal PurchasedPrice { get; set; }

        public DateTime PurchasedDate { get; set; }
        
        public bool IsConfirmed { get; set; }
    }
}