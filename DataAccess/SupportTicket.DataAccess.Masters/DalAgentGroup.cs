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
    public class DalAgentGroup
    {
        public Int32 UpdateAgentGroup(IAgentGroup iagentgroup)
        {
            Database db = DatabaseFactory.CreateDatabase("SUPPORTTICKETS");
            string sqlCommand = "proAgentGroupUpdate";
            DbCommand dbCommand = db.GetStoredProcCommand(sqlCommand);
            db.AddInParameter(dbCommand, "@UserAction", DbType.Byte, iagentgroup.UserAction);
            db.AddInParameter(dbCommand, "@ID_AgentGroup", DbType.String, iagentgroup.MasterID);
            db.AddInParameter(dbCommand, "@AgentGroupCode", DbType.String, iagentgroup.AgentGroupCode);
            db.AddInParameter(dbCommand, "@AgentGroupName", DbType.String, iagentgroup.AgentGroupName);
            db.AddInParameter(dbCommand, "@AgentGroupOverdueHours", DbType.Int32, iagentgroup.AgentGroupOverdueHours);
            db.AddInParameter(dbCommand, "@AggAdministrator", DbType.Byte, iagentgroup.AggAdministrator);
            db.AddInParameter(dbCommand, "@AggAdd", DbType.Byte, iagentgroup.AggAdd);
            db.AddInParameter(dbCommand, "@AggModify", DbType.Byte, iagentgroup.AggModify);
            db.AddInParameter(dbCommand, "@AggDelete", DbType.Byte, iagentgroup.AggDelete);
            db.AddInParameter(dbCommand, "@AggView", DbType.Byte, iagentgroup.AggView);
            db.AddInParameter(dbCommand, "@SortOrder", DbType.Int64, iagentgroup.SortOrder);
            db.AddInParameter(dbCommand, "@UserCode", DbType.Int64, iagentgroup.UserCode);
            db.AddInParameter(dbCommand, "@FK_Company", DbType.Int64, iagentgroup.FK_Company);
            try
            {
                return Convert.ToInt32(db.ExecuteScalar(dbCommand));
            }
            catch (SqlException e)
            {
                return 0;
            }
        }
        public DataTable SelectAllAgentGroup(IAgentGroup iagentgroup)
        {
            DataTable dtblAgentGroup = new DataTable();
            Database db = DatabaseFactory.CreateDatabase("SUPPORTTICKETS");
            string sqlCommand = "proAgentGroupSelect";
            DbCommand dbCommand = db.GetStoredProcCommand(sqlCommand);
            db.AddInParameter(dbCommand, "@ID_AgentGroup", DbType.String, iagentgroup.MasterID);
            db.AddInParameter(dbCommand, "@AgentGroupCode", DbType.String, iagentgroup.AgentGroupCode);
            db.AddInParameter(dbCommand, "@AgentGroupName", DbType.String, iagentgroup.AgentGroupName);
            db.AddInParameter(dbCommand, "@PageIndex", DbType.Int32, iagentgroup.PageIndex);
            db.AddInParameter(dbCommand, "@PageSize", DbType.Int32, iagentgroup.PageSize);
            db.AddInParameter(dbCommand, "@FK_Company", DbType.Int64, iagentgroup.FK_Company);
            try
            {
                dtblAgentGroup = db.ExecuteDataSet(dbCommand).Tables[0];
                return dtblAgentGroup;
            }
            catch (SqlException e)
            {
                throw e;
            }
        }
        public int DeleteAgentGroup(IAgentGroup iagentgroup)
        {
            Database db = DatabaseFactory.CreateDatabase("SUPPORTTICKETS");
            string sqlCommand = "proAgentGroupDelete";
            DbCommand dbCommand = db.GetStoredProcCommand(sqlCommand);
            db.AddInParameter(dbCommand, "@ID_AgentGroup", DbType.Int64, iagentgroup.MasterID);
            db.AddInParameter(dbCommand, "@CancelledUser", DbType.Int64, iagentgroup.UserCode);
            db.AddInParameter(dbCommand, "@FK_Company", DbType.Int64, iagentgroup.FK_Company);

            try
            {
                return Convert.ToInt32(db.ExecuteScalar(dbCommand));
            }
            catch (SqlException e)
            {
                //UpdateErrorLog(iTopic, e);
                throw e;
            }
        }

    }
}
