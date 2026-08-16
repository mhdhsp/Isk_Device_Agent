using Hangfire;
using Hangfire.PostgreSql;
using Isk.API.Services;
using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(Isk.API.Startup))]

namespace Isk.API
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            Hangfire.GlobalConfiguration.Configuration
                .UsePostgreSqlStorage(options =>
                {
                    options.UseNpgsqlConnection(
                        System.Configuration.ConfigurationManager
                        .ConnectionStrings["PostgresConnection"]
                        .ConnectionString);
                });

            app.UseHangfireDashboard();
            var serverOptions = new BackgroundJobServerOptions
            {
                WorkerCount = 1
            };
            app.UseHangfireServer(serverOptions);
            RecurringJob.AddOrUpdate<MembershipExpiryJob>(
                "membership-expiry-job",
                job => job.Execute(),
                Cron.MinuteInterval(20));
        }
    }
}