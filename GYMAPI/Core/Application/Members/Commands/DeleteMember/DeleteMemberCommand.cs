using MediatR;

namespace GYMAPI.Core.Application.Members.Commands.DeleteMember
{
  public class DeleteMemberCommand : IRequest<Unit>
  {
    public long Id { get; set; }
  }
}
