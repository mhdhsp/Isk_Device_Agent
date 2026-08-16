using Isk.Device.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Isk.Device.Interfaces
{
    public  interface IDeviceInterface
    {
        List<DeviceUser> GetUsers();
    }
}
