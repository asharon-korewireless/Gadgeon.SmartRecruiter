﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.Common;
using System.Collections;
using System.Data.SqlClient;
using Microsoft.Practices.EnterpriseLibrary.Data;
using SupportTicket.Interface.Masters;

namespace SupportTicket.DataAccess.Masters
{
    public class DalUser
    {
        public Int32 UpdateUser(IUser iUser)
        {
            Database db = DatabaseFactory.CreateDatabase("SUPPORTTICKETS");
            string sqlCommand = "proUserUpdate";
            DbCommand dbCommand = db.GetStoredProcCommand(sqlCommand);
            db.AddInParameter(dbCommand, "@UserAction", DbType.Byte, iUser.UserAction);
            db.AddInParameter(dbCommand, "@ID_User", DbType.String, iUser.MasterID);
            db.AddInParameter(dbCommand, "@UsCode", DbType.String, iUser.UsCode);
            db.AddInParameter(dbCommand, "@UsName", DbType.String, iUser.UsName);
            db.AddInParameter(dbCommand, "@UsMob", DbType.String, iUser.UsMob);
            db.AddInParameter(dbCommand, "@Usemail", DbType.String, iUser.Usemail);
            db.AddInParameter(dbCommand, "@UsUserName", DbType.String, iUser.UsUserName);
            db.AddInParameter(dbCommand, "@UsPassword", DbType.String, iUser.UsPassword);
            db.AddInParameter(dbCommand, "@FK_Client", DbType.Int64, iUser.FK_Client);
            db.AddInParameter(dbCommand, "@ImageName", DbType.String, iUser.ImageName);
            db.AddInParameter(dbCommand, "@Active", DbType.Byte, iUser.Active);
      
            db.AddInParameter(dbCommand, "@SortOrder", DbType.Int64, iUser.SortOrder);
            db.AddInParameter(dbCommand, "@UserCode", DbType.Int64, iUser.UserCode);
            db.AddInParameter(dbCommand, "@FK_Company", DbType.Int64, iUser.FK_Company);
            try
            {
                return Convert.ToInt32(db.ExecuteScalar(dbCommand));
            }
            catch (SqlException e)
            {
                return 0;
            }
        }
        //SelectReplayCount
        public DataTable SelectReplayCount(IUser iUser)
        {
            DataTable dtblUser = new DataTable();
            Database db = DatabaseFactory.CreateDatabase("SUPPORTTICKETS");
            string sqlCommand = "proGetUserReplayCount";
            DbCommand dbCommand = db.GetStoredProcCommand(sqlCommand);
            db.AddInParameter(dbCommand, "@ID_User", DbType.String, iUser.MasterID);          
            db.AddInParameter(dbCommand, "@FK_Company", DbType.Int64, iUser.FK_Company);
            try
            {
                dtblUser = db.ExecuteDataSet(dbCommand).Tables[0];
                return dtblUser;
            }
            catch (SqlException e)
            {
                throw e;
            }
        }
        public DataTable SelectAllUser(IUser iUser)
        {
            DataTable dtblUser = new DataTable();
            Database db = DatabaseFactory.CreateDatabase("SUPPORTTICKETS");
            string sqlCommand = "proUserSelect";
            DbCommand dbCommand = db.GetStoredProcCommand(sqlCommand);
            db.AddInParameter(dbCommand, "@ID_User", DbType.String, iUser.MasterID);
            db.AddInParameter(dbCommand, "@UsCode", DbType.String, iUser.UsCode);
            db.AddInParameter(dbCommand, "@UsName", DbType.String, iUser.UsName);
            db.AddInParameter(dbCommand, "@Usemail", DbType.String, iUser.Usemail);
            db.AddInParameter(dbCommand, "@PageIndex", DbType.Int32, iUser.PageIndex);
            db.AddInParameter(dbCommand, "@PageSize", DbType.Int32, iUser.PageSize);
            db.AddInParameter(dbCommand, "@UserCode", DbType.String, iUser.UserCode);
            db.AddInParameter(dbCommand, "@FK_Company", DbType.Int64, iUser.FK_Company);
            try
            {
                dtblUser = db.ExecuteDataSet(dbCommand).Tables[0];
                return dtblUser;
            }
            catch (SqlException e)
            {
                throw e;
            }
        }
        public int DeleteUser(IUser iUser)
        {
            Database db = DatabaseFactory.CreateDatabase("SUPPORTTICKETS");
            string sqlCommand = "proUserDelete";
            DbCommand dbCommand = db.GetStoredProcCommand(sqlCommand);
            db.AddInParameter(dbCommand, "@ID_User", DbType.Int64, iUser.MasterID);
            db.AddInParameter(dbCommand, "@CancelledUser", DbType.Int64, iUser.UserCode);
            db.AddInParameter(dbCommand, "@FK_Company", DbType.Int64, iUser.FK_Company);

            try
            {
                return Convert.ToInt32(db.ExecuteScalar(dbCommand));
            }
            catch (SqlException e)
            {
               
                throw e;
            }
        }
        public ArrayList ValidUserLogin(IUser IUser)
        {
            Database db = DatabaseFactory.CreateDatabase("SUPPORTTICKETS");
            string sqlCommand = "ProValidUserLogin";
            ArrayList arlist = new ArrayList();

            DbCommand dbCommand = db.GetStoredProcCommand(sqlCommand);
            db.AddInParameter(dbCommand, "@UsUserName", DbType.String, IUser.UsUserName);
            db.AddInParameter(dbCommand, "@UsPassword", DbType.String, IUser.UsPassword);
            DataSet ds = new DataSet();
            try
            {
                ds = db.ExecuteDataSet(dbCommand);
                IDataReader datareader = ds.Tables[0].CreateDataReader();
                ds = null;
                while (datareader.Read())
                {
                    for (int i = 0; i < datareader.FieldCount; i++)
                    {
                        arlist.Add(datareader.GetValue(i));
                    }

                }
                datareader = null;
                return arlist;
            }
            catch (SqlException e)
            {
                // UpdateErrorLog(iusers, e);
                throw e;
            }
        }

        public Int32 ChangePassword(IUser IUser)
        {
            Database db = DatabaseFactory.CreateDatabase("SUPPORTTICKETS");
            string sqlCommand = "proUserChangePasswordUpdate";
            DbCommand dbCommand = db.GetStoredProcCommand(sqlCommand);
            db.AddInParameter(dbCommand, "@UsName", DbType.String, IUser.UsName);
           // db.AddInParameter(dbCommand, "@UsUserName", DbType.String, IUser.UsUserName);
            db.AddInParameter(dbCommand, "@ID_User", DbType.Int64, IUser.MasterID);
            db.AddInParameter(dbCommand, "@UsPassword", DbType.String, IUser.UsPassword);
            db.AddInParameter(dbCommand, "@CurrentPassword", DbType.String, IUser.CurrentPassword);
            db.AddInParameter(dbCommand, "@FK_Company", DbType.Int64, IUser.FK_Company);

            try
            {
                return Convert.ToInt32(db.ExecuteScalar(dbCommand));
            }
            catch (SqlException e)
            {
                throw (e);
            }
        }

        public DataTable SelectUserDashBoard(IUser iUser)
        {
            DataTable dtblUser = new DataTable();
            Database db = DatabaseFactory.CreateDatabase("SUPPORTTICKETS");
            string sqlCommand = "proUserDashBoardSelect";
            DbCommand dbCommand = db.GetStoredProcCommand(sqlCommand);
            db.AddInParameter(dbCommand, "@ID_User", DbType.String, iUser.UserCode);
            db.AddInParameter(dbCommand, "@FK_Company", DbType.Int64, iUser.FK_Company);
            try
            {
                dtblUser = db.ExecuteDataSet(dbCommand).Tables[0];
                return dtblUser;
            }
            catch (SqlException e)
            {
                throw e;
            }
        }
    }
}
