using Isk.API.Common;
using Isk.API.Databse;
using Isk.API.DTOs;
using Isk.API.Models;
using Isk.API.Repositories;
using Isk.Device.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Isk.API.Services
{
    public class UserService
    {
        private readonly MemberRepository _memberRepository;
        private readonly MembershipRepository _membershipRepository;
        private readonly DeviceService _deviceService;

        public UserService()
        {
            _memberRepository = new MemberRepository();
            _membershipRepository = new MembershipRepository();
            _deviceService = new DeviceService();
        }
        public CommonResponse GetAll()
        {
            try
            {
                var users = _memberRepository.GetAll();
                if (users == null && !users.Any())
                {
                    return new CommonResponse
                    {
                        Success = false,
                        Message = "No users found",
                        Data = null
                    };
                }
                return new CommonResponse
                {
                    Success = true,
                    Message = "Users retrieved successfully",
                    Data = users
                };
            }
            catch (Exception ex)
            {
                return new CommonResponse
                {
                    Success = false,
                    Message = $"An error occurred while retrieving users: {ex.Message}",
                    Data = null
                };
            }
        }

        public UserDetailsDto GetUser(int id)
        {
            return _memberRepository.GetUser(id);
        }
        public User CreateUser(NewUserDto dto)
        {
            using (var db = ConnectionFactory.Create())
            using (var transaction = db.BeginTransaction())
            {
                try
                {
                    User user = _memberRepository.InsertUser(
                        db,
                        transaction,
                        dto);

                    _membershipRepository.InsertMembership(
                        db,
                        transaction,
                        user.Id,
                        dto.Membership);

                    transaction.Commit();

                    return user;
                }
                catch
                {
                    transaction.Rollback();
                    throw;
                }
            }
        }

        public CommonResponse BlockUser(int id, int device)
        {
            var user = _memberRepository.GetUser(id);
            if (user == null)
                return new CommonResponse { Success = false, Message = "User not found" };
            string deviceUserId;
            deviceUserId = device == 1 ? user.GymDeviceUserId : user.MartialArtsDeviceUserId;
            if (deviceUserId == null) return new CommonResponse { Success = false, Message = "User does not have registerd for the specified device" };
            bool res = _deviceService.BlockUser(deviceUserId, device);
            if (res == true)
            {
                _memberRepository.UpdateAccessStatus(id, device);
            }

            _memberRepository.SaveMembershipHistory(
                new MembershipAccessHistoryDto
                {
                    UserId = id,
                    MembershipId = 0,
                    Device = device,
                    ActionType = "BLOCK",
                    Reason = "MANUAL",
                    DeviceUserId = deviceUserId,
                    StartDate = device == 1
                        ? user.GymStartDate
                        : user.MartialStartDate,
                    EndDate = device == 1
                        ? user.GymEndDate
                        : user.MartialEndDate,
                    Success = res,
                    Message = res ? "User blocked successfully" : "Device block failed",
                    CreatedBy = "ADMIN"
                });
            return new CommonResponse
            {
                Success = res,
                Message = res ? "User blocked successfully" : "Failed to block user",
                Data = null
            };
        }

        public CommonResponse UnblockUser(int id, DateTime startDate, DateTime endDate, int device)
        {
            var user = _memberRepository.GetUser(id);

            if (user == null)
            {
                return new CommonResponse
                {
                    Success = false,
                    Message = "User not found"
                };
            }

            string deviceUserId = device == 1 ? user.GymDeviceUserId : user.MartialArtsDeviceUserId;

            if (string.IsNullOrWhiteSpace(deviceUserId))
            {
                return new CommonResponse
                {
                    Success = false,
                    Message = "User is not registered in the specified device."
                };
            }

            bool result = _deviceService.UnblockUser(deviceUserId, device);

            if (result)
            {
                _memberRepository.UpdateMembershipDates(id, device, startDate, endDate);
                _memberRepository.RestoreAccessStatus(id, device);
            }
            _memberRepository.SaveMembershipHistory(new MembershipAccessHistoryDto
            {
                UserId = id,
                MembershipId = 0,
                Device = device,
                ActionType = "UNBLOCK",
                Reason = "MANUAL",
                DeviceUserId = deviceUserId,
                StartDate = device == 1
                        ? user.GymStartDate
                        : user.MartialStartDate,
                EndDate = device == 1
                        ? user.GymEndDate
                        : user.MartialEndDate,
                Success = result,
                Message = result ? "User enabled successfully" : "Enable failed",
                CreatedBy = "ADMIN"
            });
            return new CommonResponse
            {
                Success = result,
                Message = result
                    ? "User unblocked successfully."
                    : "Failed to unblock user."
            };
        }

        public CommonResponse DeleteUserFromDevice(int id, int device)
        {
            try
            {
                var user = _memberRepository.GetUser(id);

                if (user == null)
                {
                    return new CommonResponse
                    {
                        Success = false,
                        Message = "User not found."
                    };
                }

                string deviceId = device == 1 ? user.GymDeviceUserId
                        : user.MartialArtsDeviceUserId;

                if (string.IsNullOrWhiteSpace(deviceId))
                {
                    return new CommonResponse
                    {
                        Success = false,
                        Message = "User is not registered on this device."
                    };
                }

                bool deleted =
                    _deviceService.DeleteUser(deviceId, device);

                if (!deleted)
                {
                    return new CommonResponse
                    {
                        Success = false,
                        Message = "Unable to delete user from device."
                    };
                }

                _memberRepository.RemoveDeviceRegistration(id, device);

                return new CommonResponse
                {
                    Success = true,
                    Message = "User deleted successfully."
                };
            }
            catch (Exception ex)
            {
                return new CommonResponse { Success = false, Message = ex.Message };
            }


        }

        public CommonResponse UpdateUser(int id, UpdateUserDto dto)
        {
            try
            {
                if (dto == null)
                {
                    return new CommonResponse
                    {
                        Success = false,
                        Message = "Request is required."
                    };
                }

                var existingUser =
                    _memberRepository.GetUser(id);

                if (existingUser == null)
                {
                    return new CommonResponse
                    {
                        Success = false,
                        Message = "User not found."
                    };
                }

                if (string.IsNullOrWhiteSpace(dto.FullName))
                {
                    return new CommonResponse
                    {
                        Success = false,
                        Message = "Full name is required."
                    };
                }
                if (dto.RegisteredInGymDevice && string.IsNullOrWhiteSpace(dto.GymDeviceUserId))
                {
                    return new CommonResponse
                    {
                        Success = false,
                        Message = "Gym Device User ID is required."
                    };
                }

                if (dto.RegisteredInMartialArtsDevice && string.IsNullOrWhiteSpace(dto.MartialArtsDeviceUserId))
                {
                    return new CommonResponse
                    {
                        Success = false,
                        Message = "Martial Arts Device User ID is required."
                    };
                }
                if (!dto.RegisteredInGymDevice)
                {
                    dto.GymDeviceUserId = null;
                }

                if (!dto.RegisteredInMartialArtsDevice)
                {
                    dto.MartialArtsDeviceUserId = null;
                }
                bool updated = _memberRepository.UpdateUser(id, dto);

                return new CommonResponse
                {
                    Success = updated,

                    Message = updated ? "Member updated successfully." : "Member was not updated."
                };
            }
            catch (Exception ex)
            {
                return new CommonResponse
                {
                    Success = false,
                    Message = ex.Message
                };
            }
        }
    }
}