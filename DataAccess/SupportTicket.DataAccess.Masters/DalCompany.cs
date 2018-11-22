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
    public class DalCompany
    {
        public Int32 UpdateCompany(ICompany iCompany)
        {
            Database db = DatabaseFactory.CreateDatabase("SUPPORTTICKETS");
            string sqlCommand = "proCompanyUpdate";
            DbCommand dbCommand = db.GetStoredProcCommand(sqlCommand);
            db.AddInParameter(dbCommand, "@UserAction", DbType.Byte, iCompany.UserAction);
            db.AddInParameter(dbCommand, "@ID_Company", DbType.String, iCompany.MasterID);
            db.AddInParameter(dbCommand, "@CompanyCode", DbType.String, iCompany.CompanyCode);
            db.AddInParameter(dbCommand, "@CompanyName", DbType.String, iCompany.CompanyName);
            db.AddInParameter(dbCommand, "@CompanyAddr1", DbType.String, iCompany.CompanyAddr1 == null ? "" : iCompany.CompanyAddr1);
            db.AddInParameter(dbCommand, "@CompanyAddr2", DbType.String, iCompany.CompanyAddr2 == null ? "" : iCompany.CompanyAddr2);
            db.AddInParameter(dbCommand, "@CompanyAddr3", DbType.String, iCompany.CompanyAddr3 == null ? "" : iCompany.CompanyAddr3);
            db.AddInParameter(dbCommand, "@CompanyPhone", DbType.String, iCompany.CompanyPhone); 
            db.AddInParameter(dbCommand, "@CompanyEmail", DbType.String, iCompany.CompanyEmail);
            db.AddInParameter(dbCommand, "@CompanyMob", DbType.String, iCompany.CompanyMob);   
            db.AddInParameter(dbCommand, "@SortOrder", DbType.Int64, iCompany.SortOrder);
            db.AddInParameter(dbCommand, "@UserCode", DbType.Int64, iCompany.UserCode);                  
            db.AddInParameter(dbCommand, "@FK_Company", DbType.Int64, iCompany.FK_Company);
            db.AddInParameter(dbCommand, "@Active", DbType.Byte, iCompany.Active);
            try
            {
                return Convert.ToInt32(db.ExecuteScalar(dbCommand));
            }
            catch (SqlException e)
            {
                return 0;
            }
        }
        public DataTable SelectAllCompany(ICompany iCompany)
        {
            DataTable dtblCompany = new DataTable();
            Database db = DatabaseFactory.CreateDatabase("SUPPORTTICKETS");
            string sqlCommand = "proCompanySelect";
            DbCommand dbCommand = db.GetStoredProcCommand(sqlCommand);
            db.AddInParameter(dbCommand, "@ID_Company", DbType.String, iCompany.MasterID);
            db.AddInParameter(dbCommand, "@CompanyCode", DbType.String, iCompany.CompanyCode);
            db.AddInParameter(dbCommand, "@CompanyName", DbType.String, iCompany.CompanyName);
            db.AddInParameter(dbCommand, "@CompanyEmail", DbType.String, iCompany.CompanyEmail);
            db.AddInParameter(dbCommand, "@PageIndex", DbType.Int32, iCompany.PageIndex);
            db.AddInParameter(dbCommand, "@PageSize", DbType.Int32, iCompany.PageSize);
            db.AddInParameter(dbCommand, "@FK_Company", DbType.Int64, iCompany.FK_Company);
            try
            {
                dtblCompany = db.ExecuteDataSet(dbCommand).Tables[0];
                return dtblCompany;
            }
            catch (SqlException e)
            {
                throw e;
            }
        }
        public int DeleteCompany(ICompany iCompany)
        {
            Database db = DatabaseFactory.CreateDatabase("SUPPORTTICKETS");
            string sqlCommand = "proCompanyDelete";
            DbCommand dbCommand = db.GetStoredProcCommand(sqlCommand);
            db.AddInParameter(dbCommand, "@ID_Company", DbType.Int64, iCompany.MasterID);
            db.AddInParameter(dbCommand, "@CancelledUser", DbType.Int64, iCompany.UserCode);
            db.AddInParameter(dbCommand, "@FK_Company", DbType.Int64, iCompany.FK_Company);          
            try
            {
                return Convert.ToInt32(db.ExecuteScalar(dbCommand));
            }
            catch (SqlException e)
            {
                //UpdateErrorLog(iCompany, e);
                throw e;
            }
        }
       
    }
}
