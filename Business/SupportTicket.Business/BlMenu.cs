﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SupportTicket.Interface;
using System.Data;
using System.Collections;
using SupportTicket.DataAccess;

namespace SupportTicket.Business
{
   public class BlMenu:IMenu
    {
       private long _ID_PageModule;
       private string _ModuleName;
       private long _ID_Pages;
       private string _PageName;
       private string _Url;
       private long _UserCode;
       private long _FK_Company;
       private Int32 _PageIndex;
       private Int32 _PageSize;
       private Boolean _Cancelled;
       private byte _Active;
       private long _FK_DropDownAgent;

     

       public BlMenu()
        {
            Initialize();
        }
       public void Initialize()
       {
           _ID_PageModule = 0;
           _ModuleName = string.Empty;
           _ID_Pages = 0;
           _PageName = string.Empty;
           _Url = string.Empty;
           _Active = 0;
           _UserCode = 0;
           _FK_Company = 0;
           _PageIndex = 1;
           _PageSize = 10;
           FK_DropDownAgent = 0;
       }
       public long FK_DropDownAgent
       {
           get { return _FK_DropDownAgent; }
           set { _FK_DropDownAgent = value; }
       }

       public long MasterID
       {
           get { return _ID_Pages; }
           set { _ID_Pages = value; }
       }
       public byte Active
       {
           get { return _Active; }
           set { _Active = value; }
       }
       public long ID_PageModule
       {
           get { return _ID_PageModule; }
           set { _ID_PageModule = value; }
       }
       public string ModuleName
       {
           get { return _ModuleName; }
           set { _ModuleName = value; }
       }
       public long ID_Pages
       {
           get { return _ID_Pages; }
           set { _ID_Pages = value; }
       }
       public string PageName
       {
           get { return _PageName; }
           set { _PageName = value; }
       }
       public string Url
       {
           get { return _Url; }
           set { _Url = value; }
       }
       public long UserCode
       {
           get { return _UserCode; }
           set { _UserCode = value; }
       }
       public long FK_Company
       {
           get { return _FK_Company; }
           set { _FK_Company = value; }
       }
       public Boolean Cancelled
       {
           get { return _Cancelled; }
           set { _Cancelled = value; }
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

       public DataTable FillModules()
       {
           DataTable dtbl = new DataTable();
           DalMenu dalmenu = new DalMenu();
           dtbl = dalmenu.FillModules();
           dalmenu = null;
           return dtbl;
       }
       public DataSet FillPages()
       {
           DataSet dtbl = new DataSet();
           DalMenu dalmenu = new DalMenu();
           dtbl = dalmenu.FillPages(this);
           dalmenu = null;
           return dtbl;
       }
       public DataSet FillPagesAccess()
       {
           DataSet dtbl = new DataSet();
           DalMenu dalmenu = new DalMenu();
           dtbl = dalmenu.FillPagesAccess(this);
           dalmenu = null;
           return dtbl;
       }
    }
}
