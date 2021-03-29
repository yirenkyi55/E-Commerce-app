using Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations
{
    public class ProductPurchaseConfiguration: IEntityTypeConfiguration<ProductPurchase>
    {
        public void Configure(EntityTypeBuilder<ProductPurchase> builder)
        {
            builder.HasOne(x => x.Product)
                .WithMany(p => p.ProductPurchases)
                .HasForeignKey(x => x.ProductId);
            
            builder.HasOne(x => x.User)
                .WithMany(u => u.ProductPurchases)
                .HasForeignKey(x => x.UserId);
            
        }
    }
}