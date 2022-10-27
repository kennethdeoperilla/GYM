using GYMAPI.Core.Application._Exceptions;
using GYMAPI.Core.Application._Interfaces;
using GYMAPI.Data;
using GYMAPI.Models;
using MediatR;

namespace GYMAPI.Core.Application.Members.Commands.AddMember
{
  public class AddMemberCommandHandler : IRequestHandler<AddMemberCommand, long>
  {
    private readonly IAppDbContext dbContext;

    public AddMemberCommandHandler(IAppDbContext dbContext)
    {
      this.dbContext = dbContext;
    }

    public async Task<long> Handle(AddMemberCommand request, CancellationToken cancellationToken)
    {

      if (this.dbContext.Members.Any(x => x.FirstName == request.FirstName.ToUpper().Trim()
                                    && x.LastName == request.LastName.ToUpper().Trim()
                                    && !x.IsDeleted))
      {
        throw new DuplicateException("Member with the same Full name already exists.");
      }

      request.UniqueId = Guid.NewGuid();

      //Add or Create New Entity
      var entity = new Member
      {
        UniqueId = request.UniqueId,
        FirstName = request.FirstName,
        LastName = request.LastName,
        Address = request.Address,
        Gender = request.Gender,
        ContactNumber = request.ContactNumber,
        CreatedOn = DateTime.Now,

        IsActive = true,
        IsDeleted = false,
        MembershipStatus = new MembershipStatus
        {
          MembershipValidity = request.MembershipValidity.ToString(),
          IsMembershipActive = true,
          StartDate = request.StartDate,
        }
      };

      this.dbContext.Members.Add(entity);
      await this.dbContext.SaveChangesAsync(cancellationToken);

      return entity.Id;
    }
  }
}
