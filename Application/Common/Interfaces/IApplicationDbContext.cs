using System.Threading;
using System.Threading.Tasks;
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
        
        public DbSet<ProductPurchase> ProductPurchases { get; set; }
        
        public DbSet<ShippingInfo> ShippingInfos { get; set; }
        
        public DbSet<Contact> Contacts { get; set; }

        public DbSet<About> Abouts { get; set; }

        public DbSet<Rating> Ratings { get; set; }

        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}