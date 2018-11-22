﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data;
using System.Collections;

using System.Threading.Tasks;
using SupportTicket.DataAccess.Masters;
using SupportTicket.Interface.Masters;

namespace SupportTicket.Business.Masters
{
    public class BlUser : IUser
    {
        private byte _UserAction;
        private long _ID_User;
        private string _UsCode;
        private string _UsName;
        private string _UsMob;
        private string _Usemail;
        private string _UsUserName;
        private string _UsPassword;
        private string _CurrentPassword;
        private long _FK_Client;
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
        private string _ImagePath;
        private string _ImageName;


        public BlUser()
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
            _UsCode = string.Empty;
            _UsName = string.Empty;
            _ID_User = 0;
            _Active = 0;
            _CurrentPassword = string.Empty;
            _ImagePath = string.Empty;
            _ImageName = string.Empty;
        }
        public string ImagePath
        {
            get { return _ImagePath; }
            set { _ImagePath = value; }
        }
        public string ImageName
        {
            get { return _ImageName; }
            set { _ImageName = value; }
        }
        public byte UserAction
        {
            get { return _UserAction; }
            set { _UserAction = value; }
        }
        public long MasterID
        {
            get { return _ID_User; }
            set { _ID_User = value; }
        }
        public string UsCode
        {
            get { return _UsCode; }
            set { _UsCode = value; }
        }
        public string UsName
        {
            get { return _UsName; }
            set { _UsName = value; }
        }
        public string UsMob
        {
            get { return _UsMob; }
            set { _UsMob = value; }
        }
        public string Usemail
        {
            get { return _Usemail; }
            set { _Usemail = value; }
        }

        public string UsUserName
        {
            get { return _UsUserName; }
            set { _UsUserName = value; }
        }

        public string UsPassword
        {
            get { return _UsPassword; }
            set { _UsPassword = value; }
        }
        public string CurrentPassword
        {
            get { return _CurrentPassword; }
            set { _CurrentPassword = value; }
        }
        public long FK_Client
        {
            get { return _FK_Client; }
            set { _FK_Client = value; }
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
            DalUser DalUser = new DalUser();
            status = 0;
            try
            {
                _UserAction = 1;
                status = DalUser.UpdateUser(this);
                DalUser = null;
            }
            catch (Exception ex)
            {
            }
            return status;
        }
        public long UpdateData()
        {
            DalUser DalUser = new DalUser();
            long status;
            status = 0;
            try
            {
                _UserAction = 2;
                status = DalUser.UpdateUser(this);
                DalUser = null;
            }
            catch (Exception ex)
            {
            }
            return status;
        }

        public DataTable SelectReplayCount()
        {
            DataTable dtbl = new DataTable();
            DalUser dalUser = new DalUser();
            dtbl = dalUser.SelectReplayCount(this);
            dalUser = null;
            return dtbl;
        }
        public DataTable SelectAllData()
        {
            DataTable dtbl = new DataTable();
            DalUser dalUser = new DalUser();
           dtbl = dalUser.SelectAllUser(this);
            dalUser = null;
            return dtbl;
        }
        public long DeleteData()
        {
            _UserAction = 3;
            DalUser DalUser = new DalUser();
            long status;
            status = 0;
            try
            {
                status = DalUser.DeleteUser(this);
                DalUser = null;
            }
            catch (Exception ex)
            {

            }
            return status;
        }
        public ArrayList ValidLogin()
        {
            DalUser DalUser = new DalUser();
            try
            {

               return DalUser.ValidUserLogin(this);
            }
            catch (Exception e)
            {
                throw e;
            }
            finally
            {
                DalUser = null;
            }
        }
        public long ChangePassword()
        {
            long status;
            DalUser DalUser = new DalUser();
            status = 0;
            try
            {
                _UserAction = 2;
                status = DalUser.ChangePassword(this);
                DalUser = null;
            }
            catch (Exception e)
            {
                throw e;
            }
            return status;
        }

        public DataTable SelectUserDashBoard()
        {
            DataTable dtbl = new DataTable();
            DalUser dalUser = new DalUser();
            dtbl = dalUser.SelectUserDashBoard(this);
            dalUser = null;
            return dtbl;
        }
    }
}
