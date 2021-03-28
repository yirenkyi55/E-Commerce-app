using System;
using Domain.Common;

namespace Domain
{
    public class Product : BaseEntity
    {
        /// <summary>
        /// The name of the product
        /// </summary> 
        public string Name { get; set; }

        /// <summary>
        /// A Description of the product
        /// </summary>
        public string Description { get; set; }

        /// <summary>
        /// The Unit price for the product
        /// </summary>
        public decimal Price { get; set; }

        /// <summary>
        /// The picture for the product
        /// </summary>
        public string Picture { get; set; }

        /// <summary>
        /// Indicates whether we want to show product on home page or not
        /// </summary>
        public bool ShowOnHomePage { get; set; }

        /// <summary>
        /// The product tye id for this product
        /// </summary>
        public Guid ProductTypeId { get; set; }

        /// <summary>
        /// A navigation property for the product type
        /// </summary>
        public virtual ProductType ProductType { get; set; }

        /// <summary>
        /// The id of the product brand
        /// </summary>
        public Guid ProductBrandId { get; set; }

        /// <summary>
        /// A navigation property for the product brand
        /// </summary>
        public virtual ProductBrand ProductBrand { get; set; }
    }
}