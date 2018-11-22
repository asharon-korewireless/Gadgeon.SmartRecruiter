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
    public class DalUserTickets
    {
        public Int32 UpdateUserTickets(IUserTickets iUserTickets)
        {
            Database db = DatabaseFactory.CreateDatabase("SUPPORTTICKETS");
            string sqlCommand = "proUserTicketsUpdate";
            DbCommand dbCommand = db.GetStoredProcCommand(sqlCommand);
            db.AddInParameter(dbCommand, "@UserAction", DbType.Byte, iUserTickets.UserAction);
            db.AddInParameter(dbCommand, "@ID_Tickets", DbType.String, iUserTickets.MasterID);
            db.AddInParameter(dbCommand, "@TickNo", DbType.String, iUserTickets.TickNo);
            db.AddInParameter(dbCommand, "@TickDate", DbType.DateTime, iUserTickets.TickDate);
            db.AddInParameter(dbCommand, "@TickSubject", DbType.String, iUserTickets.TickSubject);
            db.AddInParameter(dbCommand, "@TickPriority", DbType.Int16, iUserTickets.TickPriority);
            db.AddInParameter(dbCommand, "@Description", DbType.String, iUserTickets.TickDescription);
            db.AddInParameter(dbCommand, "@XmlAttachment", DbType.String, iUserTickets.XmlAttachment);
            db.AddInParameter(dbCommand, "@TickStatus", DbType.Int16, iUserTickets.TickStatus);
            db.AddInParameter(dbCommand, "@FK_Product", DbType.Int64, iUserTickets.FK_Product);
            db.AddInParameter(dbCommand, "@FK_Topic", DbType.Int64, iUserTickets.FK_Topic);
            db.AddInParameter(dbCommand, "@AgentCode", DbType.Int64, iUserTickets.AgentCode);
            db.AddInParameter(dbCommand, "@UserCode", DbType.Int64, iUserTickets.UserCode);
            db.AddInParameter(dbCommand, "@FK_Company", DbType.Int64, iUserTickets.FK_Company);
            db.AddInParameter(dbCommand, "@UserIPAddress", DbType.String, iUserTickets.UserIPAddress);
            try
            {
                return Convert.ToInt32(db.ExecuteScalar(dbCommand));
            }
            catch (SqlException e)
            {
                return 0;
            }
        }
        public Int32 UpdateDescriptionData(IUserTickets iUserTickets)
        {
            Database db = DatabaseFactory.CreateDatabase("SUPPORTTICKETS");
            string sqlCommand = "proUserTicketsDescriptionUpdate";
            DbCommand dbCommand = db.GetStoredProcCommand(sqlCommand);
            db.AddInParameter(dbCommand, "@UserAction", DbType.Byte, iUserTickets.UserAction);
            db.AddInParameter(dbCommand, "@ID_Tickets", DbType.String, iUserTickets.MasterID);
            db.AddInParameter(dbCommand, "@Description", DbType.String, iUserTickets.TickDescription);
            db.AddInParameter(dbCommand, "@XmlAttachment", DbType.String, iUserTickets.XmlAttachment);
            db.AddInParameter(dbCommand, "@AgentCode", DbType.Int64, iUserTickets.AgentCode);
            db.AddInParameter(dbCommand, "@UserCode", DbType.Int64, iUserTickets.UserCode);
            db.AddInParameter(dbCommand, "@FK_Company", DbType.Int64, iUserTickets.FK_Company);
            db.AddInParameter(dbCommand, "@UserIPAddress", DbType.String, iUserTickets.UserIPAddress);
            try
            {
                return Convert.ToInt32(db.ExecuteScalar(dbCommand));
            }
            catch (SqlException e)
            {
                return 0;
            }
        }

        public DataTable SelectGetTicketDetails(IUserTickets iUserTickets)
        {
            DataTable dtblUserTickets = new DataTable();
            Database db = DatabaseFactory.CreateDatabase("SUPPORTTICKETS");
            string sqlCommand = "proUserTicketDetailsSelect";
            DbCommand dbCommand = db.GetStoredProcCommand(sqlCommand);
            db.AddInParameter(dbCommand, "@UserCode", DbType.Int64, iUserTickets.UserCode);
            db.AddInParameter(dbCommand, "@FK_Company", DbType.Int64, iUserTickets.FK_Company);
            db.AddInParameter(dbCommand, "@ID_Tickets", DbType.Int64, iUserTickets.MasterID);
            try
            {
                dtblUserTickets = db.ExecuteDataSet(dbCommand).Tables[0];
                return dtblUserTickets;
            }
            catch (SqlException e)
            {
                throw e;
            }
        }
        public DataTable SelectAllUserTickets(IUserTickets iUserTickets)
        {
            DataTable dtblUserTickets = new DataTable();
            Database db = DatabaseFactory.CreateDatabase("SUPPORTTICKETS");
            string sqlCommand = "proUserTicketsSelect";
            DbCommand dbCommand = db.GetStoredProcCommand(sqlCommand);
            db.AddInParameter(dbCommand, "@UserCode", DbType.Int64, iUserTickets.UserCode);
            db.AddInParameter(dbCommand, "@FK_Company", DbType.Int64, iUserTickets.FK_Company);

            db.AddInParameter(dbCommand, "@ProdName", DbType.String, iUserTickets.ProdName);
            db.AddInParameter(dbCommand, "@TicketNo", DbType.String, iUserTickets.TickNo);
            db.AddInParameter(dbCommand, "@TicketSubject", DbType.String, iUserTickets.TickSubject);

            db.AddInParameter(dbCommand, "@PageIndex", DbType.Int32, iUserTickets.PageIndex);
            db.AddInParameter(dbCommand, "@PageSize", DbType.Int32, iUserTickets.PageSize);
            db.AddInParameter(dbCommand, "@Status", DbType.Int16, iUserTickets.TickStatus);
            try
            {
                dtblUserTickets = db.ExecuteDataSet(dbCommand).Tables[0];
                return dtblUserTickets;
            }
            catch (SqlException e)
            {
                throw e;
            }
        }
        public int DeleteUserTickets(IUserTickets iUserTickets)
        {
            Database db = DatabaseFactory.CreateDatabase("SUPPORTTICKETS");
            string sqlCommand = "proUserTicketsDelete";
            DbCommand dbCommand = db.GetStoredProcCommand(sqlCommand);
            db.AddInParameter(dbCommand, "@ID_UserTickets", DbType.Int64, iUserTickets.MasterID);
            db.AddInParameter(dbCommand, "@CancelledUser", DbType.Int64, iUserTickets.UserCode);
            db.AddInParameter(dbCommand, "@FK_Company", DbType.Int64, iUserTickets.FK_Company);
            try
            {
                return Convert.ToInt32(db.ExecuteScalar(dbCommand));
            }
            catch (SqlException e)
            {
                //UpdateErrorLog(iUserTickets, e);
                throw e;
            }
        }

        public DataTable AutoGenTktNo(IUserTickets iUserTickets)
        {
            DataTable dtbl = new DataTable();
            Database db = DatabaseFactory.CreateDatabase("SUPPORTTICKETS");
            string sqlCommand = "proTicketAutoGenerate";
            DbCommand dbCommand = db.GetStoredProcCommand(sqlCommand);
            db.AddInParameter(dbCommand, "@FK_Company", DbType.Int64, iUserTickets.FK_Company);
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
       
    }
}
