﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.Common;
using System.Data.SqlClient;
using Microsoft.Practices.EnterpriseLibrary.Data;
using SupportTicket.Interface.Masters;

namespace SupportTicket.DataAccess.Masters
{
    public class DalSettings
    {
        public Int32 UpdateSettings(ISettings iSettings)
        {
            Database db = DatabaseFactory.CreateDatabase("SUPPORTTICKETS");
            string sqlCommand = "proSettingsUpdate";
            DbCommand dbCommand = db.GetStoredProcCommand(sqlCommand);
            db.AddInParameter(dbCommand, "@DeleteFlag", DbType.Byte, iSettings.DeleteFlag);
            db.AddInParameter(dbCommand, "@ID_Settings", DbType.Int64, iSettings.MasterID);
            db.AddInParameter(dbCommand, "@Module", DbType.String, iSettings.Module);
            db.AddInParameter(dbCommand, "@SubModule", DbType.String, iSettings.SubModule);
            db.AddInParameter(dbCommand, "@Name", DbType.String, iSettings.Name);
            db.AddInParameter(dbCommand, "@Value", DbType.String, iSettings.Value);
            db.AddInParameter(dbCommand, "@UserCode", DbType.String, iSettings.UserCode);
            db.AddInParameter(dbCommand, "@FK_Company", DbType.Int64, iSettings.FK_Company);
            try
            {
                return Convert.ToInt32(db.ExecuteScalar(dbCommand));
            }
            catch (SqlException e)
            {
                return 0;
            }
        }
        public DataTable SelectAllSettings(ISettings iSettings)
        {
            DataTable dtbl = new DataTable();
            Database db = DatabaseFactory.CreateDatabase("SUPPORTTICKETS");
            string sqlCommand = "proSettingsSelect";
            DbCommand dbCommand = db.GetStoredProcCommand(sqlCommand);
            db.AddInParameter(dbCommand, "@ID_Settings", DbType.String, iSettings.MasterID);
            db.AddInParameter(dbCommand, "@Module", DbType.String, iSettings.Module);
            db.AddInParameter(dbCommand, "@SubModule", DbType.String, iSettings.SubModule);
            db.AddInParameter(dbCommand, "@FK_Company", DbType.Int64, iSettings.FK_Company);
            try
            {
                dtbl = db.ExecuteDataSet(dbCommand).Tables[0];
                return dtbl;
            }
            catch (SqlException e)
            {
                throw e;
            }
        }
        public int DeleteSettings(ISettings iSettings)
        {
            Database db = DatabaseFactory.CreateDatabase("SUPPORTTICKETS");
            string sqlCommand = "proSettingsDelete";
            DbCommand dbCommand = db.GetStoredProcCommand(sqlCommand);
            db.AddInParameter(dbCommand, "@ID_Settings", DbType.Int64, iSettings.MasterID);
            db.AddInParameter(dbCommand, "@CancelledUser", DbType.Int64, iSettings.UserCode);
            db.AddInParameter(dbCommand, "@FK_Company", DbType.Int64, iSettings.FK_Company);
            try
            {
                return Convert.ToInt32(db.ExecuteScalar(dbCommand));
            }
            catch (SqlException e)
            {
                //UpdateErrorLog(iSettings, e);
                throw e;
            }
        }
       
    }
}
