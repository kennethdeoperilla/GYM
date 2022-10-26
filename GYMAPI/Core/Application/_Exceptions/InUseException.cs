using System;

namespace GYMAPI.Core.Application._Exceptions
{
    public class InUseException : Exception
    {
        public InUseException(string message)
            : base(message)
        {
        }
    }
}
