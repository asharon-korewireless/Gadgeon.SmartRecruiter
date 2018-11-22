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
    public class BlAgentGroup : IAgentGroup
    {
        private byte _UserAction;
        private long _ID_AgentGroup;
        private string _AgentGroupCode;
        private string _AgentGroupName;
        private int _AgentGroupOverdueHours;
        private byte _AggAdministrator;
        private byte _AggAdd;
        private byte _AggModify;
        private byte _AggDelete;
        private byte _AggView;
        private long _SortOrder;
        private long _UserCode;
        private DateTime _UserDate;
        private Boolean _Cancelled;
        private long _CancelledUser;
        private DateTime _CancelledOn;
        private long _FK_Company;
        private Int32 _PageIndex;
        private Int32 _PageSize;



        public BlAgentGroup()
        {
            Initialize();
        }

        public void Initialize()
        {
            _UserAction = 1;

            _FK_Company = 1;
            _UserCode = 0;
            _PageIndex = 1;
            _PageSize = 10;
            _AgentGroupCode = string.Empty;
            _AgentGroupName = string.Empty;
            _AgentGroupOverdueHours = 0;
            _ID_AgentGroup = 0;
            _AggAdministrator = 0;
            _AggAdd = 0;
            _AggModify = 0;
            _AggDelete = 0;
            _AggView = 0;
           // _Active = 0;
        }

        public byte UserAction
        {
            get { return _UserAction; }
            set { _UserAction = value; }
        }
        public long MasterID
        {
            get { return _ID_AgentGroup; }
            set { _ID_AgentGroup = value; }
        }
        public string AgentGroupCode
        {
            get { return _AgentGroupCode; }
            set { _AgentGroupCode = value; }
        }
        public string AgentGroupName
        {
            get { return _AgentGroupName; }
            set { _AgentGroupName = value; }

        }

        public int AgentGroupOverdueHours
        {
            get { return _AgentGroupOverdueHours; }
            set { _AgentGroupOverdueHours = value; }
        }

        public byte AggAdministrator
        {
            get { return _AggAdministrator; }
            set { _AggAdministrator = value; }
        }

        public byte AggAdd
        {
            get { return _AggAdd; }
            set { _AggAdd = value; }
        }

        public byte AggModify
        {
            get { return _AggModify; }
            set { _AggModify = value; }
        }

        public byte AggDelete
        {
            get { return _AggDelete; }
            set { _AggDelete = value; }
        }


        public byte AggView
        {
            get { return _AggView; }
            set { _AggView = value; }
        }

        //public byte Active
        //{
        //    get { return _Active; }
        //    set { _Active = value; }
        //}
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


        public long InsertData()
        {
            long status;
            DalAgentGroup dalAgentGroup = new DalAgentGroup();
            status = 0;
            try
            {
                _UserAction = 1;
                status = dalAgentGroup.UpdateAgentGroup(this);
                dalAgentGroup = null;
            }
            catch (Exception ex)
            {
            }
            return status;
        }
        public long UpdateData()
        {
            DalAgentGroup dalAgentGroup = new DalAgentGroup();
            long status;
            status = 0;
            try
            {
                _UserAction = 2;
                status = dalAgentGroup.UpdateAgentGroup(this);
                dalAgentGroup = null;
            }
            catch (Exception ex)
            {
            }
            return status;
        }

        public DataTable SelectAllData()
        {
            DataTable dtbl = new DataTable();
            DalAgentGroup dalAgentGroup = new DalAgentGroup();
            dtbl = dalAgentGroup.SelectAllAgentGroup(this);
            dalAgentGroup = null;
            return dtbl;
        }
        public long DeleteData()
        {
            _UserAction = 3;
            DalAgentGroup dalAgentGroup = new DalAgentGroup();
            long status;
            status = 0;
            try
            {
                status = dalAgentGroup.DeleteAgentGroup(this);
                dalAgentGroup = null;
            }
            catch (Exception ex)
            {

            }
            return status;
        }
    }
}
