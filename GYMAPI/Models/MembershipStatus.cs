namespace GYMAPI.Models
{
  public class MembershipStatus
  {
    public long Id { get; set; }

    public string MembershipValidity { get; set; }

    public DateTime StartDate { get; set; }

    public bool IsMembershipActive { get; set; }

    //public virtual ICollection<Member> Members { get; set; }

    //public MembershipStatus()
    //{
    //  this.Members = new HashSet<Member>();
    //}
  }
}
