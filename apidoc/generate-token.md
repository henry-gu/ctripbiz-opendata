# Token生成说明

2.2 C#示例代码

更新时间:2021-01-06 13:54:49

一、拼字符串

字符串aid=%s&sid=%s&userkey=%s&icode=%s&uuid=%s进中的%s替换成相应的参数。

其中aid、sid、userkey为携程提供,icode是具体接口代码,uuid是请求唯一标识码,请保证每次请求不一样,建议用GUID。

测试环境请使用:aid=1&sid=50&userkey=123456789。

示例如下:

aid=1&sid=50&userkey=123456789&icode=628e8df02d6b482db73c0d6ac8498a6b&uuid=14bc468ef5954be4a1cca35b66b28bfd

注意:参数名必须全部使用小写

二、调用加密方法生成Token

如下截图

2.1 Java示例代码

import java.io.UnsupportedEncodingException;

import java.security.MessageDigest;

import java.security.NoSuchAlgorithmException;

public class SHA256Utils{

/**

*利用java原生的摘要实现SHA256加密

*@param str加密后的报文

*@return

*/

public static String getSHA256StrJava(String str){

MessageDigest messageDigest;

String encodeStr="";

try{

messageDigest=MessageDigest.getInstance("SHA-256");

messageDigest.update(str.getBytes("UTF-8"));

encodeStr=byte2Hex(messageDigest.digest());

}catch(NoSuchAlgorithmException e){

return null;

//e.printStackTrace();

}catch(UnsupportedEncodingException e){

return null;

//e.printStackTrace();

}

return encodeStr;

}

/**

*将byte转为16进制

*@param bytes

*@return

*/

private static String byte2Hex(byte[]bytes){

StringBuffer stringBuffer=new StringBuffer();

String temp=null;

for(int i=0;i<bytes.length;i++){

temp=Integer.toHexString(bytes[i]&0xFF);

if(temp.length()==1){

//1得到一位的进行补0操作

stringBuffer.append("0");

}

stringBuffer.append(temp);

}

return stringBuffer.toString();

}

| 2.2 C#示例代码 | 一、拼字符串<br>二、调用加密方法生...<br>2.1 Java示例代码<br>2.2 C#示例代码 |
| --- | --- |

using System.Text;

using System.Threading.Tasks;

namespace ConsoleApplication2

{

class Program

{

static void Main(string[]args)

{

//分销商账号

string allianceId="1"

string sid="50";

//用户密钥,可以问携程业务索取

string userKey="XXXXXXXXXXXX";

//服务号,可以问携程业务索取

string icode="XXXXXX";

//随机码,请求唯一码

string uuid=Guid.NewGuid().ToString().Replace("-","");

string[]p=new string[]{allianceId,sid,userKey,icode,uuid};

string data=string.Format("aid={0}&sid={1}&userkey={2}

&icode={3}&uuid={4}",p);

string encryptData=SHA256(data);

System.Console.WriteLine(String.Format("待加密:{0}",data));

System.Console.WriteLine(String.Format("加密后:{0}",encryptData));

System.Console.ReadLine();

}

#region SHA256加密算法

///<summary>

///SHA256函数

///</summary>

///<param name="str">原始字符串</param>

///<returns>SHA256结果(返回⻓度为44字节的字符串)</returns>

public static string SHA256(string str)

{

byte[]bytValue=System.Text.Encoding.UTF8.GetBytes(str);

try

{

SHA256 sha256=new SHA256CryptoServiceProvider();

byte[]retVal=sha256.ComputeHash(bytValue);

StringBuilder sb=new StringBuilder();

for(int i=0;i<retVal.Length;i++)

{

sb.Append(retVal[i].ToString("x2"));

}

return sb.ToString();

}

catch(Exception ex)

{

throw new Exception("GetSHA256HashFromString()

fail,error:"+ex.Message);

}

#endregion

}
