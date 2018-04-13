using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;
using System.Net;
using System.Text;
using System.Web.Script.Serialization;

namespace IRM_Oficial.Models
{
    public static class Notificacao
    {
        public static bool enviarNotificacao(string titulo, string conteudo, DateTime? data)
        {
            var request = WebRequest.Create("https://onesignal.com/api/v1/notifications") as HttpWebRequest;

            request.KeepAlive = true;
            request.Method = "POST";
            request.ContentType = "application/json; charset=utf-8";

            request.Headers.Add("authorization", "Basic M2E3NTVjMDAtMzkzMC00ODkyLWE1MDgtOTA0ZGIyODEwMzhj");
            var serializer = new JavaScriptSerializer();
            var obj = new
            {
                app_id = "7359d66e-8386-4f19-a426-083a6cff8081",
                headings = new { en = titulo },
                contents = new { en = conteudo },
                included_segments = new string[] { "All" },
                android_accent_color = "FF004960",
                //android_background_layout = new { headings_color = "FFFFFFFF", contents_color = "FF004960" },
                ios_badgeType = "Increase",
                ios_badgeCount = 1,
                send_after = (data.HasValue) ? data.Value.ToLocalTime().ToString("yyyy-MM-dd HH:mm:ss \"GMT\"zzz") : DateTime.Now.ToLocalTime().ToString("yyyy-MM-dd HH:mm:ss \"GMT\"zzz"),
            };
            var param = serializer.Serialize(obj);
            byte[] byteArray = Encoding.UTF8.GetBytes(param);

            string responseContent = null;

            try
            {
                using (var writer = request.GetRequestStream())
                {
                    writer.Write(byteArray, 0, byteArray.Length);
                }

                using (var response = request.GetResponse() as HttpWebResponse)
                {
                    using (var reader = new StreamReader(response.GetResponseStream()))
                    {
                        responseContent = reader.ReadToEnd();
                    }
                }
            }
            catch (WebException ex)
            {
                System.Diagnostics.Debug.WriteLine(ex.Message);
                System.Diagnostics.Debug.WriteLine(new StreamReader(ex.Response.GetResponseStream()).ReadToEnd());
            }

            return (String.IsNullOrEmpty(responseContent)) ? false : true;
        }
    }
}