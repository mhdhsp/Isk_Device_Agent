using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using zkemkeeper;

namespace Isk.Device.Models
{
    public class DeviceUser
    {
        public string UserId { get; set; }

        public string Name { get; set; }

        public bool Enabled { get; set; }

        public int Privilege { get; set; }
    }
    
}
