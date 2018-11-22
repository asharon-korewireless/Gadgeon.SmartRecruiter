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
   public class DalMenu
    {
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
       public DataSet FillPages(IMenu imenu)
       {
           string sqlCommand = "";
           DbCommand dbCommand;
           Database db = DatabaseFactory.CreateDatabase("SUPPORTTICKETS");
           sqlCommand = "proPagesSelect";
           dbCommand = db.GetStoredProcCommand(sqlCommand);           
           db.AddInParameter(dbCommand, "@FK_PageModule", DbType.Int64, imenu.ID_PageModule);
           db.AddInParameter(dbCommand, "@FK_Agent", DbType.Int64, imenu.UserCode);
           db.AddInParameter(dbCommand, "@FK_Company", DbType.Int64, imenu.FK_Company);
           db.AddInParameter(dbCommand, "@ID_Pages", DbType.String, imenu.MasterID);
           db.AddInParameter(dbCommand, "@PageName", DbType.String, imenu.PageName);
           db.AddInParameter(dbCommand, "@PageIndex", DbType.Int32, imenu.PageIndex);
           db.AddInParameter(dbCommand, "@PageSize", DbType.Int32, imenu.PageSize);
           db.AddInParameter(dbCommand, "@FK_DropDownAgent", DbType.Int64, imenu.FK_DropDownAgent);
           try
           {
               DataSet ds = new DataSet();
               ds = db.ExecuteDataSet(dbCommand);
               
               return ds;
           }
           catch (Exception e)
           {
               throw;
           }
       }
       public DataSet FillPagesAccess(IMenu imenu)
       {
           string sqlCommand = "";
           DbCommand dbCommand;
           Database db = DatabaseFactory.CreateDatabase("SUPPORTTICKETS");
           sqlCommand = "SelectPageAccess";
           dbCommand = db.GetStoredProcCommand(sqlCommand);
           db.AddInParameter(dbCommand, "@FK_PageModule", DbType.Int64, imenu.ID_PageModule);
           db.AddInParameter(dbCommand, "@FK_Agent", DbType.Int64, imenu.UserCode);
           db.AddInParameter(dbCommand, "@FK_Company", DbType.Int64, imenu.FK_Company);
           db.AddInParameter(dbCommand, "@ID_Pages", DbType.String, imenu.MasterID);
           db.AddInParameter(dbCommand, "@PageName", DbType.String, imenu.PageName);
           db.AddInParameter(dbCommand, "@PageIndex", DbType.Int32, imenu.PageIndex);
           db.AddInParameter(dbCommand, "@PageSize", DbType.Int32, imenu.PageSize);
           db.AddInParameter(dbCommand, "@FK_DropDownAgent", DbType.Int64, imenu.FK_DropDownAgent);
           try
           {
               DataSet ds = new DataSet();
               ds = db.ExecuteDataSet(dbCommand);

               return ds;
           }
           catch (Exception e)
           {
               throw;
           }
       }
    }
}
