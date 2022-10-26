using System;

namespace GYMAPI.Core.Application._Exceptions
{
    public class UnsupportedFileTypeException : Exception
    {
        public UnsupportedFileTypeException(string message)
            : base(message)
        {
        }
    }
}
