using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Isk.API.DTOs
{
    public class ExpiredMemberDto
    {
        public int UserId { get; set; }

        public bool GymExpired { get; set; }

        public string GymDeviceUserId { get; set; }

        public bool MartialExpired { get; set; }

        public string MartialDeviceUserId { get; set; }
        public DateTime? GymStartDate { get; set; }
        public DateTime? GymEndDate { get; set; }


        public DateTime? MartialStartDate { get; set; }
        public DateTime? MartialEndDate { get; set; }
    }
}