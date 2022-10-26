using System;

namespace GYMAPI.Core.Application._Exceptions
{
    public class StaticRecordException : Exception
    {
        public StaticRecordException(string message)
            : base(message)
        {
        }
    }
}
