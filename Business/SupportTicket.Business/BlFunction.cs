﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Collections;
using System.Xml;
using System.Globalization;
using System.Security.Cryptography;
using System.IO;
using SupportTicket.Interface;
using SupportTicket.DataAccess;

namespace SupportTicket.Business
{
    public class BlFunction : IPopulate
    {
        private string _TableName;
        private string _ListFields;
        private string _ValueFields;
        private string _ListFields2;   
        private string _SortFields;
        private string _Criteria;
        private string _UpdateField;
        private string _UpdateValue;
        private string _GroupBy;
        private string _Criteria2;

        public string Criteria2
        {
            get { return _Criteria2; }
            set { _Criteria2 = value; }
        }

        public string GroupBy
        {
            get { return _GroupBy; }
            set { _GroupBy = value; }
        }
        private int _PageSize;

        public int PageSize
        {
            get { return _PageSize; }
            set { _PageSize = value; }
        }
        private int _PageIndex;

        public int PageIndex
        {
            get { return _PageIndex; }
            set { _PageIndex = value; }
        }

        public BlFunction()
        {
            Initialize();
        }
        public void Initialize()
        {
            _TableName = string.Empty;
            _ListFields = string.Empty;
            _ValueFields = string.Empty;
            _ListFields2 = string.Empty;
            _ValueFields2 = string.Empty;
            _SortFields = string.Empty;
            _Criteria = string.Empty;
            _UpdateField = string.Empty;
            _UpdateValue = string.Empty;
            _Criteria2 = string.Empty; 
        }

        public string UpdateField
        {
            get { return _UpdateField; }
            set { _UpdateField = value; }
        }


        public string UpdateValue
        {
            get { return _UpdateValue; }
            set { _UpdateValue = value; }
        }

        public string TableName
        {
            get { return _TableName; }
            set { _TableName = value; }
        }

        public string ListFields2
        {
            get { return _ListFields2; }
            set { _ListFields2 = value; }
        }
        private string _ValueFields2;

        public string ValueFields2
        {
            get { return _ValueFields2; }
            set { _ValueFields2 = value; }
        }
        public string ListFields
        {
            get { return _ListFields; }
            set { _ListFields = value; }
        }


        public string ValueFields
        {
            get { return _ValueFields; }
            set { _ValueFields = value; }
        }


        public string SortFields
        {
            get { return _SortFields; }
            set { _SortFields = value; }
        }


        public string Criteria
        {
            get { return _Criteria; }
            set { _Criteria = value; }
        }

        //Function Used for Retrive set of Record set in ArrayList
        public ArrayList GetArrayList(string tblname, string fieldname, string criteria, String dbname)
        {
            DalFunction dalfunctions = new DalFunction();
            try
            {
                TableName = tblname;
                ListFields = fieldname;
                Criteria = criteria;
                return dalfunctions.GetArrayList(this);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public DataTable GetDataTable(string tblname, string fieldname, string criteria, string sort, String dbname)
        {
           DalFunction dalfunctions = new DalFunction();
            
            
           
            try
            {
                TableName = tblname;
                ListFields = fieldname;
                Criteria = criteria;
                SortFields = sort;
                return dalfunctions.GetDataTable(this);
            }
            catch (Exception e)
            {
                throw;
            }
        }
        public string EncryptAgent(string clearText)
        {
            string EncryptionKey = "P321PLATINUM123CLT";
            byte[] clearBytes = Encoding.Unicode.GetBytes(clearText);
            using (Aes encryptor = Aes.Create())
            {
                Rfc2898DeriveBytes pdb = new Rfc2898DeriveBytes(EncryptionKey, new byte[] { 0x49, 0x76, 0x61, 0x6e, 0x20, 0x4d, 0x65, 0x64, 0x76, 0x65, 0x64, 0x65, 0x76 });
                encryptor.Key = pdb.GetBytes(32);
                encryptor.IV = pdb.GetBytes(16);
                using (MemoryStream ms = new MemoryStream())
                {
                    using (CryptoStream cs = new CryptoStream(ms, encryptor.CreateEncryptor(), CryptoStreamMode.Write))
                    {
                        cs.Write(clearBytes, 0, clearBytes.Length);
                        cs.Close();
                    }
                    clearText = Convert.ToBase64String(ms.ToArray());
                }
            }
            return clearText;
        }

        public string DecryptAgent(string cipherText)
        {
            string EncryptionKey = "P321PLATINUM123CLT";
            byte[] cipherBytes = Convert.FromBase64String(cipherText);
            using (Aes encryptor = Aes.Create())
            {
                Rfc2898DeriveBytes pdb = new Rfc2898DeriveBytes(EncryptionKey, new byte[] { 0x49, 0x76, 0x61, 0x6e, 0x20, 0x4d, 0x65, 0x64, 0x76, 0x65, 0x64, 0x65, 0x76 });
                encryptor.Key = pdb.GetBytes(32);
                encryptor.IV = pdb.GetBytes(16);
                using (MemoryStream ms = new MemoryStream())
                {
                    using (CryptoStream cs = new CryptoStream(ms, encryptor.CreateDecryptor(), CryptoStreamMode.Write))
                    {
                        cs.Write(cipherBytes, 0, cipherBytes.Length);
                        cs.Close();
                    }
                    cipherText = Encoding.Unicode.GetString(ms.ToArray());
                }
            }
            return cipherText;
        }
        public string Encrypt(string clearText)
        {
            string EncryptionKey = "MAKV2SPBNI99212";
            byte[] clearBytes = Encoding.Unicode.GetBytes(clearText);
            using (Aes encryptor = Aes.Create())
            {
                Rfc2898DeriveBytes pdb = new Rfc2898DeriveBytes(EncryptionKey, new byte[] { 0x49, 0x76, 0x61, 0x6e, 0x20, 0x4d, 0x65, 0x64, 0x76, 0x65, 0x64, 0x65, 0x76 });
                encryptor.Key = pdb.GetBytes(32);
                encryptor.IV = pdb.GetBytes(16);
                using (MemoryStream ms = new MemoryStream())
                {
                    using (CryptoStream cs = new CryptoStream(ms, encryptor.CreateEncryptor(), CryptoStreamMode.Write))
                    {
                        cs.Write(clearBytes, 0, clearBytes.Length);
                        cs.Close();
                    }
                    clearText = Convert.ToBase64String(ms.ToArray());
                }
            }
            return clearText;
        }

        public string Decrypt(string cipherText)
        {
            string EncryptionKey = "MAKV2SPBNI99212";
            byte[] cipherBytes = Convert.FromBase64String(cipherText);
            using (Aes encryptor = Aes.Create())
            {
                Rfc2898DeriveBytes pdb = new Rfc2898DeriveBytes(EncryptionKey, new byte[] { 0x49, 0x76, 0x61, 0x6e, 0x20, 0x4d, 0x65, 0x64, 0x76, 0x65, 0x64, 0x65, 0x76 });
                encryptor.Key = pdb.GetBytes(32);
                encryptor.IV = pdb.GetBytes(16);
                using (MemoryStream ms = new MemoryStream())
                {
                    using (CryptoStream cs = new CryptoStream(ms, encryptor.CreateDecryptor(), CryptoStreamMode.Write))
                    {
                        cs.Write(cipherBytes, 0, cipherBytes.Length);
                        cs.Close();
                    }
                    cipherText = Encoding.Unicode.GetString(ms.ToArray());
                }
            }
            return cipherText;
        }
    }
}
