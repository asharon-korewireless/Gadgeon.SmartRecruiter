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
    public class DalProduct
    {
        public Int32 UpdateProduct(IProduct iproduct)
        {
            Database db = DatabaseFactory.CreateDatabase("SUPPORTTICKETS");
            string sqlCommand = "proProductUpdate";
            DbCommand dbCommand = db.GetStoredProcCommand(sqlCommand);
            db.AddInParameter(dbCommand, "@UserAction", DbType.Byte, iproduct.UserAction);
            db.AddInParameter(dbCommand, "@ID_Product", DbType.String, iproduct.MasterID);
            db.AddInParameter(dbCommand, "@ProdCode", DbType.String, iproduct.ProdCode);
            db.AddInParameter(dbCommand, "@ProdName", DbType.String, iproduct.ProdName);
            db.AddInParameter(dbCommand, "@FK_DefaultDepartment", DbType.Int64, iproduct.FK_DefaultDepartment);
            db.AddInParameter(dbCommand, "@SortOrder", DbType.Int64, iproduct.SortOrder);
            db.AddInParameter(dbCommand, "@UserCode", DbType.Int64, iproduct.UserCode);                  
            db.AddInParameter(dbCommand, "@FK_Company", DbType.Int64, iproduct.FK_Company);
            db.AddInParameter(dbCommand, "@Active", DbType.Byte, iproduct.Active);
            try
            {
                return Convert.ToInt32(db.ExecuteScalar(dbCommand));
            }
            catch (SqlException e)
            {
                return 0;
            }
        }
        public DataTable SelectAllProduct(IProduct iproduct)
        {
            DataTable dtblProduct = new DataTable();
            Database db = DatabaseFactory.CreateDatabase("SUPPORTTICKETS");
            string sqlCommand = "proProductSelect";
            DbCommand dbCommand = db.GetStoredProcCommand(sqlCommand);
            db.AddInParameter(dbCommand, "@ID_Product", DbType.String, iproduct.MasterID);
            db.AddInParameter(dbCommand, "@ProdCode", DbType.String, iproduct.ProdCode);
            db.AddInParameter(dbCommand, "@ProdName", DbType.String, iproduct.ProdName);
            db.AddInParameter(dbCommand, "@PageIndex", DbType.Int32, iproduct.PageIndex);
            db.AddInParameter(dbCommand, "@PageSize", DbType.Int32, iproduct.PageSize);
            db.AddInParameter(dbCommand, "@FK_Company", DbType.Int64, iproduct.FK_Company);
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
        public int DeleteProduct(IProduct iproduct)
        {
            Database db = DatabaseFactory.CreateDatabase("SUPPORTTICKETS");
            string sqlCommand = "proProductDelete";
            DbCommand dbCommand = db.GetStoredProcCommand(sqlCommand);
            db.AddInParameter(dbCommand, "@ID_Product", DbType.Int64, iproduct.MasterID);
            db.AddInParameter(dbCommand, "@CancelledUser", DbType.Int64, iproduct.UserCode);
            db.AddInParameter(dbCommand, "@FK_Company", DbType.Int64, iproduct.FK_Company);

            try
            {
                return Convert.ToInt32(db.ExecuteScalar(dbCommand));
            }
            catch (SqlException e)
            {
                //UpdateErrorLog(iProduct, e);
                throw e;
            }
        }
       
    }
}
