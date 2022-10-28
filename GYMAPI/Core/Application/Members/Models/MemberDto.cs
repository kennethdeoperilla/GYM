using AutoMapper;
using GYMAPI.Core.Application._Interfaces.Mapping;
using GYMAPI.Models;

namespace GYMAPI.Core.Application.Members.Models
{
  public class MemberDto : IHaveCustomMapping
  {
    public long Id { get; set; }

    public Guid UniqueId { get; set; }

    public string FirstName { get; set; }

    public string LastName { get; set; }

    public string Gender { get; set; }

    public string Address { get; set; }

    public string ContactNumber { get; set; }

    public string IsStudent { get; set; }

    public DateTime StartDate { get; set; }

    public string MembershipValidity { get; set; }

    public string MembershipStatus { get; set; }

    public void CreateMappings(Profile configuration)
    {
      configuration.CreateMap<Member, MemberDto>()
        .ForMember(x => x.IsStudent, mo => mo.MapFrom(s => s.MembershipStatus.IsStudent != false ? "True" : "False"))
        .ForMember(x => x.MembershipStatus, mo => mo.MapFrom(s => s.MembershipStatus.IsMembershipActive != false ? "Active" : "Expired"))
        .ForMember(x => x.StartDate, mo => mo.MapFrom(s => s.MembershipStatus.StartDate))
        .ForMember(x => x.MembershipValidity, mo => mo.MapFrom(s => s.MembershipStatus.MembershipValidity));
    }
  }
}
