﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data;

using System.Threading.Tasks;
using SupportTicket.DataAccess.Masters;
using SupportTicket.Interface.Masters;

namespace SupportTicket.Business.Masters
{
    public class BlUserTickets : IUserTickets
    {
        private byte _UserAction;
        private long _ID_Tickets;

        private string _TickNo;
        private DateTime _TickDate;
        private string _TickSubject;
        private string _TickDescription;
        private Int16 _TickPriority;
        private Int16 _TickStatus;
        private Int64 _FK_Product;
        private Int64 _FK_Topic;
        private Int64 _AgentCode;      
        private long _SortOrder;
        private long _UserCode;
        private DateTime _UserDate;
        private Boolean _Cancelled;
        private long _CancelledUser;
        private DateTime _CancelledOn;
        private long _FK_Company;
        private Int32 _PageIndex;
        private Int32 _PageSize;
        private byte _Active;
        private string _XmlAttachment;
        private string _ProdName;
        private string _UserIPAddress;



        
       

        public BlUserTickets()
        {
            Initialize();
        }

        public void Initialize()
        {
            _UserIPAddress = string.Empty;
            _UserAction = 1;
            _Active = 1;
            _FK_Company = 1;
            _UserCode =0;
            _PageIndex = 1;
            _PageSize = 10;
            _TickNo = string.Empty;
            _TickDate = DateTime.Now;
            _TickSubject = string.Empty;
            _TickPriority = 0;
            _TickStatus = 0;
            _FK_Product = 0;
            _FK_Topic = 0;
            _AgentCode = 0;
            _TickDescription = string.Empty;
            _ID_Tickets = 0;
            _XmlAttachment = string.Empty;
            ProdName = string.Empty;
        }
        public string TickDescription
        {
            get { return _TickDescription; }
            set { _TickDescription = value; }
        }
        public string ProdName
        {
            get { return _ProdName; }
            set { _ProdName = value; }
        }
        public string XmlAttachment
        {
            get { return _XmlAttachment; }
            set { _XmlAttachment = value; }
        }

        
        public string UserIPAddress
        {
            get { return _UserIPAddress; }
            set { _UserIPAddress = value; }
        }public byte Active
        {
            get { return _Active; }
            set { _Active = value; }
        }
        public byte UserAction
        {
            get { return _UserAction; }
            set { _UserAction = value; }
        }
        public long MasterID
        {
            get { return _ID_Tickets; }
            set { _ID_Tickets = value; }
        }

        public string TickNo
        {
            get { return _TickNo; }
            set { _TickNo = value; }
        }
        public DateTime TickDate
        {
            get { return _TickDate; }
            set { _TickDate = value; }
        }
        public string TickSubject
        {
            get { return _TickSubject; }
            set { _TickSubject = value; }
        }
        public Int16 TickPriority
        {
            get { return _TickPriority; }
            set { _TickPriority = value; }
        }
        public Int16 TickStatus
        {
            get { return _TickStatus; }
            set { _TickStatus = value; }
        }
        public Int64 FK_Product
        {
            get { return _FK_Product; }
            set { _FK_Product = value; }
        }
        public Int64 FK_Topic
        {
            get { return _FK_Topic; }
            set { _FK_Topic = value; }
        }
        public Int64 AgentCode
        {
            get { return _AgentCode; }
            set { _AgentCode = value; }
        }


        public long SortOrder
        {
            get { return _SortOrder; }
            set { _SortOrder = value; }
        }
        public long UserCode
        {
            get { return _UserCode; }
            set { _UserCode = value; }
        }
        public DateTime UserDate
        {
            get { return _UserDate; }
            set { _UserDate = value; }
        }
        public Boolean Cancelled
        {
            get { return _Cancelled; }
            set { _Cancelled = value; }
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

        public long UpdateDescriptionData()
        {
            long status;
            DalUserTickets dalUserTickets = new DalUserTickets();
            status = 0;
            try
            {
                _UserAction = 1;
                status = dalUserTickets.UpdateDescriptionData(this);
                dalUserTickets = null;
            }
            catch (Exception ex)
            {
            }
            return status;
        }

        public long InsertData()
        {
            long status;
            DalUserTickets dalUserTickets = new DalUserTickets();
            status = 0;
            try
            {
                _UserAction = 1;
                status = dalUserTickets.UpdateUserTickets(this);
                dalUserTickets = null;
            }
            catch (Exception ex)
            {
            }
            return status;
        }
        public long UpdateData()
        {
            DalUserTickets dalUserTickets = new DalUserTickets();
            long status;
            status = 0;
            try
            {
                _UserAction = 2;
                status = dalUserTickets.UpdateUserTickets(this);
                dalUserTickets = null;
            }
            catch (Exception ex)
            {
            }
            return status;
        }
        //public long DeleteData()
        //{
        //    DalUserTickets dalUserTickets = new DalUserTickets();
        //    long status;
        //    status = 0;
        //    try
        //    {
        //        status = dalUserTickets.DeleteUserTickets(this);
        //        dalUserTickets = null;
        //    }
        //    catch (Exception ex)
        //    {
        //    }
        //    return status;
        //}
        //public void SelectData()
        //{
        //    DalUserTickets dalUserTickets = new DalUserTickets();
        //    IUserTickets iUserTickets;
        //    iUserTickets = (IUserTickets)dalUserTickets.SelectUserTickets(this);
        //    //_ShortName = iUserTickets.ShortName;
        //    //_Name = iUserTickets.Name;
        //    //_Address1 = iUserTickets.Address1;
        //    //_Address2 = iUserTickets.Address2;
        //    //_Address3 = iUserTickets.Address3;
        //    //_Active = iUserTickets.Active;
        //    dalUserTickets = null;
        //}


        public DataTable SelectGetTicketDetails()
        {
            DataTable dtbl = new DataTable();
            DalUserTickets dalUserTickets = new DalUserTickets();
            dtbl = dalUserTickets.SelectGetTicketDetails(this);
            dalUserTickets = null;
            return dtbl;
        }
        public DataTable SelectAllData()
        {
            DataTable dtbl = new DataTable();
            DalUserTickets dalUserTickets = new DalUserTickets();
            dtbl = dalUserTickets.SelectAllUserTickets(this);
            dalUserTickets = null;
            return dtbl;
        }

        public DataTable AutoGenTktNo()
        {
            DataTable dtbl = new DataTable();
            DalUserTickets dalUserTickets = new DalUserTickets();
            try
            {
                dtbl = dalUserTickets.AutoGenTktNo(this);
                dalUserTickets = null;
            }
            catch (Exception ex)
            {

            }
            return dtbl;
        }

        public long DeleteData()
        {
            _UserAction = 3;
            DalUserTickets dalUserTickets = new DalUserTickets();
            long status;
            status = 0;
            try
            {
                status = dalUserTickets.DeleteUserTickets(this);
                dalUserTickets = null;
            }
            catch (Exception ex)
            {

            }
            return status;
        }
    }
}
