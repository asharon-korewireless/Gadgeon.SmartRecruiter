﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SupportTicket.Interface.Masters
{
    public interface IUserTickets
    {
        byte UserAction { get; set; }
        long MasterID { get; set; }
        string TickNo { get; set; }
        DateTime TickDate { get; set; }
        string TickSubject { get; set; }
        Int16 TickPriority { get; set; }
        Int16 TickStatus { get; set; }
        Int64 FK_Product { get; set; }
        Int64 FK_Topic { get; set; }
        Int64 AgentCode { get; set; } 
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
        string TickDescription { get; set; }
        string XmlAttachment { get; set; }
        string ProdName { get; set; }
        string UserIPAddress { get; set; }

    }
}
