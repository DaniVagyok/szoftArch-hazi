using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace szoftArch_hazi.Data.Entities
{
    public class Group
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public IEnumerable<Item> Items { get; set; }
        public IEnumerable<Set> Sets { get; set; }
        public IEnumerable<Category> Categories { get; set; }
        public IEnumerable<Member> Members { get; set; }
    }
    public class GroupConfig : IEntityTypeConfiguration<Group>
    {
        public void Configure(EntityTypeBuilder<Group> builder)
        {
            builder.HasMany(g => g.Items)
                   .WithOne(i => i.Group)
                   .HasForeignKey(i => i.GroupId)
                   .OnDelete(DeleteBehavior.Cascade);
            builder.HasMany(g => g.Sets)
                   .WithOne(i => i.Group)
                   .HasForeignKey(i => i.GroupId)
                   .OnDelete(DeleteBehavior.Cascade);
            builder.HasMany(g => g.Categories)
                   .WithOne(i => i.Group)
                   .HasForeignKey(i => i.GroupId)
                   .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
