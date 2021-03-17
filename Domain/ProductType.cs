using System.Collections.Generic;
using Domain.Common;

namespace Domain
{
    public class ProductType : BaseEntity
    {
        public ProductType()
        {
            ProductBrands = new HashSet<ProductBrand>();
            Products = new HashSet<Product>();
        }

        /// <summary>
        /// The name of the type
        /// </summary>    
        public string Name { get; set; }

        /// <summary>
        /// A collection of brands belonging to this type
        /// </summary>
        public virtual ICollection<ProductBrand> ProductBrands { get; set; }

        /// <summary>
        /// A collection of products belonging to this type
        /// </summary>
        public virtual ICollection<Product> Products { get; set; }
    }
}