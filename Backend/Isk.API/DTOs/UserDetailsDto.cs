using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Isk.API.DTOs
{
    public class UserDetailsDto
    {
        public int Id { get; set; }
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
        public bool RegisteredInMartialArtsDevice { get; set; }

        public string GymDeviceUserId { get; set; }
        public string MartialArtsDeviceUserId { get; set; }

        public string Remarks { get; set; }

        // Membership

        public string MembershipName { get; set; }

        public DateTime? GymStartDate { get; set; }
        public DateTime? GymEndDate { get; set; }

        public DateTime? MartialStartDate { get; set; }
        public DateTime? MartialEndDate { get; set; }

        public string GymStatus { get; set; }
        public string MartialStatus { get; set; }

        public decimal JoiningFee { get; set; }
        public decimal MembershipFee { get; set; }
        public decimal Discount { get; set; }
        public decimal Tax { get; set; }

        public decimal TotalAmount { get; set; }
        public decimal AmountPaid { get; set; }
        public decimal BalanceAmount { get; set; }

        public string PaymentMode { get; set; }
        public string TransactionReference { get; set; }
        public DateTime? PaymentDate { get; set; }

        public bool GymAccess { get; set; }
        public bool MartialArtsAccess { get; set; }

        public bool WhatsAppReminder { get; set; }
        public bool EmailReminder { get; set; }

        public int ReminderDaysBefore { get; set; }

        // Audit

        public DateTime CreatedAt { get; set; }
        public string CreatedBy { get; set; }

        public DateTime? ModifiedAt { get; set; }
        public string ModifiedBy { get; set; }
    }
}