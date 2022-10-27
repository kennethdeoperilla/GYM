using GYMAPI.Core.Application._Exceptions;
using GYMAPI.Core.Application._Interfaces;
using MediatR;

namespace GYMAPI.Core.Application.Members.Commands.UpdateMember
{
  public class UpdateMemberCommandHandler : IRequestHandler<UpdateMemberCommand, Unit>
  {
    private readonly IAppDbContext dbContext;

    public UpdateMemberCommandHandler(IAppDbContext dbContext)
    {
      this.dbContext = dbContext;
    }

    public async Task<Unit> Handle(UpdateMemberCommand request, CancellationToken cancellationToken)
    {
      if(this.dbContext.Members.Any(x => x.FirstName == request.FirstName.Trim().ToUpper()
                                                && x.LastName == request.LastName.Trim().ToUpper()
                                                && !x.IsDeleted && x.Id != request.Id))
      {
        throw new DuplicateException("Member with the same Full name already exists.");
      }

      var entity = await this.dbContext.Members.FindAsync(request.Id);

      if(entity is null)
      {
        throw new NotFoundException("Member not found.");
      }

      //Update
      entity.FirstName = request.FirstName;
      entity.LastName = request.LastName;
      entity.Address = request.Address;
      entity.Gender = request.Gender;
      entity.ContactNumber = request.ContactNumber;
      entity.MembershipStatus.MembershipValidity = request.MembershipValidity;
      entity.MembershipStatus.StartDate = request.StartDate;

      var endDate = request.StartDate.AddMonths(Convert.ToInt32(request.MembershipValidity));

      if (endDate >= DateTime.Now)
      {
        entity.MembershipStatus.IsMembershipActive = true;
      }
      else if (endDate < DateTime.Now)
      {
        entity.MembershipStatus.IsMembershipActive = false;
      }

      entity.ModifiedOn = DateTime.Now;

      await this.dbContext.SaveChangesAsync(cancellationToken);

      return Unit.Value;
    }
  }
}
