using AutoMapper;
using GYMAPI.Core.Application._Interfaces;
using GYMAPI.Core.Application._Exceptions;
using GYMAPI.Application.Members.Models;
using GYMAPI.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;
using GYMAPI.Core.Application.Members.Models;

namespace GYMAPI.Application.Members.Queries.GetMember
{
  public class GetMemberQueryHandler : IRequestHandler<GetMemberQuery, MemberDto>
  {
    private readonly IAppDbContext dbContext;
    private readonly IMapper mapper;

    public GetMemberQueryHandler(IAppDbContext dbContext, IMapper mapper)
    {
      this.dbContext = dbContext;
      this.mapper = mapper;
    }

    public async Task<MemberDto> Handle(GetMemberQuery request, CancellationToken cancellationToken)
    {
      var query = await this.dbContext.Members
        .FindAsync(request.Id);

      if (query is null)
      {
        throw new NotFoundException("Member not found.");
      }
      if (query.IsDeleted)
      {
        throw new AlreadyDeletedException("Member already deleted.");
      }

      return this.mapper.Map<MemberDto>(query);
    }
  }
}
