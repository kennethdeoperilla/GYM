using System;

namespace GYMAPI.Core.Application._Exceptions
{
    public class AlreadyDeletedException : Exception
    {
        public AlreadyDeletedException(string message)
            : base(message)
        {
        }
    }
}
