﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SupportTicket.Interface.Masters
{
    public interface ICompany
    {
        byte UserAction { get; set; }
        long MasterID { get; set; }
        string CompanyCode { get; set; }
        string CompanyName { get; set; }
        string CompanyAddr1 { get; set; }
        string CompanyAddr2 { get; set; }
        string CompanyAddr3 { get; set; }     
        string CompanyPhone { get; set; }     
        string CompanyMob   { get; set; }     
        string CompanyEmail { get; set; }             
        long SortOrder { get; set; }
        long UserCode { get; set; }
        DateTime UserDate { get; set; }
        Boolean Cancelled { get; set; }
        Int64 CancelledUser { get; set; }
        DateTime CancelledOn { get; set; }
        long FK_Company { get; set; }
        Int32 PageIndex { get; set; }
        Int32 PageSize { get; set; }
        byte Active { get; set; }
    }
}
