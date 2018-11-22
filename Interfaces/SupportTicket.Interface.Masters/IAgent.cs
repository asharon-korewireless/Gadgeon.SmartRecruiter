﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace SupportTicket.Interface.Masters
{
    public interface IAgent:ICommon
    {
        string AgCode { get; set; }
        string AgName { get; set; }
        string AgMob { get; set; }
        string Agemail { get; set; }
        string AgUserName { get; set; }
        string AgPassword { get; set; }
        string CurrentPassword { get; set; }
        long FK_Department { get; set; }
        long FK_Team { get; set; }
        long FK_AgentGroup{ get; set; }
        byte Active { get; set; }
        byte Administrator { get; set; }
        byte Manager { get; set; }
        byte TeamLead { get; set; }
        long SortOrder { get; set; }
        string DepName { get; set; }
        string ImageName { get; set; }
        string XmlAgentAccess { get; set; }
        long FK_Agent { get; set; }
        string XMLDepartment { get; set; }
    }
}
