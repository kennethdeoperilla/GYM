using MediatR;

namespace GYMAPI.Core.Application.Members.Commands.UpdateMember
{
  public class UpdateMemberCommand : IRequest<Unit>
  {
    public long Id { get; set; }

    public string FirstName { get; set; }

    public string LastName { get; set; }

    public string Gender { get; set; }

    public string Address { get; set; }

    public string ContactNumber { get; set; }

    public string IsStudent { get; set; }

    public string MembershipValidity { get; set; }

    public DateTime StartDate { get; set; }
  }
}
