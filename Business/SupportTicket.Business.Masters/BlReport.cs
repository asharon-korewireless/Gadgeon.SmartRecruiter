﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SupportTicket.Interface.Masters;
using SupportTicket.DataAccess.Masters;
using System.Data;

namespace SupportTicket.Business.Masters
{
    public class BlReport:IReport
    {
        private byte _UserAction;

        private long _ID_Report;
        private DateTime _FromDate;
        private DateTime _ToDate;
        private Int64 _FK_Product;
        private Int64 _FK_Client;
        private Int64 _FK_Agent;
        private long _FK_Company;
        private Int32 _PageIndex;
        private Int32 _PageSize;
        private long _UserCode;
        private DateTime _UserDate;
        private Boolean _Cancelled;
        private long _CancelledUser;
        private DateTime _CancelledOn;
        private Int16 _Status;
        private string _Search;



        public BlReport()
        {
            Initialize();
        }

        public void Initialize()
        {
            _UserAction = 0;
            _FK_Company = 1;
            _PageIndex = 1;
            _PageSize = 10;
            _FromDate = DateTime.Now;
            _ToDate = DateTime.Now;
            _FK_Product = 0;
            _FK_Client = 0;
            _FK_Agent = 0;
            _ID_Report = 0;
            _UserCode = 0;
            _Cancelled = false;
            _CancelledUser = 0;
            _CancelledOn = DateTime.Now;
            _Status = 0;
            _Search = string.Empty;
        }

        public Int16 Status
        {
            get { return _Status; }
            set { _Status = value; }
        }


        public string Search
        {
            get { return _Search; }
            set { _Search = value; }
        }
      
        public byte UserAction
        {
            get { return _UserAction; }
            set { _UserAction = value; }
        }
        public Boolean Cancelled
        {
            get { return _Cancelled; }
            set { _Cancelled = value; }
        }
        public DateTime UserDate
        {
            get { return _UserDate; }
            set { _UserDate = value; }
        }
        public long CancelledUser
        {
            get { return _CancelledUser; }
            set { _CancelledUser = value; }
        }
        public DateTime CancelledOn
        {
            get { return _CancelledOn; }
            set { _CancelledOn = value; }
        }
        public long UserCode
        {
            get { return _UserCode; }
            set { _UserCode = value; }
        }

        public DateTime FromDate
        {
            get { return _FromDate; }
            set { _FromDate = value; }
        }
        public DateTime ToDate
        {
            get { return _ToDate; }
            set { _ToDate = value; }
        }
        public Int64 FK_Product
        {
            get { return _FK_Product; }
            set { _FK_Product = value; }
        }
        public Int64 FK_Client
        {
            get { return _FK_Client; }
            set { _FK_Client = value; }
        }
        public Int64 FK_Agent
        {
            get { return _FK_Agent; }
            set { _FK_Agent = value; }
        }
        public long MasterID
        {
            get { return _ID_Report; }
            set { _ID_Report = value; }
        }
        public long FK_Company
        {
            get { return _FK_Company; }
            set { _FK_Company = value; }
        }
        public Int32 PageIndex
        {
            get { return _PageIndex; }
            set { _PageIndex = value; }
        }
        public Int32 PageSize
        {
            get { return _PageSize; }
            set { _PageSize = value; }
        }

        public DataTable SelectAgentWiseReport()
        {
            DataTable dtbl = new DataTable();
            DalReport dalReport = new DalReport();
            dtbl = dalReport.SelectAgentWiseReport(this);
            dalReport = null;
            return dtbl;
        }

        public DataTable SelectTicketWiseReport()
        {
            DataTable dtbl = new DataTable();
            DalReport dalReport = new DalReport();
            dtbl = dalReport.SelectTicketWiseReport(this);
            dalReport = null;
            return dtbl;
        }

        public DataTable SelectClientWiseReport()
        {
            DataTable dtbl = new DataTable();
            DalReport dalReport = new DalReport();
            dtbl = dalReport.SelectClientWiseReport(this);
            dalReport = null;
            return dtbl;
        }
        public DataTable SelectProductWiseReport()
        {
            DataTable dtbl = new DataTable();
            DalReport dalReport = new DalReport();
            dtbl = dalReport.SelectProductWiseReport(this);
            dalReport = null;
            return dtbl;
        }
    }
}
