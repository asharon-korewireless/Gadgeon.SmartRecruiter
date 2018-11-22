﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SupportTicket.Interface.Masters
{
    public interface IAgentGroup : ICommon
    {

        string AgentGroupCode { get; set; }
        string AgentGroupName { get; set; }
        byte AggAdministrator { get; set; }
        int AgentGroupOverdueHours { get; set; }
        byte AggAdd { get; set; }
        byte AggModify { get; set; }
        byte AggDelete { get; set; }
        byte AggView { get; set; }
        long SortOrder { get; set; }
       // byte Active { get; set; }
    }
}
