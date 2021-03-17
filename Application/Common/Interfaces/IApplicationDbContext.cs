using Domain;
using Domain.Identity;
using Microsoft.EntityFrameworkCore;

namespace Application.Common.Interfaces
{
    public interface IApplicationDbContext
    {
        DbSet<User> Users { get; set; }

        DbSet<Product> Products { get; set; }

        DbSet<ProductType> ProductTypes { get; set; }

        DbSet<ProductBrand> ProductBrands { get; set; }
    }
}