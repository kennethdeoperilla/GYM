using AutoMapper;
using GYMAPI.Core.Application._Interfaces.Mapping;
using GYMAPI.Models;

namespace GYMAPI.Application.Members.Models
{
  public class MembersListDto : IHaveCustomMapping
  {
    public long Id { get; set; }

    public string FirstName { get; set; }

    public string LastName { get; set; }

    public string ContactNumber { get; set; }

    public string Gender { get; set; }

    public string MembershipStatus { get; set; }

    public string Address { get; set; }

    public void CreateMappings(Profile configuration)
    {
      configuration.CreateMap<Member, MembersListDto>()
        .ForMember(s => s.MembershipStatus, mo => mo.MapFrom(so =>
                      (so.MembershipStatus.IsMembershipActive != false ? "Active" : "Expired")));
    }
  }
}
