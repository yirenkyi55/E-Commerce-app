using System;
using Microsoft.AspNetCore.Http;

namespace Application.Products.Dtos
{
    public class ProductForUpdateDto
    {
        public string Name { get; set; }

        public string Description { get; set; }

        public decimal Price { get; set; }
        
        public bool ShowOnHomePage { get; set; }

        public IFormFile Photo { get; set; }

        public Guid ProductTypeId { get; set; }

        public Guid ProductBrandId { get; set; }
    }
}