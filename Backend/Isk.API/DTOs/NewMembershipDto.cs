using System;

namespace Isk.API.DTOs
{
    public class NewMembershipDto
    {
        public string MembershipName { get; set; }

        // Gym Membership
        public DateTime? GymMembershipStartDate { get; set; }
        public DateTime? GymMembershipEndDate { get; set; }
        public string GymStatus { get; set; } = "ACTIVE";
        public bool GymAccess { get; set; }

        // Martial Arts Membership
        public DateTime? MartialMembershipStartDate { get; set; }
        public DateTime? MartialMembershipEndDate { get; set; }
        public string MartialStatus { get; set; } = "ACTIVE";
        public bool MartialArtsAccess { get; set; }

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

        // Reminder Settings
        public bool WhatsAppReminder { get; set; } = true;
        public bool EmailReminder { get; set; } = false;
        public int ReminderDaysBefore { get; set; } = 7;

        // Remarks
        public string Remarks { get; set; }
    }
}