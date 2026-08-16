using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Isk.API.Models
{
    public class MemberShip
    {
        public int Id { get; set; }

        // User
        public int UserId { get; set; }

        // Membership Details
        public string MembershipName { get; set; }

        // Validity
        public bool GymAccess { get; set; }
        public DateTime GymStartDate { get; set; }
        public DateTime GymEndDate { get; set; }

        public bool MartialArtsAccess { get; set; }
        public DateTime MartialStartDate { get; set; }
        public DateTime MartialEndDate { get; set; }
        // Status
        public string GymStatus { get; set; }                  // Active / Expired / Frozen / Cancelled
        public string MartialStatus { get; set; }                  // Active / Expired / Frozen / Cancelled

        // Pricing
        public decimal JoiningFee { get; set; }
        public decimal MembershipFee { get; set; }
        public decimal Discount { get; set; }
        public decimal Tax { get; set; }
        public decimal TotalAmount { get; set; }
        public decimal AmountPaid { get; set; }
        public decimal BalanceAmount { get; set; }

        // Payment
        public string PaymentMode { get; set; }
        public string TransactionReference { get; set; }
        public DateTime? PaymentDate { get; set; }

        // Device Access
        
        

        // Notifications
        public bool WhatsAppReminder { get; set; }
        public bool EmailReminder { get; set; }
        public int ReminderDaysBefore { get; set; }

        // Remarks
        public string Remarks { get; set; }
    }
}