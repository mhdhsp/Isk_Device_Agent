using Isk.Device.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace Isk.API.Controllers
{
    public class DeviceController : ApiController
    {
        private readonly DeviceService _deviceService;
        private readonly string ip1="192.168.1.201";
        private readonly string ip2= "192.168.1.202";
        private readonly int  port= 4370;
        public DeviceController()
        {
            _deviceService= new DeviceService();
        }   
        [HttpGet]
        [Route("api/device/GetAllInfo1")]
        public IHttpActionResult GetAllInfo1()
        {
            return Ok(_deviceService.GetAllInfo(ip1,port));
        }
        [HttpGet]
        [Route("api/device/GetAllInfo2")]
        public IHttpActionResult GetAllInfo2()
        {
            return Ok(_deviceService.GetAllInfo(ip2,port));
        }
    }
}