using GYMAPI.Core.Application._Interfaces;
using GYMAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace GYMAPI.Data
{
    public class AppDbContext : DbContext, IAppDbContext
    {
        public DbSet<Member> Members { get; set; }

        public DbSet<MembershipStatus> MembershipStatuses { get; set; }

        public AppDbContext(DbContextOptions options) : base(options)
        {

        }
  }
}
