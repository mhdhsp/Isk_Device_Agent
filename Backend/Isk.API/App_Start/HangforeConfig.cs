using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using Hangfire;
using Hangfire.PostgreSql;
namespace Isk.API.App_Start
{
    public static class HangfireConfig
    {
        public static void Configure(string connectionString)
        {
            Hangfire.GlobalConfiguration.Configuration
                .UsePostgreSqlStorage(options =>
                {
                    options.UseNpgsqlConnection(connectionString);
                });

            var serverOptions = new BackgroundJobServerOptions
            {
                WorkerCount = 1
            };

            
        }
    }
}