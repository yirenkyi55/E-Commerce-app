using Domain.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            //FirstName is required and has maximum length of 150
            builder.Property(u => u.FirstName).IsRequired().HasMaxLength(150);

            //LastName is required and has maximum length of 150
            builder.Property(u => u.LastName).IsRequired().HasMaxLength(150);

            //Users photo should have a maximum of 250 characters
            builder.Property(u => u.Photo).HasMaxLength(150);


        }
    }
}