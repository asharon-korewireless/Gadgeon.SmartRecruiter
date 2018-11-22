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
    public class DalAgent
    {
        public Int32 UpdateAgent(IAgent iAgent)
        {
            Database db = DatabaseFactory.CreateDatabase("SUPPORTTICKETS");
            string sqlCommand = "proAgentUpdate";
            DbCommand dbCommand = db.GetStoredProcCommand(sqlCommand);
            db.AddInParameter(dbCommand, "@UserAction", DbType.Byte, iAgent.UserAction);
            db.AddInParameter(dbCommand, "@ID_Agent", DbType.String, iAgent.MasterID);
            db.AddInParameter(dbCommand, "@AgCode", DbType.String, iAgent.AgCode);
            db.AddInParameter(dbCommand, "@AgName", DbType.String, iAgent.AgName);
            db.AddInParameter(dbCommand, "@AgMob", DbType.String, iAgent.AgMob);
            db.AddInParameter(dbCommand, "@Agemail", DbType.String, iAgent.Agemail);
            db.AddInParameter(dbCommand, "@AgUserName", DbType.String, iAgent.AgUserName);
            db.AddInParameter(dbCommand, "@AgPassword", DbType.String, iAgent.AgPassword);
            db.AddInParameter(dbCommand, "@FK_Department", DbType.Int64, iAgent.FK_Department);
            db.AddInParameter(dbCommand, "@FK_Team", DbType.Int64, iAgent.FK_Team);
            db.AddInParameter(dbCommand, "@FK_AgentGroup", DbType.Int64, iAgent.FK_AgentGroup);
            db.AddInParameter(dbCommand, "@ImageName", DbType.String, iAgent.ImageName);
            db.AddInParameter(dbCommand, "@Active", DbType.Byte, iAgent.Active);
            db.AddInParameter(dbCommand, "@Administrator", DbType.Byte, iAgent.Administrator);
            db.AddInParameter(dbCommand, "@TeamLead", DbType.Byte, iAgent.TeamLead);
            db.AddInParameter(dbCommand, "@Manager", DbType.Byte, iAgent.Manager);
            db.AddInParameter(dbCommand, "@SortOrder", DbType.Int64, iAgent.SortOrder);
            db.AddInParameter(dbCommand, "@UserCode", DbType.Int64, iAgent.UserCode);                  
            db.AddInParameter(dbCommand, "@FK_Company", DbType.Int64, iAgent.FK_Company);
            db.AddInParameter(dbCommand, "@XMLDepartment", DbType.String, iAgent.XMLDepartment);

            try
            {
                return Convert.ToInt32(db.ExecuteScalar(dbCommand));
            }
            catch (SqlException e)
            {
                return 0;
            }
        }
        public DataSet SelectAllAgent(IAgent iAgent)
        {
            //DataTable dtblAgent = new DataTable();
            Database db = DatabaseFactory.CreateDatabase("SUPPORTTICKETS");
            string sqlCommand = "proAgentSelect";
            DbCommand dbCommand = db.GetStoredProcCommand(sqlCommand);
            db.AddInParameter(dbCommand, "@ID_Agent", DbType.String, iAgent.MasterID);
            db.AddInParameter(dbCommand, "@AgCode", DbType.String, iAgent.AgCode);
            db.AddInParameter(dbCommand, "@AgName", DbType.String, iAgent.AgName);
            db.AddInParameter(dbCommand, "@DepName", DbType.String, iAgent.DepName);
            db.AddInParameter(dbCommand, "@PageIndex", DbType.Int32, iAgent.PageIndex);
            db.AddInParameter(dbCommand, "@PageSize", DbType.Int32, iAgent.PageSize);
            db.AddInParameter(dbCommand, "@AgentCode", DbType.Int64, iAgent.UserCode);
            db.AddInParameter(dbCommand, "@FK_Company", DbType.Int64, iAgent.FK_Company);
            try
            {
                DataSet dstblAgent = new DataSet();
                dstblAgent = db.ExecuteDataSet(dbCommand);
                return dstblAgent;

            }
            catch (SqlException e)
            {
                throw e;
            }
        }
        public int DeleteAgent(IAgent iAgent)
        {
            Database db = DatabaseFactory.CreateDatabase("SUPPORTTICKETS");
            string sqlCommand = "proAgentDelete";
            DbCommand dbCommand = db.GetStoredProcCommand(sqlCommand);
            db.AddInParameter(dbCommand, "@ID_Agent", DbType.Int64, iAgent.MasterID);
            db.AddInParameter(dbCommand, "@CancelledUser", DbType.Int64, iAgent.UserCode);
            db.AddInParameter(dbCommand, "@FK_Company", DbType.Int64, iAgent.FK_Company);

            try
            {
                return Convert.ToInt32(db.ExecuteScalar(dbCommand));
            }
            catch (SqlException e)
            {
                //UpdateErrorLog(iAgent, e);
                throw e;
            }
        }
        public ArrayList ValidAgentLogin(IAgent iAgent)
        {
            Database db = DatabaseFactory.CreateDatabase("SUPPORTTICKETS");
            string sqlCommand = "ProValidAgentLogin";
            ArrayList arlist = new ArrayList();

            DbCommand dbCommand = db.GetStoredProcCommand(sqlCommand);
            db.AddInParameter(dbCommand, "@AgUserName", DbType.String, iAgent.AgUserName);
            db.AddInParameter(dbCommand, "@AgPassword", DbType.String, iAgent.AgPassword); 
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

        public Int32 ChangePassword(IAgent iAgent)
        {
            Database db = DatabaseFactory.CreateDatabase("SUPPORTTICKETS");
            string sqlCommand = "proAgentChangePasswordUpdate";
            DbCommand dbCommand = db.GetStoredProcCommand(sqlCommand);
            db.AddInParameter(dbCommand, "@AgName", DbType.String, iAgent.AgName);
            db.AddInParameter(dbCommand, "@AgUserName", DbType.String, iAgent.AgUserName);
            db.AddInParameter(dbCommand, "@ID_Agent", DbType.Int64, iAgent.MasterID);
            db.AddInParameter(dbCommand, "@AgPassword", DbType.String, iAgent.AgPassword);
            db.AddInParameter(dbCommand, "@CurrentPassword", DbType.String, iAgent.CurrentPassword);
            db.AddInParameter(dbCommand, "@FK_Company", DbType.Int64, iAgent.FK_Company);

            try
            {
                return Convert.ToInt32(db.ExecuteScalar(dbCommand));
            }
            catch (SqlException e)
            {
                throw (e);
            }
        }

        public Int32 UpdateAgentAccess(IAgent iAgent)
        {
            Database db = DatabaseFactory.CreateDatabase("SUPPORTTICKETS");
            string sqlCommand = "proAgentAccessUpdate";
            DbCommand dbCommand = db.GetStoredProcCommand(sqlCommand);
            db.AddInParameter(dbCommand, "@FK_Agent", DbType.String, iAgent.FK_Agent);
            db.AddInParameter(dbCommand, "@XmlAgentAccess", DbType.String, iAgent.XmlAgentAccess);
            db.AddInParameter(dbCommand, "@UserCode", DbType.Int64, iAgent.UserCode);
            db.AddInParameter(dbCommand, "@FK_Company", DbType.Int64, iAgent.FK_Company);
            try
            {
                return Convert.ToInt32(db.ExecuteScalar(dbCommand));
            }
            catch (SqlException e)
            {
                return 0;
            }
        }


        public DataTable SelectAgentDashBoard(IAgent iAgent)
        {
            DataTable dtblAgent = new DataTable();
            Database db = DatabaseFactory.CreateDatabase("SUPPORTTICKETS");
            string sqlCommand = "proAgentTicketNotification";
            DbCommand dbCommand = db.GetStoredProcCommand(sqlCommand);
            db.AddInParameter(dbCommand, "@AgentCode", DbType.String, iAgent.UserCode);
            db.AddInParameter(dbCommand, "@FK_Company", DbType.Int64, iAgent.FK_Company);
            try
            {
                dtblAgent = db.ExecuteDataSet(dbCommand).Tables[0];
                return dtblAgent;
            }
            catch (SqlException e)
            {
                throw e;
            }
        }


        public DataSet SelectRecruitersStatusCount(IAgent iAgent)
        {
            DataTable dtblAgent = new DataTable();
            Database db = DatabaseFactory.CreateDatabase("SUPPORTTICKETS");
            string sqlCommand = "proRecruitersStatusCount";
            DbCommand dbCommand = db.GetStoredProcCommand(sqlCommand);
            db.AddInParameter(dbCommand, "@AgentCode", DbType.String, iAgent.UserCode);
            db.AddInParameter(dbCommand, "@FK_Company", DbType.Int64, iAgent.FK_Company);
            try
            {
                DataSet dstblAgent = new DataSet();
                dstblAgent = db.ExecuteDataSet(dbCommand);
                return dstblAgent;
                
            }
            catch (SqlException e)
            {
                throw e;
            }
        }
    }
}
