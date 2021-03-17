using Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations
{
    public class ProductBrandConfiguration : IEntityTypeConfiguration<ProductBrand>
    {
        public void Configure(EntityTypeBuilder<ProductBrand> builder)
        {
            builder.Property(b => b.Name).IsRequired().HasMaxLength(150);

            builder.HasOne(b => b.ProductType)
            .WithMany(t => t.ProductBrands)
            .HasForeignKey(b => b.ProductTypeId);
        }
    }
}