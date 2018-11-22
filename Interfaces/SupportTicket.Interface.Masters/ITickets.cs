﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SupportTicket.Interface.Masters
{
    public interface ITickets:ICommon
    {
        string TickNo { get; set; }
        DateTime TickDate { get; set; }
        string TickSubject { get; set; }
        Int16 TickPriority { get; set; }
        Int16 TickStatus { get; set; }
        Int64 FK_Product { get; set; }
        Int64 FK_Topic { get; set; }
        Int64 FK_Client { get; set; }
        Int64 AgentCode { get; set; }
        string Description { get; set; }
        string AgentNotes { get; set; }
        Int64 AgentFrom { get; set; }
        Int64 AgentTo { get; set; }
        string XmlAttachment { get; set; }
        string ClientName { get; set; }
        string XmlTickets { get; set; }
        long FK_Department { get; set; }
        string UserName { get; set; }
        string UserEmail { get; set; }
        string UserMob { get; set; }


    }
}
