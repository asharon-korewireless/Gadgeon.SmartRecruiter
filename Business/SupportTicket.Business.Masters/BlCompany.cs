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
    public class BlCompany : ICompany
    {
        private byte _UserAction;
        private long _ID_Company;
        private string _CompanyCode;
        private string _CompanyName;        
        private long _SortOrder;
        private long _UserCode;
        private DateTime _UserDate;
        private Boolean _Cancelled;
        private long _CancelledUser;
        private DateTime _CancelledOn;
        private long _FK_Company;
        private Int32 _PageIndex;
        private Int32 _PageSize;
        private string _CompanyAddr1;
        private string _CompanyAddr2;
        private string _CompanyAddr3;
        private string _CompanyEmail;
        private string _CompanyPhone;
        private string _CompanyMob;
        private byte _Active;
        public BlCompany()
        {
            Initialize();
        }

        public void Initialize()
        {
            _UserAction = 1;
            _Active = 0;
            _FK_Company = 1;
            _UserCode =0;
            _PageIndex = 1;
            _PageSize = 10;
            _CompanyCode= string.Empty;
            _CompanyName = string.Empty;
            _CompanyAddr1 = string.Empty;
            _CompanyAddr2 = string.Empty;
            _CompanyAddr3 = string.Empty;
            _CompanyPhone = string.Empty;
            _CompanyMob = string.Empty;
            _CompanyEmail = string.Empty;
            _ID_Company = 0;           
        }
        public byte Active
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
            get { return _ID_Company; }
            set { _ID_Company = value; }
        }


        public string CompanyAddr1
        {
            get { return _CompanyAddr1; }
            set { _CompanyAddr1 = value; }
        }

        public string CompanyAddr2
        {
            get { return _CompanyAddr2; }
            set { _CompanyAddr2 = value; }
        }

        public string CompanyAddr3
        {
            get { return _CompanyAddr3; }
            set { _CompanyAddr3 = value; }
        }

        public string CompanyPhone
        {
            get { return _CompanyPhone; }
            set { _CompanyPhone = value; }
        }
        public string CompanyEmail
        {
            get { return _CompanyEmail; }
            set { _CompanyEmail = value; }
        }
        public string CompanyMob
        {
            get { return _CompanyMob; }
            set { _CompanyMob = value; }
        }       
        public string CompanyCode
        {
            get { return _CompanyCode; }
            set { _CompanyCode = value; }
        }
        public string CompanyName
        {
            get { return _CompanyName; }
            set { _CompanyName = value; }
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
            DalCompany dalCompany = new DalCompany();
            status = 0;
            try
            {
                _UserAction = 1;
                status = dalCompany.UpdateCompany(this);
                dalCompany = null;
            }
            catch (Exception ex)
            {
            }
            return status;
        }
        public long UpdateData()
        {
            DalCompany dalCompany = new DalCompany();
            long status;
            status = 0;
            try
            {
                _UserAction = 2;
                status = dalCompany.UpdateCompany(this);
                dalCompany = null;
            }
            catch (Exception ex)
            {
            }
            return status;
        }
        //public long DeleteData()
        //{
        //    DalCompany dalCompany = new DalCompany();
        //    long status;
        //    status = 0;
        //    try
        //    {
        //        status = dalCompany.DeleteCompany(this);
        //        dalCompany = null;
        //    }
        //    catch (Exception ex)
        //    {
        //    }
        //    return status;
        //}
        //public void SelectData()
        //{
        //    DalCompany dalCompany = new DalCompany();
        //    ICompany iCompany;
        //    iCompany = (ICompany)dalCompany.SelectCompany(this);
        //    //_ShortName = iCompany.ShortName;
        //    //_Name = iCompany.Name;
        //    //_Address1 = iCompany.Address1;
        //    //_Address2 = iCompany.Address2;
        //    //_Address3 = iCompany.Address3;
        //    //_Active = iCompany.Active;
        //    dalCompany = null;
        //}
        public DataTable SelectAllData()
        {
            DataTable dtbl = new DataTable();
            DalCompany dalCompany = new DalCompany();
            dtbl = dalCompany.SelectAllCompany(this);
            dalCompany = null;
            return dtbl;
        }
        public long DeleteData()
        {
            _UserAction = 3;
            DalCompany dalCompany = new DalCompany();
            long status;
            status = 0;
            try
            {
                status = dalCompany.DeleteCompany(this);
                dalCompany = null;
            }
            catch (Exception ex)
            {

            }
            return status;
        }
    }
}
