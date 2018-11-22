﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SupportTicket.Interface
{
    public interface IPopulate
    {
        string TableName { get; set; }
        string ListFields { get; set; }
        string ListFields2 { get; set; }
        string ValueFields { get; set; }
        string ValueFields2 { get; set; }
        string SortFields { get; set; }
        string Criteria { get; set; }
        string UpdateField { get; set; }
        string UpdateValue { get; set; }
        string GroupBy { get; set; }
        int PageIndex { get; set; }
        int PageSize { get; set; }
        string Criteria2 { get; set; }
    }
}
