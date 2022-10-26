using System;

namespace GYMAPI.Core.Application._Exceptions
{
    public class ExpiredException : Exception
    {
        public ExpiredException(string message)
            : base(message)
        {
        }
    }
}
