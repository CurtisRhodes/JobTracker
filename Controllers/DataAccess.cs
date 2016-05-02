using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace JobTracker.Controllers
{
    public class ADO
    {
        public static string[] PerformStoredProcedure(string spName, Dictionary<string, string> vm)
        {
            string[] success = { "ono", "-1" };
            try
            {
                using (var connection = new SqlConnection(Globals.connStr))
                {
                    connection.Open();
                    using (var command = connection.CreateCommand())
                    {
                        command.CommandType = System.Data.CommandType.StoredProcedure;
                        command.CommandText = spName;
                        foreach (KeyValuePair<string, string> kv in vm)
                        {
                            command.Parameters.AddWithValue(kv.Key, kv.Value);
                        }
                        success[1] = command.ExecuteScalar().ToString();
                        success[0] = "ok";
                    }
                }
            }
            catch (Exception ex)
            {
                success[0] = ex.Message;
            }
            return success;
        }

        public static List<Dictionary<string, string>> PerformReader(string sqlQuery)
        {
            var items = new List<Dictionary<string, string>>();
            try
            {
                using (var connection = new SqlConnection(Globals.connStr))
                {
                    connection.Open();
                    using (var command = connection.CreateCommand())
                    {
                        command.CommandText = sqlQuery;
                        var reader = command.ExecuteReader();
                        if (reader.HasRows)
                        {
                            var columns = new List<string>();
                            for (int i = 0; i < reader.FieldCount; i++)
                                columns.Add(reader.GetName(i));

                            while (reader.Read())
                            {
                                var dic = new Dictionary<string, string>();
                                foreach (string fieldName in columns)
                                {
                                    var pval = reader[fieldName] == DBNull.Value ? "NULL" : reader[fieldName].ToString();
                                    dic.Add(fieldName, pval);
                                }
                                items.Add(dic);
                            }
                        }
                        //else
                        //{
                        //    var dic = new Dictionary<string, string>();
                        //    dic.Add("fieldName", "*");
                        //    dic.Add("titleLabel", "No Records Found");
                        //    items.Add(dic);
                        //}
                    }
                }
            }
            catch (Exception ex)
            {
                var dic = new Dictionary<string, string>();
                dic.Add("ERROR", ex.Message);
                items.Add(dic);
            }

            return items;
        }

        public static Dictionary<string, string> PerformSingleRowReader(string sqlQuery)
        {
            var dic = new Dictionary<string, string>();
            try
            {
                using (var connection = new SqlConnection(Globals.connStr))
                {
                    connection.Open();
                    using (var command = connection.CreateCommand())
                    {
                        command.CommandText = sqlQuery;
                        var reader = command.ExecuteReader();
                        if (reader.HasRows)
                        {
                            var columns = new List<string>();
                            for (int i = 0; i < reader.FieldCount; i++)
                                columns.Add(reader.GetName(i));

                            reader.Read();
                            {
                                foreach (string fieldName in columns)
                                {
                                    var pval = reader[fieldName] == DBNull.Value ? "" : reader[fieldName].ToString();
                                    dic.Add(fieldName, pval);
                                }
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                dic.Add("ERROR", ex.Message);
            }
            return dic;
        }

        public static string[] PerformExecuteScalar(string sqlQuery)
        {
            string[] success = { "ono", "-1" };
            try
            {
                using (var connection = new SqlConnection(Globals.connStr))
                {
                    connection.Open();
                    using (var command = connection.CreateCommand())
                    {
                        command.CommandText = sqlQuery;
                        success[1] = command.ExecuteScalar().ToString();
                        success[0] = "ok";
                    }
                }
            }
            catch (Exception ex)
            {
                success[0] = ex.Message;
                success[1] = "ERROR";
            }
            return success;
        }

        public static string[] PerformExecuteNonQuery(string sqlQuery)
        {
            string[] success = { "ono", "-1" };
            try
            {
                using (var connection = new SqlConnection(Globals.connStr))
                {
                    connection.Open();
                    using (var command = connection.CreateCommand())
                    {
                        command.CommandText = sqlQuery;
                        success[1] = command.ExecuteNonQuery().ToString();
                        success[0] = "ok";
                    }
                }
            }
            catch (Exception ex)
            {
                success[0] = ex.Message;
                success[1] = "ERROR";
            }
            return success;

        }

        public static Dictionary<string, string> DicCollapse(List<Dictionary<string, string>> dics)
        {
            var rtn = new Dictionary<string, string>();
            int i = 0;
            string key = "";
            foreach (var dic in dics)
            {
                i = 0;
                foreach (KeyValuePair<string, string> kv in dic)
                {
                    if (i == 0)
                    {
                        key = kv.Value;
                        i++;
                    }
                    else
                    {
                        rtn.Add(key, kv.Value);
                    }
                }
            }
            return rtn;
        }

        public static string[] DicToArray(List<Dictionary<string, string>> dics)
        {
            var columnList = new List<string>();
            foreach (Dictionary<string, string> dic in dics)
            {
                foreach (KeyValuePair<string, string> kv in dic)
                {
                    columnList.Add(kv.Value);
                }
            }
            return columnList.ToArray();
        }
    }
}