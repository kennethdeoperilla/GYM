
using GYMAPI.Application.Members.Queries.GetAllMembers;
using GYMAPI.Application.Members.Queries.GetMember;
using GYMAPI.Core.Application._Exceptions;
using GYMAPI.Core.Application.Members.Commands.AddMember;
using GYMAPI.Core.Application.Members.Commands.DeleteMember;
using GYMAPI.Core.Application.Members.Commands.UpdateMember;
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
  public class MembersController : ApiControllerBase
  {
    private readonly AppDbContext dBContext;

    public MembersController(AppDbContext dBContext)
    {
      this.dBContext = dBContext;
    }


    [AllowAnonymous]
    [HttpGet("getAllMembers")]
    public async Task<ActionResult> GetAllMembers()
    {
      try
      {
        var data = await this.Mediator.Send(new GetAllMembersQuery { });

        return new JsonResult(data);
      }

      catch (NotFoundException ex)
      {
        return BadRequest(ex.Message);
      }
      catch (Exception ex)
      {
        return BadRequest(ex.Message);
      }
    }

    [AllowAnonymous]
    [HttpPost("addMember")]
    public async Task<IActionResult> AddMember([FromBody] AddMemberCommand command)
    {
      try
      {
        var id = await this.Mediator.Send(command);

        return new JsonResult(id);
      }
      catch(DuplicateException ex)
      {
        return BadRequest(ex.Message);
      }
      catch (Exception ex)
      {
        return BadRequest(ex.Message);
      }

      //if(this.dBContext.Members.Any(x => x.FirstName == memberRequest.FirstName.ToUpper().Trim()
      //                              && x.LastName == memberRequest.LastName.ToUpper().Trim()))
      //{
      //  return BadRequest("Member with the same Full name already exists.");
      //}

      //memberRequest.UniqueId = Guid.NewGuid();

      //var entity = new Member
      //{
      //  UniqueId = memberRequest.UniqueId,
      //  FirstName = memberRequest.FirstName,
      //  LastName = memberRequest.LastName,
      //  Address = memberRequest.Address,
      //  Gender = memberRequest.Gender,
      //  ContactNumber = memberRequest.ContactNumber,

      //  IsActive = true,
      //  IsDeleted = false,
      //  MembershipStatus = new MembershipStatus
      //  {
      //    MembershipValidity = memberRequest.MembershipValidity.ToString(),
      //    IsMembershipActive = true,
      //    StartDate = memberRequest.StartDate,
      //  }
      //};

      //await dBContext.Members.AddAsync(entity);
      //await dBContext.SaveChangesAsync();
      //return Ok(memberRequest);
    }

    [AllowAnonymous]
    [HttpGet("{id}")]
    public async Task<ActionResult> GetMember([FromRoute] GetMemberQuery query)
    {
      try
      {
        var data = await this.Mediator.Send(query);

        return new JsonResult(data);
      }
      catch (AlreadyDeletedException ex)
      {
        return BadRequest(ex.Message);
      }
      catch (NotFoundException ex)
      {
        return BadRequest(ex.Message);
      }
      catch (Exception ex)
      {
        return BadRequest(ex.Message);
      }
    }

    [AllowAnonymous]
    [HttpPost("updateMember")]
    public async Task<ActionResult> UpdateMember([FromBody] UpdateMemberCommand command) 
    {
      try
      {
        var data = await this.Mediator.Send(command);

        return new JsonResult(data);
      }
      catch (DuplicateException ex)
      {
        return BadRequest(ex.Message);
      }
      catch (NotFoundException ex)
      {
        return BadRequest(ex.Message);
      }
      catch (Exception ex)
      {
        return BadRequest(ex.Message);
      }
    }

    [AllowAnonymous]
    [HttpPost("deleteMember/{id}")]
    public async Task<ActionResult> DeleteMember([FromRoute] DeleteMemberCommand command)
    {
      try
      {
        var unit = await this.Mediator.Send(command);

        return new JsonResult(unit);
      }
      catch (NotFoundException ex)
      {
        return BadRequest(ex.Message);
      }
      catch (AlreadyDeletedException ex)
      {
        return BadRequest(ex.Message);
      }

      catch (InUseException ex)
      {
        return BadRequest(ex.Message);
      }
      catch (Exception ex)
      {
        return BadRequest(ex.Message);
      }
    }
  }
}
