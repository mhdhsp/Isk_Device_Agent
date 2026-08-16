using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Isk.API.DTOs
{
    public class UpdateUserDto
    {
        public string FullName { get; set; }

        public string HouseName { get; set; }
        public string Place { get; set; }
        public string District { get; set; }
        public string State { get; set; }
        public string Country { get; set; }
        public string PinCode { get; set; }

        public string Occupation { get; set; }

        public DateTime? DateOfBirth { get; set; }

        public string Gender { get; set; }
        public string BloodGroup { get; set; }

        public string Weight { get; set; }
        public string Height { get; set; }

        public string MobileNumber { get; set; }
        public string WhatsAppNumber { get; set; }
        public string Email { get; set; }

        public string EmergencyContactName { get; set; }
        public string EmergencyContactNumber { get; set; }

        public bool RegisteredInGymDevice { get; set; }
        public string GymDeviceUserId { get; set; }
        public bool RegisteredInMartialArtsDevice { get; set; }
        public string MartialArtsDeviceUserId { get; set; }

        public string Remarks { get; set; }
    }
}