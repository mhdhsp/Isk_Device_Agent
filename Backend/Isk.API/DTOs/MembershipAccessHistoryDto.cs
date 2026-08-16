using System;

using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Isk.API.DTOs
{
    public class MembershipAccessHistoryDto
    {
        public int UserId { get; set; }

        public int? MembershipId { get; set; }

        public int Device { get; set; }

        public string ActionType { get; set; }

        public string Reason { get; set; }

        public string DeviceUserId { get; set; }

        public DateTime? StartDate { get; set; }

        public DateTime? EndDate { get; set; }

        public bool Success { get; set; }

        public string Message { get; set; }

        public string CreatedBy { get; set; }
    }
}