using Npgsql;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;

namespace Isk.API.Databse
{
    public static class ConnectionFactory
    {
        public static NpgsqlConnection Create()
        {
            var connection =
                new NpgsqlConnection(
                    ConfigurationManager.ConnectionStrings["PostgresConnection"].ConnectionString);

            connection.Open();

            return connection;
        }
    }
}