﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace SupportTicket.Interface.Masters
{
    public interface IUser : ICommon
    {
        string UsCode { get; set; }
        string UsName { get; set; }
        string UsMob { get; set; }
        string Usemail { get; set; }
        string UsUserName { get; set; }
        string UsPassword { get; set; }
        string CurrentPassword { get; set; }
        long FK_Client { get; set; }
        byte Active { get; set; }
        long SortOrder { get; set; }
        string ImageName { get; set; }
    }
}
