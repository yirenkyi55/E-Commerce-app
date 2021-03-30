using Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations
{
    public class AboutConfiguration: IEntityTypeConfiguration<About>
    {
        public void Configure(EntityTypeBuilder<About> builder)
        {
            builder.Property(x => x.AboutMessage).IsRequired();
            builder.Property(x => x.NameOfCompany).IsRequired().HasMaxLength(200);
            builder.Property(x => x.AboutTitle).IsRequired().HasMaxLength(100);
        }
    }
}