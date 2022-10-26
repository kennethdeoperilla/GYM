//using AutoMapper;
//using GYMAPI.Application._Interfaces;
//using GYMAPI.Application.Exceptions;
//using GYMAPI.Application.Members.Models;
//using MediatR;
//using Microsoft.EntityFrameworkCore;

//namespace GYMAPI.Application.Members.Queries.GetMember
//{
//  public class GetMemberQueryHandler : IRequestHandler<GetMemberQuery, IEnumerable<MemberDto>>
//  {
//    private readonly IAppDbContext dbContext;
//    private readonly IMapper mapper;

//    public GetMemberQueryHandler(IAppDbContext dbContext, IMapper mapper)
//    {
//      this.dbContext = dbContext;
//      this.mapper = mapper;
//    }

//    public async Task<IEnumerable<MemberDto>> Handle(GetMemberQuery request, CancellationToken cancellationToken)
//    {
//      var query = await this.dbContext.Members.ToListAsync(cancellationToken);

//      if(query is null)
//      {
//        throw new NotFoundException("Member not found");
//      }

//      return this.mapper.Map<IEnumerable<MemberDto>>(query);
//    }
//  }
//}
