using GYMAPI.Domain.Entities.Base;

namespace GYMAPI.Models
{
    public class Member : EntityBase
    {
        public Guid UniqueId { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Gender { get; set; }

        public string Address { get; set; }

        public string ContactNumber { get; set; }

        public bool IsDeleted { get; set; }

        public bool IsActive { get; set; }

        public long MembershipStatusId { get; set; }

        public virtual MembershipStatus MembershipStatus { get; set; }
  }
}
