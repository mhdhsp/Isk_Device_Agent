using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Isk.API.DTOs
{
    public class GetUserDto
    {
        public int Id { get; set; }

        public string FullName { get; set; }

        public string MobileNumber { get; set; }

        public string MembershipName { get; set; }

        public DateTime? GymStartDate { get; set; }

        public DateTime? GymEndDate { get; set; }

        public DateTime? MartialStartDate { get; set; }

        public DateTime? MartialEndDate { get; set; }

        public string GymStatus { get; set; }

        public string MartialStatus { get; set; }

        public bool GymAccess { get; set; }

        public bool MartialArtsAccess { get; set; }

        public bool RegisteredInGymDevice { get; set; }

        public bool RegisteredInMartialArtsDevice { get; set; }

        public string GymDeviceUserId { get; set; }

        public string MartialArtsDeviceUserId { get; set; }
    }
}