using AutoMapper;
using GYMAPI.Core.Application._Interfaces.Mapping;
using GYMAPI.Models;

namespace GYMAPI.Application.Members.Models
{
  public class MemberDto : IHaveCustomMapping
  {
    public Guid Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Gender { get; set; }
    public string Address { get; set; }
    public string ContactNumber { get; set; }
    public string MembershipValidity { get; set; }
    public DateTime StartDate { get; set; }

    public void CreateMappings(Profile configuration)
    {
      configuration.CreateMap<Member, MemberDto>();
    }
  }
}
