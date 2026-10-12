using Dapper;
using Isk.API.Databse;
using Isk.API.DTOs;
using Isk.API.Models;
using Microsoft.Ajax.Utilities;
using Npgsql;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Isk.API.Repositories
{
    public class MemberRepository
    {
        public IEnumerable<GetUserDto> GetAll()
        {
            using (var db = ConnectionFactory.Create())
            {
                return db.Query<GetUserDto>(
                    "SELECT * FROM fn_get_users();");
            }
        }

        public UserDetailsDto GetUser(int id)
        {
            using (var db = ConnectionFactory.Create())
            {
                return db.QuerySingleOrDefault<UserDetailsDto>(
                    "SELECT * FROM fn_get_user_details(@Id);",
                    new { Id = id });
            }
        }
        public void UpdateAccessStatus(int userId, int device)
        {
            using (var db = ConnectionFactory.Create())
            {
                if (device == 1)
                {
                    db.Execute(@"UPDATE Memberships SET GymAccess = FALSE,GymStatus = 'BLOCKED' WHERE userId = @UserId",
                        new { UserId = userId });
                }
                else
                {
                    db.Execute(@" UPDATE Memberships SET MartialArtsAccess = FALSE, MartialStatus = 'BLOCKED' WHERE userId = @UserId",
                        new { UserId = userId });
                }
            }
        }


        public void RestoreAccessStatus(int userId, int device)
        {
            using (var db = ConnectionFactory.Create())
            {
                if (device == 1)
                {
                    db.Execute(@"UPDATE Memberships SET GymAccess = TRUE, GymStatus = 'ACTIVE' WHERE userId = @UserId",
                    new { UserId = userId });
                }
                else
                {
                    db.Execute(@"UPDATE Memberships SET MartialArtsAccess = TRUE, MartialStatus = 'ACTIVE' WHERE userId = @UserId",
                    new { UserId = userId });
                }
            }
        }
        public void UpdateMembershipDates(int userId, int device, DateTime startDate, DateTime endDate)
        {
            using (var db = ConnectionFactory.Create())
            {
                if (device == 1)
                {
                    db.Execute(@"UPDATE Memberships SET GymStartDate = @StartDate, GymEndDate = @EndDate WHERE UserId = @UserId",
                        new
                        {
                            UserId = userId,
                            StartDate = startDate,
                            EndDate = endDate
                        });
                }
                else
                {
                    db.Execute(@" UPDATE Memberships SET MartialStartDate = @StartDate, MartialEndDate = @EndDate WHERE UserId = @UserId",
                        new
                        {
                            UserId = userId,
                            StartDate = startDate,
                            EndDate = endDate
                        });
                }
            }
        }
        public void RemoveDeviceRegistration(int userId, int device)
        {
            using (var db = ConnectionFactory.Create())
            {

                using (var transaction = db.BeginTransaction())
                {
                    try
                    {
                        if (device == 1)
                        {
                            db.Execute(
                                @"UPDATE Users 
                                    SET GymDeviceUserId = NULL,
                                        RegisteredInGymDevice = FALSE
                                    WHERE Id = @Id",
                                new { Id = userId },
                                transaction);

                            db.Execute(
                                @"UPDATE Memberships
                                    SET GymAccess = FALSE,
                                        GymStatus = 'NOT REGISTERED'
                                    WHERE UserId = @Id",
                                new { Id = userId },
                                transaction);
                        }
                        else if (device == 2)
                        {
                            db.Execute(
                                @"UPDATE Users SET MartialArtsDeviceUserId = NULL,RegisteredInMartialArtsDevice = FALSE WHERE Id = @Id",
                                new { Id = userId },
                                transaction);

                            db.Execute(
                                @"UPDATE Memberships SET MartialArtsAccess = FALSE, MartialStatus = 'NOT REGISTERED' WHERE UserId = @Id",
                                new { Id = userId },
                                transaction);
                        }
                        else
                        {
                            throw new ArgumentException("Invalid device type. Must be 1 (Gym) or 2 (Martial Arts).");
                        }

                        transaction.Commit();
                    }
                    catch
                    {
                        transaction.Rollback();
                        throw;
                    }
                }
            }
        }

        public List<ExpiredMemberDto> GetExpiredMembers()
        {
            using (var db = ConnectionFactory.Create())
            {
                return db.Query<ExpiredMemberDto>(
                    "SELECT * FROM fn_get_expired_members();")
                    .ToList();
            }
        }


        public void SaveMembershipHistory(MembershipAccessHistoryDto model)
        {
            using (var db = ConnectionFactory.Create())
            {
                db.Execute(@"

INSERT INTO MembershipAccessHistory
(
    UserId,
    MembershipId,
    Device,
    ActionType,
    Reason,
    DeviceUserId,
    StartDate,
    EndDate,
    Success,
    Message,
    CreatedBy
)
VALUES
(
    @UserId,
    @MembershipId,
    @Device,
    @ActionType,
    @Reason,
    @DeviceUserId,
    @StartDate,
    @EndDate,
    @Success,
    @Message,
    @CreatedBy
)

", model);
            }
        }


        public User InsertUser(
            NpgsqlConnection db,
            NpgsqlTransaction transaction,
            NewUserDto newUser)
        {
            const string sql = @"
INSERT INTO users
(
    fullName,
    houseName,
    place,
    district,
    state,
    country,
    pinCode,
    occupation,
    dateOfBirth,
    gender,
    bloodGroup,
    weight,
    height,
    mobileNumber,
    whatsappNumber,
    email,
    emergencyContactName,
    emergencyContactNumber,
    registeredInGymDevice,
    registeredInMartialArtsDevice,
    gymDeviceUserId,
    martialArtsDeviceUserId,
    remarks,
    createdAt,
    createdBy,
    modifiedAt,
    modifiedBy,
    isDeleted,
    isActive
)
VALUES
(
    @FullName,
    @HouseName,
    @Place,
    @District,
    @State,
    @Country,
    @PinCode,
    @Occupation,
    @DateOfBirth,
    @Gender,
    @BloodGroup,
    @Weight,
    @Height,
    @MobileNumber,
    @WhatsAppNumber,
    @Email,
    @EmergencyContactName,
    @EmergencyContactNumber,
    @RegisteredInGymDevice,
    @RegisteredInMartialArtsDevice,
    @GymDeviceUserId,
    @MartialArtsDeviceUserId,
    @Remarks,
    @CreatedAt,
    @CreatedBy,
    @ModifiedAt,
    @ModifiedBy,
    @IsDeleted,
    @IsActive
)
RETURNING *;";

            return db.QuerySingle<User>(
                sql,
                new
                {
                    newUser.FullName,
                    newUser.HouseName,
                    newUser.Place,
                    newUser.District,
                    newUser.State,
                    newUser.Country,
                    newUser.PinCode,
                    newUser.Occupation,
                    newUser.DateOfBirth,
                    newUser.Gender,
                    newUser.BloodGroup,
                    newUser.Weight,
                    newUser.Height,
                    newUser.MobileNumber,
                    newUser.WhatsAppNumber,
                    newUser.Email,
                    newUser.EmergencyContactName,
                    newUser.EmergencyContactNumber,
                    newUser.RegisteredInGymDevice,
                    newUser.RegisteredInMartialArtsDevice,
                    newUser.GymDeviceUserId,
                    newUser.MartialArtsDeviceUserId,
                    newUser.Remarks,

                    CreatedAt = DateTime.UtcNow,
                    CreatedBy = "System",
                    ModifiedAt = DateTime.UtcNow,
                    ModifiedBy = "System",
                    IsDeleted = false,
                    IsActive = true
                },
                transaction);
        }


        public bool UpdateUser(int id,  UpdateUserDto user)
        {
            using (var db = ConnectionFactory.Create())
            {
                const string sql = @"
            UPDATE Users
            SET
                FullName = @FullName,
                HouseName = @HouseName,
                Place = @Place,
                District = @District,
                State = @State,
                Country = @Country,
                PinCode = @PinCode,
                Occupation = @Occupation,
                DateOfBirth = @DateOfBirth,
                Gender = @Gender,
                BloodGroup = @BloodGroup,
                Weight = @Weight,
                Height = @Height,
                MobileNumber = @MobileNumber,
                WhatsAppNumber = @WhatsAppNumber,
                Email = @Email,
                EmergencyContactName = @EmergencyContactName,
                EmergencyContactNumber = @EmergencyContactNumber,
                RegisteredInGymDevice = @RegisteredInGymDevice,
                GymDeviceUserId = @GymDeviceUserId,
                RegisteredInMartialArtsDevice = @RegisteredInMartialArtsDevice,
                MartialArtsDeviceUserId = @MartialArtsDeviceUserId,
                Remarks = @Remarks,
                ModifiedAt = @ModifiedAt,
                ModifiedBy = @ModifiedBy
                WHERE Id = @Id
              AND IsDeleted = FALSE;
        ";

                int affectedRows =
                    db.Execute(
                        sql,
                        new
                        {
                            Id = id,

                            user.FullName,
                            user.HouseName,
                            user.Place,
                            user.District,
                            user.State,
                            user.Country,
                            user.PinCode,

                            user.Occupation,
                            user.DateOfBirth,

                            user.Gender,
                            user.BloodGroup,

                            user.Weight,
                            user.Height,

                            user.MobileNumber,
                            user.WhatsAppNumber,
                            user.Email,

                            user.EmergencyContactName,
                            user.EmergencyContactNumber,

                            user.RegisteredInGymDevice,
                            user.GymDeviceUserId,
                            user.RegisteredInMartialArtsDevice,
                            user.MartialArtsDeviceUserId,
                            user.Remarks,

                            ModifiedAt = DateTime.UtcNow,
                            ModifiedBy = "ADMIN"
                        });

                return affectedRows > 0;
            }
        }
    }

}



