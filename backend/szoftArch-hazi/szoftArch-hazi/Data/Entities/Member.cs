using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace szoftArch_hazi.Data.Entities
{
    public class Member
    {
        public int Id { get; set; }
        public int GroupId { get; set; }
        public Group Group { get; set; }
        public string UserId { get; set; }
        public User User { get; set; }
        public bool IsAdmin { get; set; }
    }
    public class MemberConfig : IEntityTypeConfiguration<Member>
    {
        public void Configure(EntityTypeBuilder<Member> builder)
        {
            builder.HasOne(m => m.Group)
                   .WithMany(g => g.Members)
                   .HasForeignKey(m => m.GroupId)
                   .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(m => m.User)
                   .WithMany(g => g.Memberships)
                   .HasForeignKey(m => m.UserId)
                   .OnDelete(DeleteBehavior.Cascade);

        }
    }
}
