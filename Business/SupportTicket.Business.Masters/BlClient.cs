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
    public class BlClient:IClient
    {
        private byte _UserAction;
        private long _ID_Client;
        private string _CliCode;
        private string _CliShortName;
        private string _CliName;
        private string _CliAddress1;
        private string _CliAddress2;
        private string _CliAddress3;
        private string _CliEmail;
        private string _CliMob;
        private string _CliPhone;
        private long _FK_Reseller;
        private long _FK_SubscriptionPlan;
        private byte _Active;
        private long _SortOrder;
        private long _UserCode;
        private DateTime _UserDate;
        private Boolean _Cancelled;
        private long _CancelledUser;
        private DateTime _CancelledOn;
        private long _FK_Company;
        private Int32 _PageIndex;
        private Int32 _PageSize;
        private string _ResName;
        private string _XMLProduct;

        

        public BlClient()
        {
            Initialize();
        }

        public void Initialize()
        {
            _UserAction = 1;
            _XMLProduct = string.Empty;
            _FK_Company = 1;
            _UserCode =0;
            _PageIndex = 1;
            _PageSize = 10;
            _CliCode = string.Empty;
            _CliShortName = string.Empty;
            _CliName = string.Empty;
            _CliAddress1 = string.Empty;
            _CliAddress2 = string.Empty;
            _CliAddress3 = string.Empty;
            _CliEmail = string.Empty;
            _CliMob = string.Empty;
            _CliPhone = string.Empty;
            _FK_Reseller = 0;
            _FK_SubscriptionPlan = 0;
            _ResName = string.Empty;
            _Active = 0;
            _ID_Client = 0;
        }
        public string XMLProduct
        {
            get { return _XMLProduct; }
            set { _XMLProduct = value; }
        }
        public byte UserAction
        {
            get { return _UserAction; }
            set { _UserAction = value; }
        }
        public long MasterID
        {
            get { return _ID_Client; }
            set { _ID_Client = value; }
        }
        public string CliCode
        {
            get { return _CliCode; }
            set { _CliCode = value; }
        }
        public string CliShortName
        {
            get { return _CliShortName; }
            set { _CliShortName = value; }
        }
        public string CliName
        {
            get { return _CliName; }
            set { _CliName = value; }
        }
        public string CliAddress1
        {
            get { return _CliAddress1; }
            set { _CliAddress1 = value; }
        }
        public string CliAddress2
        {
            get { return _CliAddress2; }
            set { _CliAddress2 = value; }
        }
        public string CliAddress3
        {
            get { return _CliAddress3; }
            set { _CliAddress3 = value; }
        }
        public string CliEmail
        {
            get { return _CliEmail; }
            set { _CliEmail = value; }
        }
        public string CliMob
        {
            get { return _CliMob; }
            set { _CliMob = value; }
        }
        public string CliPhone
        {
            get { return _CliPhone; }
            set { _CliPhone = value; }
        }
        public long FK_Reseller
        {
            get { return _FK_Reseller; }
            set { _FK_Reseller = value; }
        }
        public long FK_SubscriptionPlan
        {
            get { return _FK_SubscriptionPlan; }
            set { _FK_SubscriptionPlan = value; }
        }
        public string ResName
        {
            get { return _ResName; }
            set { _ResName = value; }
        }
        public byte Active
        {
            get { return _Active; }
            set { _Active = value; }
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
        public long InsertData()
        {
            long status;
            DalClient dalclient = new DalClient();
            status = 0;
            try
            {
                _UserAction = 1;
                status = dalclient.UpdateClient(this);
                dalclient = null;
            }
            catch (Exception ex)
            {
            }
            return status;
        }
        public long UpdateData()
        {
            DalClient dalclient = new DalClient();
            long status;
            status = 0;
            try
            {
                _UserAction = 2;
                status = dalclient.UpdateClient(this);
                dalclient = null;
            }
            catch (Exception ex)
            {
            }
            return status;
        }
        public DataSet SelectAllData()
        {
            DataSet dts = new DataSet();
            DalClient dalclient = new DalClient();
            dts = dalclient.SelectAllClient(this);
            dalclient = null;
            return dts;
        }
        public long DeleteData()
        {
            _UserAction = 3;
            DalClient dalclient = new DalClient();
            long status;
            status = 0;
            try
            {
                status = dalclient.DeleteClient(this);
                dalclient = null;
            }
            catch (Exception ex)
            {

            }
            return status;
        }
    }
}
