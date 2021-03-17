using System;
using System.Collections.Generic;
using Domain.Common;

namespace Domain
{
    public class ProductBrand : BaseEntity
    {
        public ProductBrand()
        {
            Products = new HashSet<Product>();
        }

        /// <summary>
        /// The name of the brand
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// The product type for this brand
        /// </summary>     
        public Guid ProductTypeId { get; set; }

        /// <summary>
        /// A navigation property for  the product type
        /// </summary>
        public virtual ProductType ProductType { get; set; }

        public virtual ICollection<Product> Products { get; set; }
    }
}