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
    public class DalTickets
    {
        public Int32 UpdateTickets(ITickets itickets)
        {
            Database db = DatabaseFactory.CreateDatabase("SUPPORTTICKETS");
            string sqlCommand = "proTicketsUpdate";
            DbCommand dbCommand = db.GetStoredProcCommand(sqlCommand);
            db.AddInParameter(dbCommand, "@UserAction", DbType.Byte, itickets.UserAction);
            db.AddInParameter(dbCommand, "@ID_Tickets", DbType.String, itickets.MasterID);
            db.AddInParameter(dbCommand, "@TickNo", DbType.String, itickets.TickNo);
            db.AddInParameter(dbCommand, "@TickDate", DbType.DateTime, itickets.TickDate);
            db.AddInParameter(dbCommand, "@TickPriority", DbType.Int16, itickets.TickPriority);
            db.AddInParameter(dbCommand, "@TickStatus", DbType.Int16, itickets.TickStatus);
            db.AddInParameter(dbCommand, "@FK_Product", DbType.Int64, itickets.FK_Product);
            db.AddInParameter(dbCommand, "@FK_Topic", DbType.Int64, itickets.FK_Topic);
            db.AddInParameter(dbCommand, "@FK_Department", DbType.Int64, itickets.FK_Department);

            db.AddInParameter(dbCommand, "@FK_Client", DbType.Int64, itickets.FK_Client);
            db.AddInParameter(dbCommand, "@TickSubject", DbType.String, itickets.TickSubject);
            db.AddInParameter(dbCommand, "@Description", DbType.String, itickets.Description);
            db.AddInParameter(dbCommand, "@XmlAttachment", DbType.String, itickets.XmlAttachment);
            db.AddInParameter(dbCommand, "@AgentCode", DbType.Int64, itickets.AgentCode);
            db.AddInParameter(dbCommand, "@UserCode", DbType.Int64, itickets.UserCode);
            db.AddInParameter(dbCommand, "@FK_Company", DbType.Int64, itickets.FK_Company);
            db.AddInParameter(dbCommand, "@UserName", DbType.String, itickets.UserName);
            db.AddInParameter(dbCommand, "@UserMobile", DbType.String, itickets.UserMob);
            db.AddInParameter(dbCommand, "@Useremail", DbType.String, itickets.UserEmail);

            try
            {
                return Convert.ToInt32(db.ExecuteScalar(dbCommand));
            }
            catch (SqlException e)
            {
                return 0;
            }
        }
        public DataTable SelectAllTickets(ITickets itickets)
        {
            DataTable dtblTickets = new DataTable();
            Database db = DatabaseFactory.CreateDatabase("SUPPORTTICKETS");
            string sqlCommand = "proTicketsSelect";
            DbCommand dbCommand = db.GetStoredProcCommand(sqlCommand);
            db.AddInParameter(dbCommand, "@ID_Tickets", DbType.String, itickets.MasterID);
            db.AddInParameter(dbCommand, "@TickNo", DbType.String, itickets.TickNo);
            db.AddInParameter(dbCommand, "@TickSubject", DbType.String, itickets.TickSubject);
            db.AddInParameter(dbCommand, "@PageIndex", DbType.Int32, itickets.PageIndex);
            db.AddInParameter(dbCommand, "@PageSize", DbType.Int32, itickets.PageSize);

            db.AddInParameter(dbCommand, "@Status", DbType.Int16, itickets.TickStatus);
            db.AddInParameter(dbCommand, "@ClientName", DbType.String, itickets.ClientName);


            db.AddInParameter(dbCommand, "@UserCode", DbType.Int64, itickets.UserCode);
            db.AddInParameter(dbCommand, "@FK_Company", DbType.Int64, itickets.FK_Company);
            try
            {
                dtblTickets = db.ExecuteDataSet(dbCommand).Tables[0];
                return dtblTickets;
            }
            catch (SqlException e)
            {
                throw e;
            }
        }
        public DataTable SelectAgentTicketDetails(ITickets itickets)
        {
            DataTable dtblTickets = new DataTable();
            Database db = DatabaseFactory.CreateDatabase("SUPPORTTICKETS");
            string sqlCommand = "proAgentTicketDetailsSelect";
            DbCommand dbCommand = db.GetStoredProcCommand(sqlCommand);
            db.AddInParameter(dbCommand, "@ID_Tickets", DbType.String, itickets.MasterID);
            db.AddInParameter(dbCommand, "@FK_Company", DbType.Int64, itickets.FK_Company);
            try
            {
                dtblTickets = db.ExecuteDataSet(dbCommand).Tables[0];
                return dtblTickets;
            }
            catch (SqlException e)
            {
                throw e;
            }
        }
        public Int32 UpdateTicketDetails(ITickets itickets)
        {
            Database db = DatabaseFactory.CreateDatabase("SUPPORTTICKETS");
            string sqlCommand = "proAgentTicketDetailsUpdate";
            DbCommand dbCommand = db.GetStoredProcCommand(sqlCommand);
            db.AddInParameter(dbCommand, "@UserAction", DbType.Byte, itickets.UserAction);
            db.AddInParameter(dbCommand, "@FK_Tickets", DbType.String, itickets.MasterID);
            db.AddInParameter(dbCommand, "@AgentFrom", DbType.Int64, itickets.AgentCode);
            db.AddInParameter(dbCommand, "@AgentTo", DbType.Int64, itickets.AgentTo);
            db.AddInParameter(dbCommand, "@TransStatus", DbType.Int16, itickets.TickStatus);
            db.AddInParameter(dbCommand, "@Description", DbType.String, itickets.Description);
            db.AddInParameter(dbCommand, "@AgentNotes",  DbType.String, itickets.AgentNotes == null ? "" : itickets.AgentNotes);
            db.AddInParameter(dbCommand, "@XmlAttachment", DbType.String, itickets.XmlAttachment);
            db.AddInParameter(dbCommand, "@AgentCode", DbType.Int64, itickets.AgentCode);
            db.AddInParameter(dbCommand, "@FK_Company", DbType.Int64, itickets.FK_Company);
            try
            {
                return Convert.ToInt32(db.ExecuteScalar(dbCommand));
            }
            catch (SqlException e)
            {
                return 0;
            }
        }
        public Int32 UpdateTicketAssign(ITickets itickets)
        {
            Database db = DatabaseFactory.CreateDatabase("SUPPORTTICKETS");
            string sqlCommand = "proAgentTicketAssign";
            DbCommand dbCommand = db.GetStoredProcCommand(sqlCommand);
            db.AddInParameter(dbCommand, "@UserAction", DbType.Byte, itickets.UserAction);
            db.AddInParameter(dbCommand, "@FK_Tickets", DbType.Int64, itickets.MasterID);
            db.AddInParameter(dbCommand, "@AgentFrom", DbType.Int64, itickets.AgentCode);
            db.AddInParameter(dbCommand, "@AgentTo", DbType.Int64, itickets.AgentTo);
            db.AddInParameter(dbCommand, "@TransStatus", DbType.Int16, itickets.TickStatus);
            db.AddInParameter(dbCommand, "@Description", DbType.String, itickets.Description);
            db.AddInParameter(dbCommand, "@AgentNotes", DbType.String, itickets.AgentNotes == null ? "" : itickets.AgentNotes);
            db.AddInParameter(dbCommand, "@AgentCode", DbType.Int64, itickets.AgentCode);
            db.AddInParameter(dbCommand, "@FK_Company", DbType.Int64, itickets.FK_Company);
            db.AddInParameter(dbCommand, "@XmlTickets", DbType.String, itickets.XmlTickets);
            try
            {
                return Convert.ToInt32(db.ExecuteScalar(dbCommand));
            }
            catch (SqlException e)
            {
                return 0;
            }
        }
        
    }
}
