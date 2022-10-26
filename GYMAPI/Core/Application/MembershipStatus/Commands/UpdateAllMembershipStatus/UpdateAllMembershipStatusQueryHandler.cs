using GYMAPI.Data;
using MediatR;

namespace GYMAPI.Core.Application.MembershipStatus.Commands.UpdateAllMembershipStatus
{
  public class UpdateAllMembershipStatusQueryHandler : IRequestHandler<UpdateAllMembershipStatusCommand, Unit>
  {
    private readonly AppDbContext dbContext;

    public UpdateAllMembershipStatusQueryHandler(AppDbContext dbContext)
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

      await this.dbContext.SaveChangesAsync();

      return Unit.Value;
    }
  }
}
