using AutoMapper;
using GYMAPI.Core.Application._Interfaces;
using GYMAPI.Core.Application._Exceptions;
using GYMAPI.Application.Members.Models;
using GYMAPI.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace GYMAPI.Application.Members.Queries.GetAllMembers
{

  public class GetAllMembersQueryHandler : IRequestHandler<GetAllMembersQuery, IEnumerable<MembersListDto>>
  {
    private readonly IAppDbContext dbContext;
    private readonly IMapper mapper;

    public GetAllMembersQueryHandler(IAppDbContext dbContext, IMapper mapper)
    {
      this.dbContext = dbContext;
      this.mapper = mapper;
    }

    public async Task<IEnumerable<MembersListDto>> Handle(GetAllMembersQuery request, CancellationToken cancellationToken)
    {
      var query = await this.dbContext.Members
        .Where(x => !x.IsDeleted)
        .ToListAsync(cancellationToken);

      if (query is null)
      {
        throw new NotFoundException("Member not found");
      }

      return this.mapper.Map<IEnumerable<MembersListDto>>(query);
    }
  }
}
