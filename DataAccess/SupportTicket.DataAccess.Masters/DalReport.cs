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
using System.Globalization;

namespace SupportTicket.DataAccess.Masters
{
    public class DalReport
    {
        public DataTable SelectAgentWiseReport(IReport iReport)
        {
            DataTable dtblProduct = new DataTable();
            Database db = DatabaseFactory.CreateDatabase("SUPPORTTICKETS");
            string sqlCommand = "proRptAgentWiseSelect";
            DbCommand dbCommand = db.GetStoredProcCommand(sqlCommand);
            db.AddInParameter(dbCommand, "@FromDate", DbType.Date, iReport.FromDate);
            db.AddInParameter(dbCommand, "@ToDate", DbType.Date, iReport.ToDate);
            db.AddInParameter(dbCommand, "@FK_Client", DbType.Int64, iReport.FK_Client);
            db.AddInParameter(dbCommand, "@FK_Product", DbType.Int64, iReport.FK_Product);
            db.AddInParameter(dbCommand, "@FK_Agent", DbType.Int64, iReport.FK_Agent);
            db.AddInParameter(dbCommand, "@PageIndex", DbType.Int32, iReport.PageIndex);
            db.AddInParameter(dbCommand, "@PageSize", DbType.Int32, iReport.PageSize);
            db.AddInParameter(dbCommand, "@FK_Company", DbType.Int64, iReport.FK_Company);
            db.AddInParameter(dbCommand, "@Search", DbType.String, iReport.Search == null ? "" : iReport.Search);
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

        public DataTable SelectTicketWiseReport(IReport iReport)
        {
            DataTable dtblProduct = new DataTable();
            Database db = DatabaseFactory.CreateDatabase("SUPPORTTICKETS");
            string sqlCommand = "proRptTicketWiseSelect";
            DbCommand dbCommand = db.GetStoredProcCommand(sqlCommand);
            db.AddInParameter(dbCommand, "@FromDate", DbType.DateTime, iReport.FromDate);
            db.AddInParameter(dbCommand, "@ToDate", DbType.DateTime, iReport.ToDate);
            db.AddInParameter(dbCommand, "@Status", DbType.Int64, iReport.Status);
            db.AddInParameter(dbCommand, "@FK_Client", DbType.Int64, iReport.FK_Client);
            db.AddInParameter(dbCommand, "@FK_Product", DbType.Int64, iReport.FK_Product);
            db.AddInParameter(dbCommand, "@FK_Agent", DbType.Int64, iReport.FK_Agent);
            db.AddInParameter(dbCommand, "@PageIndex", DbType.Int32, iReport.PageIndex);
            db.AddInParameter(dbCommand, "@PageSize", DbType.Int32, iReport.PageSize);
            db.AddInParameter(dbCommand, "@FK_Company", DbType.Int64, iReport.FK_Company);
            db.AddInParameter(dbCommand, "@Search", DbType.String, iReport.Search == null ? "" : iReport.Search);
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
        public DataTable SelectClientWiseReport(IReport iReport)
        {
            DataTable dtblProduct = new DataTable();
            Database db = DatabaseFactory.CreateDatabase("SUPPORTTICKETS");
            string sqlCommand = "proRptClientWiseSelect";
            DbCommand dbCommand = db.GetStoredProcCommand(sqlCommand);
            db.AddInParameter(dbCommand, "@FromDate", DbType.Date, iReport.FromDate);
            db.AddInParameter(dbCommand, "@ToDate", DbType.Date, iReport.ToDate);
            db.AddInParameter(dbCommand, "@FK_Client", DbType.Int64, iReport.FK_Client);
            db.AddInParameter(dbCommand, "@FK_Product", DbType.Int64, iReport.FK_Product);
            db.AddInParameter(dbCommand, "@FK_Agent", DbType.Int64, iReport.FK_Agent);
            db.AddInParameter(dbCommand, "@PageIndex", DbType.Int32, iReport.PageIndex);
            db.AddInParameter(dbCommand, "@PageSize", DbType.Int32, iReport.PageSize);
            db.AddInParameter(dbCommand, "@FK_Company", DbType.Int64, iReport.FK_Company);
            db.AddInParameter(dbCommand, "@Search", DbType.String, iReport.Search == null ? "" : iReport.Search);
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

        public DataTable SelectProductWiseReport(IReport iReport)
        {
            DataTable dtblProduct = new DataTable();
            Database db = DatabaseFactory.CreateDatabase("SUPPORTTICKETS");
            string sqlCommand = "proRptProductWiseSelect";
            DbCommand dbCommand = db.GetStoredProcCommand(sqlCommand);
            db.AddInParameter(dbCommand, "@FromDate", DbType.Date, iReport.FromDate);
            db.AddInParameter(dbCommand, "@ToDate", DbType.Date, iReport.ToDate);
          //  db.AddInParameter(dbCommand, "@FK_Client", DbType.Int64, iReport.FK_Client);
            db.AddInParameter(dbCommand, "@FK_Product", DbType.Int64, iReport.FK_Product);
            db.AddInParameter(dbCommand, "@FK_Agent", DbType.Int64, iReport.FK_Agent);
            db.AddInParameter(dbCommand, "@PageIndex", DbType.Int32, iReport.PageIndex);
            db.AddInParameter(dbCommand, "@PageSize", DbType.Int32, iReport.PageSize);
            db.AddInParameter(dbCommand, "@FK_Company", DbType.Int64, iReport.FK_Company);
            db.AddInParameter(dbCommand, "@Search", DbType.String, iReport.Search == null ? "" : iReport.Search);
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

    }
}
