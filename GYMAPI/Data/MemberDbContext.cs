using GYMAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace GYMAPI.Data
{
    public class MemberDbContext : DbContext
    {
        public MemberDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Member> Members { get; set; }
    }
}
