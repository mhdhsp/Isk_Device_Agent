using Isk.API.DTOs;
using Isk.API.Repositories;
using Isk.Device.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Isk.API.Services
{
    public class MembershipExpiryJob
    {
        private readonly MemberRepository _repository;
        private readonly DeviceService _device;

        public MembershipExpiryJob()
        {
            _repository = new MemberRepository();
            _device = new DeviceService();
        }

        public void Execute()
        {
            var members = _repository.GetExpiredMembers();

            // fn_get_expired_members returns all members; skip those with nothing to process.
            foreach (var member in members.Where(m => m.GymExpired || m.MartialExpired))
            {
                if (member.GymExpired)
                {
                    bool gymBlocked = _device.BlockUser(member.GymDeviceUserId, 1);

                    if (gymBlocked)
                    {
                        // Device block succeeded — reflect the new status in the database.
                        _repository.UpdateAccessStatus(member.UserId, 1);
                    }

                    _repository.SaveMembershipHistory(new MembershipAccessHistoryDto
                    {
                        UserId = member.UserId,
                        MembershipId = 0,
                        Device = 1,
                        ActionType = "BLOCK",
                        Reason = "EXPIRED",
                        DeviceUserId = member.GymDeviceUserId,
                        StartDate = member.GymStartDate,
                        EndDate = member.GymEndDate,
                        Success = gymBlocked,
                        Message = gymBlocked
                            ? "Gym membership expired and device access blocked successfully."
                            : "Gym membership expired but device access could not be blocked.",
                        CreatedBy = "SYSTEM"
                    });
                }

                if (member.MartialExpired)
                {
                    bool martialBlocked = _device.BlockUser(member.MartialDeviceUserId, 2);

                    if (martialBlocked)
                    {
                        // Device block succeeded — reflect the new status in the database.
                        _repository.UpdateAccessStatus(member.UserId, 2);
                    }

                    _repository.SaveMembershipHistory(new MembershipAccessHistoryDto
                    {
                        UserId = member.UserId,
                        MembershipId = 0,
                        Device = 2,
                        ActionType = "BLOCK",
                        Reason = "EXPIRED",
                        DeviceUserId = member.MartialDeviceUserId,
                        StartDate = member.MartialStartDate,
                        EndDate = member.MartialEndDate,
                        Success = martialBlocked,
                        Message = martialBlocked
                            ? "Martial arts membership expired and device access blocked successfully."
                            : "Martial arts membership expired but device access could not be blocked.",
                        CreatedBy = "SYSTEM"
                    });
                }
            }
        }
    }
}
