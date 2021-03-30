using Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations
{
    public class RatingConfiguration: IEntityTypeConfiguration<Rating>
    {
        public void Configure(EntityTypeBuilder<Rating> builder)
        {
            builder.HasOne(x => x.Product)
                .WithMany(p => p.Ratings)
                .HasForeignKey(x => x.ProductId);
            
            builder.HasOne(x => x.User)
                .WithMany(u => u.Ratings)
                .HasForeignKey(x => x.UserId);
        }
    }
}