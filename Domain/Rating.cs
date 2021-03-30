using System;
using Domain.Common;
using Domain.Identity;

namespace Domain
{
    public class Rating: BaseEntity
    {
        public string UserId { get; set; }

        public virtual User User { get; set; }

        public Guid ProductId { get; set; }

        public virtual Product Product { get; set; }

        public int RatingNumber { get; set; }
    }
}