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
    public class DalTopic
    {
        public Int32 UpdateTopic(ITopic itopic)
        {
            Database db = DatabaseFactory.CreateDatabase("SUPPORTTICKETS");
            string sqlCommand = "proTopicUpdate";
            DbCommand dbCommand = db.GetStoredProcCommand(sqlCommand);
            db.AddInParameter(dbCommand, "@UserAction", DbType.Byte, itopic.UserAction);
            db.AddInParameter(dbCommand, "@Active", DbType.Byte, itopic.Active); 
            db.AddInParameter(dbCommand, "@ID_Topic", DbType.String, itopic.MasterID);
            db.AddInParameter(dbCommand, "@TopicCode", DbType.String, itopic.TopicCode);
            db.AddInParameter(dbCommand, "@TopicName", DbType.String, itopic.TopicName);
            db.AddInParameter(dbCommand, "@SortOrder", DbType.Int64, itopic.SortOrder);
            db.AddInParameter(dbCommand, "@UserCode", DbType.Int64, itopic.UserCode);
            db.AddInParameter(dbCommand, "@FK_Company", DbType.Int64, itopic.FK_Company);
            try
            {
                return Convert.ToInt32(db.ExecuteScalar(dbCommand));
            }
            catch (SqlException e)
            {
                return 0;
            }
        }
        public DataTable SelectAllTopic(ITopic itopic)
        {
            DataTable dtblTopic = new DataTable();
            Database db = DatabaseFactory.CreateDatabase("SUPPORTTICKETS");
            string sqlCommand = "proTopicSelect";
            DbCommand dbCommand = db.GetStoredProcCommand(sqlCommand);
            db.AddInParameter(dbCommand, "@ID_Topic", DbType.String, itopic.MasterID);
            db.AddInParameter(dbCommand, "@TopicCode", DbType.String, itopic.TopicCode);
            db.AddInParameter(dbCommand, "@TopicName", DbType.String, itopic.TopicName);
            db.AddInParameter(dbCommand, "@PageIndex", DbType.Int32, itopic.PageIndex);
            db.AddInParameter(dbCommand, "@PageSize", DbType.Int32, itopic.PageSize);
            db.AddInParameter(dbCommand, "@FK_Company", DbType.Int64, itopic.FK_Company);
            try
            {
                dtblTopic = db.ExecuteDataSet(dbCommand).Tables[0];
                return dtblTopic;
            }
            catch (SqlException e)
            {
                throw e;
            }
        }
        public int DeleteTopic(ITopic itopic)
        {
            Database db = DatabaseFactory.CreateDatabase("SUPPORTTICKETS");
            string sqlCommand = "proTopicDelete";
            DbCommand dbCommand = db.GetStoredProcCommand(sqlCommand);
            db.AddInParameter(dbCommand, "@ID_Topic", DbType.Int64, itopic.MasterID);
            db.AddInParameter(dbCommand, "@CancelledUser", DbType.Int64, itopic.UserCode);
            db.AddInParameter(dbCommand, "@FK_Company", DbType.Int64, itopic.FK_Company);

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
