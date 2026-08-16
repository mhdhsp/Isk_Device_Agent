using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Isk.Device.Models
{
    public class DeviceInformation
    {
        public string SDKVersion { get; set; } = "";
        public string FirmwareVersion { get; set; } = "";
        public string Platform { get; set; } = "";
        public string SerialNumber { get; set; } = "";
        public string ProductCode { get; set; } = "";
        public string DeviceIP { get; set; } = "";

        public int UserCount { get; set; }
        public int FaceCount { get; set; }
        public int FingerprintCount { get; set; }
        public int AttendanceCount { get; set; }
        public int AdminCount { get; set; }

        public DateTime DeviceTime { get; set; }
    }
}
