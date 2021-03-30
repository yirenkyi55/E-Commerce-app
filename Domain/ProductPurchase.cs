using System;
using Domain.Common;
using Domain.Identity;

namespace Domain
{
    public class ProductPurchase: BaseEntity
    {
        public Guid ProductId { get; set; }

        public virtual Product Product { get; set; }

        public string UserId { get; set; }

        public virtual User User { get; set; }

        public int QuantityPurchased { get; set; }

        public decimal PurchasedPrice { get; set; }

        public bool IsConfirmed { get; set; }

        public DateTime PurchasedDate { get; set; } =  DateTime.Now;

        public virtual ShippingInfo ShippingInfo { get; set; }
        
        
    }
}