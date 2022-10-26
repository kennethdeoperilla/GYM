using AutoMapper;
using GYMAPI.Core.Application._Interfaces;
using GYMAPI.Core.Application._Exceptions;
using GYMAPI.Application.Members.Models;
using GYMAPI.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace GYMAPI.Application.Members.Queries.GetMember
{
  public class GetMemberQuery : IRequest<IEnumerable<MemberDto>>
  {
    public long Id { get; set; }
  }

  public class GetMemberQueryHandler : IRequestHandler<GetMemberQuery, IEnumerable<MemberDto>>
  {
    private readonly AppDbContext dbContext;
    private readonly IMapper mapper;

    public GetMemberQueryHandler(AppDbContext dbContext, IMapper mapper)
    {
      this.dbContext = dbContext;
      this.mapper = mapper;
    }

    public async Task<IEnumerable<MemberDto>> Handle(GetMemberQuery request, CancellationToken cancellationToken)
    {
      var query = await this.dbContext.Members.ToListAsync(cancellationToken);

      if (query is null)
      {
        throw new NotFoundException("Member not found");
      }

      return this.mapper.Map<IEnumerable<MemberDto>>(query);
    }
  }
}
