﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SupportTicket.Interface.Masters
{
    public interface IClient:ICommon
    {
        string CliCode { get; set; }
        string CliShortName { get; set; }
        string CliName { get; set; }
        string CliAddress1 { get; set; }
        string CliAddress2 { get; set; }
        string CliAddress3 { get; set; }
        string CliEmail { get; set; }
        string CliMob { get; set; }
        string CliPhone { get; set; }
        long FK_Reseller { get; set; }
        long FK_SubscriptionPlan { get; set; }
        byte Active { get; set; }
        long SortOrder { get; set; }
        string ResName { get; set; }
        string XMLProduct { get; set; }
    }
}
