using GYMAPI.Data;
using GYMAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace GYMAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MembersController : Controller
    {
        private readonly MemberDbContext memberDbContext;

        public MembersController(MemberDbContext memberDbContext)
        {
            this.memberDbContext = memberDbContext;
        }



        [HttpGet]
        public async Task<IActionResult> GetAllMembers()
        {
            var members = await this.memberDbContext.Members.ToListAsync();
            return Ok(members);

            /*var ken = this.memberDbContext.Members.Where(x => x.FirstName.Equals("Kenneth"));
            return Ok(ken);*/
        }

        [HttpPost]
        public async Task<IActionResult> AddMember([FromBody]Member memberRequest)
        {
            memberRequest.Id = Guid.NewGuid();
            await this.memberDbContext.Members.AddAsync(memberRequest);
            await this.memberDbContext.SaveChangesAsync();
            return Ok(memberRequest);
        }

        [HttpGet]
        [Route("{id:Guid}")]
        public async Task<IActionResult> GetMember([FromRoute]Guid id)
        {
           var member =  await this.memberDbContext.Members.FirstOrDefaultAsync(x=>x.Id == id);

            if (member == null)
            {
                return NotFound();
            }
            return Ok(member);

        }

        [HttpPut]
        [Route("{id:Guid}")]
        public async Task<IActionResult> UpdateMember([FromRoute] Guid id, Member updateMemberRequest) //update from route, then yung object tapos kung ano ipapangalan
        {
            //first search for that member. Gamit yung ID 
            var member = await this.memberDbContext.Members.FindAsync(id);

            //then check
            if (member == null)
            {
                //if member is null, return not found. Pero if null, proceed sa sunod 
                return NotFound();
            }

            // if not null, update na lang to
            member.FirstName = updateMemberRequest.FirstName;
            member.LastName = updateMemberRequest.LastName;
            member.Gender = updateMemberRequest.Gender;
            member.Address = updateMemberRequest.Address;
            member.ContactNumber = updateMemberRequest.ContactNumber;

            //Then save 

            await memberDbContext.SaveChangesAsync();
            return Ok(member);
            
        }

        [HttpDelete]
        [Route("{id:Guid}")]
        public async Task<IActionResult> DeleteMember([FromRoute] Guid id)
        {
            var member = await this.memberDbContext.Members.FindAsync(id);

            if (member == null)
            {
                return NotFound();
            }

            this.memberDbContext.Members.Remove(member);
            await this.memberDbContext.SaveChangesAsync();
            return Ok(member);
        }

        
    }

}
