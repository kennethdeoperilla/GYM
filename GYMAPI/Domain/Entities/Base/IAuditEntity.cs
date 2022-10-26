using System;

namespace GYMAPI.Domain.Entities.Base
{
    public interface IAuditEntity
    {
        //long? CreatedById { get; set; }
        //User CreatedBy { get; set; }

        DateTime CreatedOn { get; set; }

        //long? ModifiedById { get; set; }
        //User ModifiedBy { get; set; }

        DateTime? ModifiedOn { get; set; }
    }
}
