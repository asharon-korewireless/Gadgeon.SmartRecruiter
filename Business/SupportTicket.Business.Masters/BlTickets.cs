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
    public class BlTickets:ITickets
    {
        private byte _UserAction;
        private long _ID_Tickets;
        private string _TickNo;
        private DateTime _TickDate;
        private string _TickSubject;
        private string _Description;
        private string _AgentNotes;
        private Int16 _TickPriority;
        private Int16 _TickStatus;
        private Int64 _FK_Product;
        private Int64 _FK_Topic;
        private Int64 _FK_Client;
        private Int64 _AgentFrom;   
        private Int64 _AgentTo;
        private Int64 _AgentCode;
        private Int64 _FK_Department;
        private long _UserCode;
        private DateTime _UserDate;
        private Boolean _Cancelled;
        private long _CancelledUser;
        private DateTime _CancelledOn;
        private long _FK_Company;
        private Int32 _PageIndex;
        private Int32 _PageSize;
        private string _XmlAttachment;
        private string _ClientName;
        private string _XmlTickets;

        private string _UserEmail;
        private string _UserName;
        private string _UserMob;




        public BlTickets()
        {
            Initialize();
        }
        public void Initialize()
        {
            _UserAction = 1;
            _ID_Tickets = 0;
            _FK_Company = 1;
            _UserCode = 0;
            _PageIndex = 1;
            _PageSize = 10;
            _AgentFrom = 0;
            _AgentTo = 0;
            _TickNo = string.Empty;
            _TickDate = DateTime.Now;
            _TickSubject = string.Empty;
            _Description = string.Empty;
            _AgentNotes = string.Empty;
            _TickPriority = 0;
            _FK_Department = 0;
            _TickStatus = 0;
            _FK_Product = 0;
            _FK_Topic = 0;
            _FK_Client = 0;
            _AgentCode = 0;
            _Cancelled = false;
            _CancelledUser = 0;
            _CancelledOn = DateTime.Now;
            _XmlAttachment = string.Empty;
            _ClientName = string.Empty;
            _XmlTickets= string.Empty;
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
        public string XmlAttachment
        {
            get { return _XmlAttachment; }
            set { _XmlAttachment = value; }
        }
        public string TickNo
        {
            get { return _TickNo; }
            set { _TickNo = value; }
        }
        public string XmlTickets
        {
            get { return _XmlTickets; }
            set { _XmlTickets = value; }
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
        public string Description
        {
            get { return _Description; }
            set { _Description = value; }
        }
        public string AgentNotes
        {
            get { return _AgentNotes; }
            set { _AgentNotes = value; }
        }
        public Int16 TickPriority
        {
            get { return _TickPriority; }
            set { _TickPriority = value; }
        }

        public string ClientName
        {
            get { return _ClientName; }
            set { _ClientName = value; }
        } 

        public Int16 TickStatus
        {
            get { return _TickStatus; }
            set { _TickStatus = value; }
        }
        public Int64 AgentFrom
        {
            get { return _AgentFrom; }
            set { _AgentFrom = value; }
        }
        public Int64 AgentTo
        {
            get { return _AgentTo; }
            set { _AgentTo = value; }
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
        public Int64 FK_Client
        {
            get { return _FK_Client; }
            set { _FK_Client = value; }
        }
        public Int64 AgentCode
        {
            get { return _AgentCode; }
            set { _AgentCode = value; }
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

        public long FK_Department { get => _FK_Department; set => _FK_Department = value; }
        public string UserEmail { get => _UserEmail; set => _UserEmail = value; }
        public string UserName { get => _UserName; set => _UserName = value; }
        public string UserMob { get => _UserMob; set => _UserMob = value; }

        public long InsertData()
        {
            long status;
            DalTickets daltickets = new DalTickets();
            status = 0;
            try
            {
                _UserAction = 1;
                status = daltickets.UpdateTickets(this);
                daltickets = null;
            }
            catch (Exception ex)
            {
            }
            return status;
        }
        public long UpdateData()
        {
            DalTickets daltickets = new DalTickets();
            long status;
            status = 0;
            try
            {
                _UserAction = 2;
                status = daltickets.UpdateTickets(this);
                daltickets = null;
            }
            catch (Exception ex)
            {
            }
            return status;
        }
        public DataTable SelectAllData()
        {
            DataTable dtbl = new DataTable();
            DalTickets daltickets = new DalTickets();
            dtbl = daltickets.SelectAllTickets(this);
            daltickets = null;
            return dtbl;
        }
        public DataTable SelectAgentTicketDetails()
        {
            DataTable dtbl = new DataTable();
            DalTickets daltickets = new DalTickets();
            dtbl = daltickets.SelectAgentTicketDetails(this);
            daltickets = null;
            return dtbl;
        }
        public long UpdateTicketDetails()
        {
            long status;
            DalTickets daltickets = new DalTickets();
            status = 0;
            try
            {
                _UserAction = 1;
                status = daltickets.UpdateTicketDetails(this);
                daltickets = null;
            }
            catch (Exception ex)
            {
            }
            return status;
        }
        public long UpdateTicketAssign()
        {
            long status;
            DalTickets daltickets = new DalTickets();
            status = 0;
            try
            {
                _UserAction = 1;
                status = daltickets.UpdateTicketAssign(this);
                daltickets = null;
            }
            catch (Exception ex)
            {
            }
            return status;
        }
    }
}
