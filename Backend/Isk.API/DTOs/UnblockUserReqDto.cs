using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Isk.API.DTOs
{
    public class UnblockUserReqDto
    {
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}