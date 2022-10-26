using System;

namespace GYMAPI.Core.Application._Exceptions
{
    public class DeactivatedException : Exception
    {
        public DeactivatedException(string message)
            : base(message)
        {
        }
    }
}
