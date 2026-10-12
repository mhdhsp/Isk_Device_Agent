using Dapper;
using Isk.API.DTOs;
using Npgsql;
using System;

namespace Isk.API.Repositories
{
    public class MembershipRepository
    {
        public void InsertMembership(
            NpgsqlConnection db,
            NpgsqlTransaction transaction,
            int userId,
            NewMembershipDto membership)
        {
            const string sql = @"
INSERT INTO memberships
(
    userId,
    membershipName,

    gymStartDate,
    gymEndDate,

    martialStartDate,
    martialEndDate,

    gymStatus,
    martialStatus,

    joiningFee,
    membershipFee,
    discount,
    tax,
    totalAmount,
    amountPaid,
    balanceAmount,

    paymentMode,
    transactionReference,
    paymentDate,

    gymAccess,
    martialArtsAccess,

    whatsappReminder,
    emailReminder,
    reminderDaysBefore,

    remarks,

    createdAt,
    createdBy,

    isDeleted,
    isActive
)
VALUES
(
    @UserId,
    @MembershipName,

    @GymStartDate,
    @GymEndDate,

    @MartialStartDate,
    @MartialEndDate,

    @GymStatus,
    @MartialStatus,

    @JoiningFee,
    @MembershipFee,
    @Discount,
    @Tax,
    @TotalAmount,
    @AmountPaid,
    @BalanceAmount,

    @PaymentMode,
    @TransactionReference,
    @PaymentDate,

    @GymAccess,
    @MartialArtsAccess,

    @WhatsAppReminder,
    @EmailReminder,
    @ReminderDaysBefore,

    @Remarks,

    @CreatedAt,
    @CreatedBy,

    false,
    true
);";

            db.Execute(
                sql,
                new
                {
                    UserId = userId,

                    membership.MembershipName,

                    GymStartDate = membership.GymMembershipStartDate,
                    GymEndDate = membership.GymMembershipEndDate,

                    MartialStartDate = membership.MartialMembershipStartDate,
                    MartialEndDate = membership.MartialMembershipEndDate,

                    membership.GymStatus,
                    membership.MartialStatus,

                    membership.JoiningFee,
                    membership.MembershipFee,
                    membership.Discount,
                    membership.Tax,
                    membership.TotalAmount,
                    membership.AmountPaid,
                    membership.BalanceAmount,

                    membership.PaymentMode,
                    membership.TransactionReference,
                    membership.PaymentDate,

                    membership.GymAccess,
                    membership.MartialArtsAccess,

                    membership.WhatsAppReminder,
                    membership.EmailReminder,
                    membership.ReminderDaysBefore,

                    membership.Remarks,

                    CreatedAt = DateTime.UtcNow,
                    CreatedBy = "System"
                },
                transaction);
        }
    }
}