using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Isk.API.Common
{
    public class CommonResponse
    {
        public  bool Success { get; set; }
        public string Message { get; set; } = string.Empty;
        public object Data { get; set; } = null;
    }
}