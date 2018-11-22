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
    public class DalDepartment
    {
        public Int32 UpdateDepartment(IDepartment idepartment)
        {
            Database db = DatabaseFactory.CreateDatabase("SUPPORTTICKETS");
            string sqlCommand = "proDepartmentUpdate";
            DbCommand dbCommand = db.GetStoredProcCommand(sqlCommand);
            db.AddInParameter(dbCommand, "@UserAction", DbType.Byte, idepartment.UserAction);
            db.AddInParameter(dbCommand, "@ID_Department", DbType.String, idepartment.MasterID);
            db.AddInParameter(dbCommand, "@DepCode", DbType.String, idepartment.DepCode);
            db.AddInParameter(dbCommand, "@DepName", DbType.String, idepartment.DepName);
            db.AddInParameter(dbCommand, "@Active", DbType.Byte, idepartment.Active);
            db.AddInParameter(dbCommand, "@SortOrder", DbType.Int64, idepartment.SortOrder);
            db.AddInParameter(dbCommand, "@UserCode", DbType.Int64, idepartment.UserCode);
            db.AddInParameter(dbCommand, "@FK_Company", DbType.Int64, idepartment.FK_Company);
            try
            {
                return Convert.ToInt32(db.ExecuteScalar(dbCommand));
            }
            catch (SqlException e)
            {
                return 0;
            }
        }
        public DataTable SelectAllDepartment(IDepartment idepartment)
        {
            DataTable dtblProduct = new DataTable();
            Database db = DatabaseFactory.CreateDatabase("SUPPORTTICKETS");
            string sqlCommand = "proDepartmentSelect";
            DbCommand dbCommand = db.GetStoredProcCommand(sqlCommand);
            db.AddInParameter(dbCommand, "@ID_Department", DbType.String, idepartment.MasterID);
            db.AddInParameter(dbCommand, "@DepCode", DbType.String, idepartment.DepCode);
            db.AddInParameter(dbCommand, "@DepName", DbType.String, idepartment.DepName);
            db.AddInParameter(dbCommand, "@PageIndex", DbType.Int32, idepartment.PageIndex);
            db.AddInParameter(dbCommand, "@PageSize", DbType.Int32, idepartment.PageSize);
            db.AddInParameter(dbCommand, "@UserCode", DbType.Int64, idepartment.UserCode);
            db.AddInParameter(dbCommand, "@FK_Company", DbType.Int64, idepartment.FK_Company);
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
        public int DeleteDepartment(IDepartment idepartment)
        {
            Database db = DatabaseFactory.CreateDatabase("SUPPORTTICKETS");
            string sqlCommand = "proDepartmentDelete";
            DbCommand dbCommand = db.GetStoredProcCommand(sqlCommand);
            db.AddInParameter(dbCommand, "@ID_Department", DbType.Int64, idepartment.MasterID);
            db.AddInParameter(dbCommand, "@CancelledUser", DbType.Int64, idepartment.UserCode);
            db.AddInParameter(dbCommand, "@UserCode", DbType.Int64, idepartment.UserCode);
            db.AddInParameter(dbCommand, "@FK_Company", DbType.Int64, idepartment.FK_Company);

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
