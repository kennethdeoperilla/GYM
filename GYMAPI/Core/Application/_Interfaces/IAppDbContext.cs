using GYMAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace GYMAPI.Core.Application._Interfaces
{
  public interface IAppDbContext
  {
    DbSet<Member> Members { get; set; }

    DbSet<MembershipStatus> MembershipStatuses { get; set; }

    /******************************************************************************/

    EntityEntry Remove(object entity);

    void RemoveRange(IEnumerable<object> entities);

    int SaveChanges();

    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
  }
}
