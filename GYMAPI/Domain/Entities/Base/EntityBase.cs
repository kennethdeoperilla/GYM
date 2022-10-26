using System;

namespace GYMAPI.Domain.Entities.Base
{
    public abstract class EntityBase : IEntity, IAuditEntity
    {
        public long Id { get; set; }

        public DateTime CreatedOn { get; set; }

        public DateTime? ModifiedOn { get; set; }

        public T ShallowCopy<T>() where T : EntityBase
        {
            return (T)(MemberwiseClone());
        }
    }
}
