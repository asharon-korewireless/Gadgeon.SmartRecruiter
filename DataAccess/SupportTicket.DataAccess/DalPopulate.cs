﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using System.Data.Common;
using SupportTicket.Interface;
using SupportTicket.DataAccess;
using Microsoft.Practices.EnterpriseLibrary.Data;

namespace SupportTicket.DataAccess
{
   public class DalPopulate
    {
       public DataTable PopulateData(IPopulate ipopulate)
       {
           string sqlCommand = "";
           DbCommand dbCommand;
           DataTable dt = new DataTable();
           Database db = DatabaseFactory.CreateDatabase("SUPPORTTICKETS");
           sqlCommand = "proCmnPopulateData";
           dbCommand = db.GetStoredProcCommand(sqlCommand);
           db.AddInParameter(dbCommand, "TableName", DbType.String, ipopulate.TableName);
           db.AddInParameter(dbCommand, "ListField", DbType.String, ipopulate.ListFields + ((ipopulate.ValueFields.Trim().Length <= 0) ? "" : "," + ipopulate.ValueFields));
           db.AddInParameter(dbCommand, "SortField", DbType.String, ipopulate.SortFields);
           db.AddInParameter(dbCommand, "Criteria", DbType.String, ipopulate.Criteria);
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
       public DataTable PopulateDataTwoFields(IPopulate ipopulate)
       {
           string sqlCommand = "";
           DbCommand dbCommand;
           DataTable dt = new DataTable();
           Database db = DatabaseFactory.CreateDatabase("SUPPORTTICKETS");
           sqlCommand = "proCmnPopulate2Data";
           dbCommand = db.GetStoredProcCommand(sqlCommand);
           db.AddInParameter(dbCommand, "TableName", DbType.String, ipopulate.TableName);
           db.AddInParameter(dbCommand, "ListField", DbType.String, ipopulate.ListFields + ((ipopulate.ValueFields.Trim().Length <= 0) ? "" : "," + ipopulate.ValueFields));
           db.AddInParameter(dbCommand, "ListField2", DbType.String, ipopulate.ListFields2 + ((ipopulate.ValueFields2.Trim().Length <= 0) ? "" : "," + ipopulate.ValueFields2));
           db.AddInParameter(dbCommand, "SortField", DbType.String, ipopulate.SortFields);
           db.AddInParameter(dbCommand, "Criteria", DbType.String, ipopulate.Criteria);
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

       public DataTable PopulateGrid(IPopulate ipopulate)
       {
           string sqlCommand = ""; DbCommand dbCommand;
           DataTable dt = new DataTable();
           Database db = DatabaseFactory.CreateDatabase("SUPPORTTICKETS");
           sqlCommand = "ProCmnGetRecordsPopup";
           dbCommand = db.GetStoredProcCommand(sqlCommand);
           db.AddInParameter(dbCommand, "@TableName", DbType.String, ipopulate.TableName);
           db.AddInParameter(dbCommand, "@ListFields", DbType.String, ipopulate.ListFields);
           db.AddInParameter(dbCommand, "@SortField", DbType.String, ipopulate.SortFields);
           db.AddInParameter(dbCommand, "@Criteria", DbType.String, ipopulate.Criteria);
           db.AddInParameter(dbCommand, "@Criteria2", DbType.String, ipopulate.Criteria2);
           db.AddInParameter(dbCommand, "@Groupby", DbType.String, ipopulate.GroupBy);
           db.AddInParameter(dbCommand, "@RowId", DbType.String, ipopulate.ValueFields);
           db.AddInParameter(dbCommand, "@PageIndex", DbType.Int16, ipopulate.PageIndex);
           db.AddInParameter(dbCommand, "@PageSize", DbType.Int16, ipopulate.PageSize);
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
