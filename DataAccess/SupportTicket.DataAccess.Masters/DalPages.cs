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
using System.Collections;

namespace SupportTicket.DataAccess.Masters
{
    public class DalPages
    {
        //public Int32 UpdateReseller(IReseller ireseller)
        //{
        //    Database db = DatabaseFactory.CreateDatabase("SUPPORTTICKETS");
        //    string sqlCommand = "proResellerUpdate";
        //    DbCommand dbCommand = db.GetStoredProcCommand(sqlCommand);
        //    db.AddInParameter(dbCommand, "@UserAction", DbType.Byte, ireseller.UserAction);
        //    db.AddInParameter(dbCommand, "@ID_Reseller", DbType.String, ireseller.MasterID);
        //    db.AddInParameter(dbCommand, "@ResCode", DbType.String, ireseller.ResCode);
        //    db.AddInParameter(dbCommand, "@ResName", DbType.String, ireseller.ResName);
        //    db.AddInParameter(dbCommand, "@ResAddress1", DbType.String, ireseller.ResAddress1);
        //    db.AddInParameter(dbCommand, "@ResAddress2", DbType.String, ireseller.ResAddress2);
        //    db.AddInParameter(dbCommand, "@ResEmail", DbType.String, ireseller.ResEmail);
        //    db.AddInParameter(dbCommand, "@ResPhone", DbType.String, ireseller.ResPhone);
        //    db.AddInParameter(dbCommand, "@ResMob", DbType.String, ireseller.ResMob);
        //    db.AddInParameter(dbCommand, "@Active", DbType.Byte, ireseller.Active);
        //    db.AddInParameter(dbCommand, "@SortOrder", DbType.Int64, ireseller.SortOrder);
        //    db.AddInParameter(dbCommand, "@UserCode", DbType.Int64, ireseller.UserCode);
        //    db.AddInParameter(dbCommand, "@FK_Company", DbType.Int64, ireseller.FK_Company);
        //    try
        //    {
        //        return Convert.ToInt32(db.ExecuteScalar(dbCommand));
        //    }
        //    catch (SqlException e)
        //    {
        //        return 0;
        //    }
        //}
        //public int DeleteReseller(IReseller ireseller)
        //{
        //    Database db = DatabaseFactory.CreateDatabase("SUPPORTTICKETS");
        //    string sqlCommand = "proResellerDelete";
        //    DbCommand dbCommand = db.GetStoredProcCommand(sqlCommand);
        //    db.AddInParameter(dbCommand, "@ID_Reseller", DbType.Int64, ireseller.MasterID);
        //    db.AddInParameter(dbCommand, "@CancelledUser", DbType.Int64, ireseller.UserCode);
        //    db.AddInParameter(dbCommand, "@FK_Company", DbType.Int64, ireseller.FK_Company);

        //    try
        //    {
        //        return Convert.ToInt32(db.ExecuteScalar(dbCommand));
        //    }
        //    catch (SqlException e)
        //    {
        //        //UpdateErrorLog(iProduct, e);
        //        throw e;
        //    }
        //}
        //public ArrayList SelectAllPages(IPages ipages)
        //{
        //    Database db = DatabaseFactory.CreateDatabase("SUPPORTTICKETS");
        //    string sqlCommand = "proPagesSelect";
        //    ArrayList arlist = new ArrayList();

        //    DbCommand dbCommand = db.GetStoredProcCommand(sqlCommand);
        //    db.AddInParameter(dbCommand, "@FK_Company", DbType.Int64, ipages.FK_Company);
        //    DataSet ds = new DataSet();
        //    try
        //    {
        //        ds = db.ExecuteDataSet(dbCommand);
        //        IDataReader datareader = ds.Tables[0].CreateDataReader();
        //        ds = null;
        //        while (datareader.Read())
        //        {
        //            for (int i = 0; i < datareader.FieldCount; i++)
        //            {
        //                arlist.Add(datareader.GetValue(i));
        //            }

        //        }
        //        datareader = null;
        //        return arlist;
        //    }
        //    catch (SqlException e)
        //    {
        //        throw e;
        //    }
        //}

        public DataTable FillModules()
        {
            DataTable dtbl = new DataTable();
            Database db = DatabaseFactory.CreateDatabase("SUPPORTTICKETS");
            string sqlCommand = "proModuleSelect";
            DbCommand dbCommand = db.GetStoredProcCommand(sqlCommand);
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

        public DataTable FillPages(IPages ipages)
        {
            string sqlCommand = "";
            DbCommand dbCommand;
            DataTable dt = new DataTable();
            Database db = DatabaseFactory.CreateDatabase("SUPPORTTICKETS");
            sqlCommand = "proPagesSelect";
            dbCommand = db.GetStoredProcCommand(sqlCommand);
            db.AddInParameter(dbCommand, "@FK_PageModule", DbType.Int64, ipages.FK_PageModule);
            //db.AddInParameter(dbCommand, "@FK_Users", DbType.Int64, ipages.FK_User);
            //db.AddInParameter(dbCommand, "@FK_Client", DbType.Int64, ipages.FK_Client);
            try
            {
                DataSet ds = new DataSet();
                ds = db.ExecuteDataSet(dbCommand);
                if (ds.Tables.Count > 0)
                {
                    dt = ds.Tables[0];
                }
                return dt;
            }
            catch (Exception e)
            {
                throw;
            }
        }
    }
}
