namespace GYMAPI.Models
{
  public class AddMember
  {
    public Guid UniqueId { get; set; }

    public string FirstName { get; set; }

    public string LastName { get; set; }

    public string Gender { get; set; }

    public string Address { get; set; }

    public string ContactNumber { get; set; }

    public long MembershipValidity { get; set; }

    public DateTime StartDate { get; set; }

  }
}
