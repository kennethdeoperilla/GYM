using AutoMapper;
using GYMAPI.Core.Application._Interfaces;
using GYMAPI.Core.Application._Exceptions;
using GYMAPI.Application.Members.Models;
using GYMAPI.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace GYMAPI.Application.Members.Queries.GetAllMembers
{
  public class GetAllMembersQuery : IRequest<IEnumerable<MembersListDto>>
  {
    public long Id { get; set; }
  }
}
