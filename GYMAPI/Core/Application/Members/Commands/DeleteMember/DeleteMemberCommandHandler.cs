using GYMAPI.Core.Application._Exceptions;
using GYMAPI.Core.Application._Interfaces;
using MediatR;

namespace GYMAPI.Core.Application.Members.Commands.DeleteMember
{
  public class DeleteMemberCommandHandler : IRequestHandler<DeleteMemberCommand, Unit>
  {
    private readonly IAppDbContext dbContext;

    public DeleteMemberCommandHandler(IAppDbContext dbContext)
    {
      this.dbContext = dbContext;
    }

    public async Task<Unit> Handle(DeleteMemberCommand request, CancellationToken cancellationToken)
    {
      var member = await this.dbContext.Members.FindAsync(request.Id);

      if (member == null)
      {
        throw new NotFoundException("Member not found.");
      }
      if (member.IsDeleted)
      {
        throw new AlreadyDeletedException("Member already deleted.");
      }
      if (member.MembershipStatus.IsMembershipActive)
      {
        throw new InUseException("Can not delete Member with active membership.");
      }

      member.IsDeleted = true;

      await this.dbContext.SaveChangesAsync(cancellationToken);

      return Unit.Value;
    }
  }
}
