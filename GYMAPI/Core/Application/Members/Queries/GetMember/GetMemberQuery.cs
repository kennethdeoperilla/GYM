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
  public class GetMemberQuery : IRequest<MemberDto>
  {
    public long Id { get; set; }
  }
}
