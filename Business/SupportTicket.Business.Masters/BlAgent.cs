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
    public class BlAgent : IAgent
    {
        private byte _UserAction;
        private long _ID_Agent;
        private string _AgCode;
        private string _AgName;
        private string _AgMob;
        private string _Agemail;
        private string _AgUserName;
        private string _AgPassword;
        private string _CurrentPassword;
        private long _FK_Department;
        private long _FK_Team;
        private long _FK_AgentGroup;
        private byte _Active;
        private byte _Administrator;
        private byte _Manager;
        private byte _TeamLead;     
        private long _SortOrder;
        private long _UserCode;
        private DateTime _UserDate;
        private Boolean _Cancelled;
        private long _CancelledUser;
        private DateTime _CancelledOn;
        private long _FK_Company;
        private string _DepName;
        private Int32 _PageIndex;
        private Int32 _PageSize;
        private string _ImagePath;
        private string _ImageName;
        private string _XmlAgentAccess;
        private long _FK_Agent;
        private string _XMLDepartment;

      

        public BlAgent()
        {
            Initialize();
        }

        public void Initialize()
        {
            _UserAction = 1;
            _XMLDepartment = string.Empty;
            _FK_Company = 1;
            _UserCode =0;
            _PageIndex = 1;
            _PageSize = 10;
            _AgCode = string.Empty;
            _AgName = string.Empty;
            _ID_Agent = 0;
            _FK_Agent = 0;
            _Active = 0;
            _Administrator = 0;
            _Manager = 0;
            _TeamLead = 0;
            _CurrentPassword = string.Empty;
            _DepName = string.Empty;
            _ImagePath = string.Empty;
            _ImageName = string.Empty;
            _XmlAgentAccess = string.Empty;
        }
        public string XmlAgentAccess
        {
            get { return _XmlAgentAccess; }
            set { _XmlAgentAccess = value; }
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
            get { return _ID_Agent; }
            set { _ID_Agent = value; }
        }
        public string XMLDepartment
        {
            get { return _XMLDepartment; }
            set { _XMLDepartment = value; }
        }
        public long FK_Agent
        {
            get { return _FK_Agent; }
            set { _FK_Agent = value; }
        }
        public string AgCode
        {
            get { return _AgCode; }
            set { _AgCode = value; }
        }
        public string AgName
        {
            get { return _AgName; }
            set { _AgName = value; }
        }
        public string AgMob
        {
            get { return _AgMob; }
            set { _AgMob = value; }
        }
        public string Agemail
        {
            get { return _Agemail; }
            set { _Agemail = value; }
        }

        public string AgUserName
        {
            get { return _AgUserName; }
            set { _AgUserName = value; }
        }

        public string AgPassword
        {
            get { return _AgPassword; }
            set { _AgPassword = value; }
        }

        public string CurrentPassword
        {
            get { return _CurrentPassword; }
            set { _CurrentPassword = value; }
        }

        public long FK_Department
        {
            get { return _FK_Department; }
            set { _FK_Department = value; }
        }

        public long FK_Team
        {
            get { return _FK_Team; }
            set { _FK_Team = value; }
        }
        public long FK_AgentGroup
        {
            get { return _FK_AgentGroup; }
            set { _FK_AgentGroup = value; }
        }

        public byte Active
        {
            get { return _Active; }
            set { _Active = value; }
        }

        public byte Administrator
        {
            get { return _Administrator; }
            set { _Administrator = value; }
        }
        public byte TeamLead
        {
            get { return _TeamLead; }
            set { _TeamLead = value; }
        }
        public byte Manager
        {
            get { return _Manager; }
            set { _Manager = value; }
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

        public string DepName
        {
            get { return _DepName; }
            set { _DepName = value; }
        }

        public long InsertData()
        {
            long status;
            DalAgent DalAgent = new DalAgent();
            status = 0;
            try
            {
                _UserAction = 1;
                status = DalAgent.UpdateAgent(this);
                DalAgent = null;
            }
            catch (Exception ex)
            {
            }
            return status;
        }
        public long UpdateData()
        {
            DalAgent DalAgent = new DalAgent();
            long status;
            status = 0;
            try
            {
                _UserAction = 2;
                status = DalAgent.UpdateAgent(this);
                DalAgent = null;
            }
            catch (Exception ex)
            {
            }
            return status;
        }
        //public long DeleteData()
        //{
        //    DalAgent DalAgent = new DalAgent();
        //    long status;
        //    status = 0;
        //    try
        //    {
        //        status = DalAgent.DeleteProduct(this);
        //        DalAgent = null;
        //    }
        //    catch (Exception ex)
        //    {
        //    }
        //    return status;
        //}
        //public void SelectData()
        //{
        //    DalAgent DalAgent = new DalAgent();
        //    IProduct iProduct;
        //    iProduct = (IProduct)DalAgent.SelectProduct(this);
        //    //_ShortName = iProduct.ShortName;
        //    //_Name = iProduct.Name;
        //    //_Address1 = iProduct.Address1;
        //    //_Address2 = iProduct.Address2;
        //    //_Address3 = iProduct.Address3;
        //    //_Active = iProduct.Active;
        //    DalAgent = null;
        //}
        public DataSet SelectAllData()
        {
            DataSet dts = new DataSet();           
            DalAgent DalAgent = new DalAgent();
            dts = DalAgent.SelectAllAgent(this);
            DalAgent = null;
            return dts;
        }
        public long DeleteData()
        {
            _UserAction = 3;
            DalAgent DalAgent = new DalAgent();
            long status;
            status = 0;
            try
            {
                status = DalAgent.DeleteAgent(this);
                DalAgent = null;
            }
            catch (Exception ex)
            {

            }
            return status;
        }
        public ArrayList ValidLogin()
        {
            DalAgent DalAgent = new DalAgent();
            try
            {

                return DalAgent.ValidAgentLogin(this);
            }
            catch (Exception e)
            {
                throw e;
            }
            finally
            {
                DalAgent = null;
            }
        }
        public long ChangePassword()
        {
            long status;
            DalAgent DalAgent = new DalAgent();
            status = 0;
            try
            {
                _UserAction = 2;
                status = DalAgent.ChangePassword(this);
                DalAgent = null;
            }
            catch (Exception e)
            {
                throw e;
            }
            return status;
        }
        public long InsertAgentAccess()
        {
            long status;
            DalAgent DalAgent = new DalAgent();
            status = 0;
            try
            {
                _UserAction = 1;
                status = DalAgent.UpdateAgentAccess(this);
                DalAgent = null;
            }
            catch (Exception ex)
            {
            }
            return status;
        }
        public long UpdateAgentAccess()
        {
            DalAgent DalAgent = new DalAgent();
            long status;
            status = 0;
            try
            {
                _UserAction = 2;
                status = DalAgent.UpdateAgentAccess(this);
                DalAgent = null;
            }
            catch (Exception ex)
            {
            }
            return status;
        }

        public DataTable SelectAgentDashBoard()
        {
            DataTable dtbl = new DataTable();
            DalAgent DalAgent = new DalAgent();
            dtbl = DalAgent.SelectAgentDashBoard(this);
            DalAgent = null;
            return dtbl;
        }
        public DataSet SelectRecruitersStatusCount()
        {
            DataSet dtbl = new DataSet();
            DalAgent DalAgent = new DalAgent();
            dtbl = DalAgent.SelectRecruitersStatusCount(this);
            DalAgent = null;
            return dtbl;
        }
    }
}
