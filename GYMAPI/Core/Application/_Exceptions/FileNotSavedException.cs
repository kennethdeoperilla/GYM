using System;

namespace GYMAPI.Core.Application._Exceptions
{
    public class FileNotSavedException : Exception
    {
        public FileNotSavedException(string message)
            : base(message)
        {
        }
    }
}
