using GYMAPI.Core.Application._Exceptions;
using GYMAPI.Data;
using GYMAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace GYMAPI.Interface.WebAPI.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class MembersController : Controller
  {
    private readonly AppDbContext dBContext;

    public MembersController(AppDbContext dBContext)
    {
      this.dBContext = dBContext;
    }



    [HttpGet("getAllMembers")]
    public async Task<IActionResult> GetAllMembers()
    {
      var members = await dBContext.Members
        .Where(x => !x.IsDeleted)
        .ToListAsync();
      return Ok(members);
    }

    [HttpPost("addMember")]
    public async Task<IActionResult> AddMember([FromBody] AddMember memberRequest)
    {
      if(this.dBContext.Members.Any(x => x.FirstName == memberRequest.FirstName.ToUpper().Trim()
                                    && x.LastName == memberRequest.LastName.ToUpper().Trim()))
      {
        return BadRequest("Member with the same Full name already existed.");
      }

      memberRequest.UniqueId = Guid.NewGuid();

      var entity = new Member
      {
        UniqueId = memberRequest.UniqueId,
        FirstName = memberRequest.FirstName,
        LastName = memberRequest.LastName,
        Address = memberRequest.Address,
        Gender = memberRequest.Gender,
        ContactNumber = memberRequest.ContactNumber,

        IsActive = true,
        IsDeleted = false,
        MembershipStatus = new MembershipStatus
        {
          MembershipValidity = memberRequest.MembershipValidity.ToString(),
          IsMembershipActive = true,
          StartDate = memberRequest.StartDate,
        }
      };

      await dBContext.Members.AddAsync(entity);
      await dBContext.SaveChangesAsync();
      return Ok(memberRequest);
    }

    [AllowAnonymous]
    [HttpGet("{id}")]
    //[Route("{id:Guid}")]
    public async Task<IActionResult> GetMember([FromRoute] long id)
    {
      var member = await dBContext.Members.FindAsync(id);

      if (member == null)
      {
        return NotFound();
      }
      return Ok(member);

    }

    //[HttpPut]
    //[Route("{id:Guid}")]
    [HttpPost("updateMember/{id}")]
    public async Task<IActionResult> UpdateMember([FromRoute] long id, UpdateMemberDetails updateMemberRequest) //update from route, then yung object tapos kung ano ipapangalan
    {
      var member = await dBContext.Members.FindAsync(id);

      if (member == null)
      {
        return NotFound();
      }

      member.FirstName = updateMemberRequest.FirstName;
      member.LastName = updateMemberRequest.LastName;
      member.Gender = updateMemberRequest.Gender;
      member.Address = updateMemberRequest.Address;
      member.ContactNumber = updateMemberRequest.ContactNumber;
      member.ModifiedOn = DateTime.Now;

      member.MembershipStatus.MembershipValidity = updateMemberRequest.MembershipValidity;
      member.MembershipStatus.StartDate = updateMemberRequest.StartDate;

      var endDate = updateMemberRequest.StartDate.AddMonths(Convert.ToInt32(updateMemberRequest.MembershipValidity));

      if(endDate >= DateTime.Now)
      {
        member.MembershipStatus.IsMembershipActive = true;
      }
      else if (endDate < DateTime.Now)
      {
        member.MembershipStatus.IsMembershipActive = false;
      }

      await dBContext.SaveChangesAsync();
      return Ok(member);

    }

    [HttpPost("deleteMember/{id}")]
    //[Route("{id:Guid}")]
    public async Task<IActionResult> DeleteMember([FromRoute] long id)
    {
      var member = await dBContext.Members.FindAsync(id);

      if (member == null)
      {
        return NotFound();
      }
      if (member.IsDeleted)
      {
        return BadRequest("Member already deleted.");
      }
      if (member.MembershipStatus.IsMembershipActive)
      {
        return BadRequest("Can not delete Member with active membership.");
      }

      member.IsDeleted = true;
      await dBContext.SaveChangesAsync();
      return Ok(member);
    }


  }

}
