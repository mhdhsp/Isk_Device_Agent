using Isk.Device.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using zkemkeeper;

namespace Isk.Device.Services
{
    public class DeviceService 
    {
        private readonly CZKEM _device = new CZKEM();

        private const int MachineNumber = 1;

        private readonly DeviceService _deviceService;
        private readonly string ip1 = "192.168.1.201";
        private readonly string ip2 = "192.168.1.202";
        private readonly int port = 4370;
        public DeviceInformation GetAllInfo(string ip, int port )
        {
            //if (!_device.Connect_Net(ip, 4370))
            //    throw new Exception("Unable to connect to device."); _device.Disconnect();

            bool connected = _device.Connect_Net(ip, port);

            if (!connected)
            {
                int error = 0;
                _device.GetLastError(ref error);

                throw new Exception(
                    $"Unable to connect.\nSDK Error = {error}");
            }


            DeviceInformation info = new DeviceInformation();

            try
            {
                //--------------------------------------------
                // SDK Version
                //--------------------------------------------

                string sdkVersion = "";

                if (_device.GetSDKVersion(ref sdkVersion))
                    info.SDKVersion = sdkVersion;

                //--------------------------------------------
                // Firmware Version
                //--------------------------------------------

                string firmware = "";

                if (_device.GetFirmwareVersion(MachineNumber, ref firmware))
                    info.FirmwareVersion = firmware;

                //--------------------------------------------
                // Platform
                //--------------------------------------------

                string platform = "";

                if (_device.GetPlatform(MachineNumber, ref platform))
                    info.Platform = platform;

                //--------------------------------------------
                // Serial Number
                //--------------------------------------------

                string serialNumber;

                if (_device.GetSerialNumber(MachineNumber, out serialNumber))
                    info.SerialNumber = serialNumber;

                //--------------------------------------------
                // Product Code
                //--------------------------------------------

                string productCode;

                if (_device.GetProductCode(MachineNumber, out productCode))
                    info.ProductCode = productCode;

                //--------------------------------------------
                // Device IP
                //--------------------------------------------

                string Deviceip = "";

                if (_device.GetDeviceIP(MachineNumber, ref Deviceip))
                    info.DeviceIP = Deviceip;

                //--------------------------------------------
                // Device Time
                //--------------------------------------------

                int year = 0;
                int month = 0;
                int day = 0;
                int hour = 0;
                int minute = 0;
                int second = 0;

                if (_device.GetDeviceTime(
                    MachineNumber,
                    ref year,
                    ref month,
                    ref day,
                    ref hour,
                    ref minute,
                    ref second))
                {
                    info.DeviceTime = new DateTime(
                        year,
                        month,
                        day,
                        hour,
                        minute,
                        second);
                }

                //--------------------------------------------
                // Device Statistics
                //--------------------------------------------

                info.AdminCount = GetDeviceStatus(1);
                info.UserCount = GetDeviceStatus(2);
                info.AttendanceCount = GetDeviceStatus(5);
                info.FingerprintCount = GetDeviceStatus(6);
                info.FaceCount = GetDeviceStatus(21);
            }
            catch (Exception ex)
            {
                Console.ForegroundColor = ConsoleColor.Red;
                Console.WriteLine(ex);
                Console.ResetColor();
            }
            finally
            {
                _device.EnableDevice(MachineNumber, true);
                _device.Disconnect();
            }

            return info;
        

        

        }

        private int GetDeviceStatus(int status)
        {
            int value = 0;

            if (_device.GetDeviceStatus(MachineNumber, status, ref value))
                return value;

            return -1;
        }
        


        public bool BlockUser(string userId, int device)
        {
            return UpdateUserValidity(userId, device, true);
        }

        public bool UnblockUser(string userId, int device)
        {
            return UpdateUserValidity(userId, device, false);
        }
        private bool UpdateUserValidity(string userId, int device, bool blockUser)
        {
            string ip = device == 1 ? ip1 : ip2;

            try
            {
                _device.Disconnect();
                if (!_device.Connect_Net(ip, 4370))
                    throw new Exception($"Unable to connect to device {ip}.");

                int expires;
                int validCount;
                string startDate;
                string endDate;

                if (blockUser)
                {
                    // Expired long ago
                    expires = 1;
                    validCount = 0;

                    startDate = new DateTime(2020, 1, 1)
                        .ToString("yyyy-MM-dd HH:mm:ss");

                    endDate = new DateTime(2020, 1, 2)
                        .ToString("yyyy-MM-dd HH:mm:ss");
                }
                else
                {
                    // Remove validity restriction
                    expires = 0;
                    validCount = 0;

                    startDate = "";
                    endDate = "";
                }

                bool result = _device.SetUserValidDate(
                    MachineNumber,
                    userId,
                    expires,
                    validCount,
                    startDate,
                    endDate);

                if (!result)
                {
                    int error = 0;
                    _device.GetLastError(ref error);

                    throw new Exception(
                        $"SetUserValidDate failed. SDK Error : {error}");
                }

                _device.RefreshData(MachineNumber);

                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return false;
            }
            finally
            {
                _device.Disconnect();
            }
        }


        public bool DeleteUser(string userId, int device)
        {
            string ip = device == 1 ? ip1 : ip2;

            try
            {
                if (!_device.Connect_Net(ip, 4370))
                    throw new Exception($"Unable to connect to device {ip}");

                bool deleted =
                 _device.SSR_DeleteEnrollDataExt(
                    MachineNumber,
                    userId,
                    12);

                if (!deleted)
                {
                    int error = 0;
                    _device.GetLastError(ref error);

                    throw new Exception(
                        $"Delete failed. SDK Error Code : {error}");
                }

                _device.RefreshData(MachineNumber);

                return true;
            }
            finally
            {
                _device.Disconnect();
            }
        }
    }
}
