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
    public class DalReseller
    {
        public Int32 UpdateReseller(IReseller ireseller)
        {
            Database db = DatabaseFactory.CreateDatabase("SUPPORTTICKETS");
            string sqlCommand = "proResellerUpdate";
            DbCommand dbCommand = db.GetStoredProcCommand(sqlCommand);
            db.AddInParameter(dbCommand, "@UserAction", DbType.Byte, ireseller.UserAction);
            db.AddInParameter(dbCommand, "@ID_Reseller", DbType.String, ireseller.MasterID);
            db.AddInParameter(dbCommand, "@ResCode", DbType.String, ireseller.ResCode);
            db.AddInParameter(dbCommand, "@ResName", DbType.String, ireseller.ResName);
            db.AddInParameter(dbCommand, "@ResAddress1", DbType.String, ireseller.ResAddress1);
            db.AddInParameter(dbCommand, "@ResAddress2", DbType.String, ireseller.ResAddress2);
            db.AddInParameter(dbCommand, "@ResEmail", DbType.String, ireseller.ResEmail);
            db.AddInParameter(dbCommand, "@ResPhone", DbType.String, ireseller.ResPhone);
            db.AddInParameter(dbCommand, "@ResMob", DbType.String, ireseller.ResMob);
            db.AddInParameter(dbCommand, "@Active", DbType.Byte, ireseller.Active);
            db.AddInParameter(dbCommand, "@SortOrder", DbType.Int64, ireseller.SortOrder);
            db.AddInParameter(dbCommand, "@UserCode", DbType.Int64, ireseller.UserCode);
            db.AddInParameter(dbCommand, "@FK_Company", DbType.Int64, ireseller.FK_Company);
            try
            {
                return Convert.ToInt32(db.ExecuteScalar(dbCommand));
            }
            catch (SqlException e)
            {
                return 0;
            }
        }
        public DataTable SelectAllReseller(IReseller ireseller)
        {
            DataTable dtblProduct = new DataTable();
            Database db = DatabaseFactory.CreateDatabase("SUPPORTTICKETS");
            string sqlCommand = "proResellerSelect";
            DbCommand dbCommand = db.GetStoredProcCommand(sqlCommand);
            db.AddInParameter(dbCommand, "@ID_Reseller", DbType.String, ireseller.MasterID);
            db.AddInParameter(dbCommand, "@ResCode", DbType.String, ireseller.ResCode);
            db.AddInParameter(dbCommand, "@ResName", DbType.String, ireseller.ResName);
            db.AddInParameter(dbCommand, "@ResEmail", DbType.String, ireseller.ResEmail);
            db.AddInParameter(dbCommand, "@PageIndex", DbType.Int32, ireseller.PageIndex);
            db.AddInParameter(dbCommand, "@PageSize", DbType.Int32, ireseller.PageSize);
            db.AddInParameter(dbCommand, "@FK_Company", DbType.Int64, ireseller.FK_Company);
            try
            {
                dtblProduct = db.ExecuteDataSet(dbCommand).Tables[0];
                return dtblProduct;
            }
            catch (SqlException e)
            {
                throw e;
            }
        }
        public int DeleteReseller(IReseller ireseller)
        {
            Database db = DatabaseFactory.CreateDatabase("SUPPORTTICKETS");
            string sqlCommand = "proResellerDelete";
            DbCommand dbCommand = db.GetStoredProcCommand(sqlCommand);
            db.AddInParameter(dbCommand, "@ID_Reseller", DbType.Int64, ireseller.MasterID);
            db.AddInParameter(dbCommand, "@CancelledUser", DbType.Int64, ireseller.UserCode);
            db.AddInParameter(dbCommand, "@FK_Company", DbType.Int64, ireseller.FK_Company);

            try
            {
                return Convert.ToInt32(db.ExecuteScalar(dbCommand));
            }
            catch (SqlException e)
            {
                //UpdateErrorLog(iProduct, e);
                throw e;
            }
        }
    }
}
