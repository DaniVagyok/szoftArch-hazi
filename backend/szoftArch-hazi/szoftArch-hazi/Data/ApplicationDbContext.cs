using szoftArch_hazi.Data.Entities;
using IdentityServer4.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace szoftArch_hazi.Data
{
    public class ApplicationDbContext : ApiAuthorizationDbContext<User>
    {
        public DbSet<Group> Groups { get; set; }
        public DbSet<Member> Members { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Item> Items { get; set; }
        public DbSet<Set> Sets { get; set; }

        public ApplicationDbContext( DbContextOptions options, IOptions<OperationalStoreOptions> operationalStoreOptions)
            : base(options, operationalStoreOptions) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfiguration(new GroupConfig());
            modelBuilder.ApplyConfiguration(new MemberConfig());
            //modelBuilder.ApplyConfiguration(new CategoryConfig());
            //modelBuilder.ApplyConfiguration(new ItemConfig());
            //modelBuilder.ApplyConfiguration(new SetConfig());
        }
    }
}
