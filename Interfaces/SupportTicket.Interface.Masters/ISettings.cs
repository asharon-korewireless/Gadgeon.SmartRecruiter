﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SupportTicket.Interface.Masters
{
    public interface ISettings
    {
        byte UserAction { get; set; }
        long MasterID { get; set; }
        string Module { get; set; }
        string SubModule { get; set; }
        string Name { get; set; }
        string Value { get; set; }
        long SortOrder { get; set; }
        long UserCode { get; set; }
        DateTime UserDate { get; set; }
        Boolean Cancelled { get; set; }
        Int64 CancelledUser { get; set; }
        DateTime CancelledOn { get; set; }
        long FK_Company { get; set; }
        bool AutoGen { get; set; }
        byte DeleteFlag { get; set; }
        string Prefix { get; set; }
        string AutocloseDays { get; set; }
    }
}
