using GYMAPI.Core.Application._Interfaces;
using GYMAPI.Data;
using MediatR;

namespace GYMAPI.Core.Application.MembershipStatuses.Commands.UpdateAllMembershipStatus
{
  public class UpdateAllMembershipStatusQueryHandler : IRequestHandler<UpdateAllMembershipStatusCommand, Unit>
  {
    private readonly IAppDbContext dbContext;

    public UpdateAllMembershipStatusQueryHandler(IAppDbContext dbContext)
    {
      this.dbContext = dbContext;
    }

    public async Task<Unit> Handle(UpdateAllMembershipStatusCommand request, CancellationToken cancellationToken)
    {
      var membersQuery = this.dbContext.Members
        .AsQueryable();

      var query = this.dbContext.MembershipStatuses
        .Where(x => x.IsMembershipActive)
        .ToList();

      foreach(var member in membersQuery)
      {
        var startDate = member.MembershipStatus.StartDate;

        var membershipValidity = Convert.ToInt32(member.MembershipStatus.MembershipValidity);

        var endDate = startDate.AddMonths(membershipValidity);

        if (endDate < DateTime.Now)
        {
          member.MembershipStatus.IsMembershipActive = false;
        }
      }

      await this.dbContext.SaveChangesAsync(cancellationToken);

      return Unit.Value;
    }
  }
}
