document.write("<script language=javascript src='"+baseUrl+"JS/jquery.min.js'></script>");
document.write("<script language=javascript src='"+baseUrl+"JS/jquery.cookie.js'></script>");
document.write("<script language=javascript src='"+baseUrl+"JS/iosSelect.js'></script>");
document.write("<script language=javascript src='"+baseUrl+"JS/iscroll-probe.js'></script>");
document.write("<script language=javascript src='"+baseUrl+"JS/route.js'></script>");
document.write("<script language=javascript src='"+baseUrl+"JS/common.js'></script>");
document.write("<script language=javascript src='"+baseUrl+"JS/unionpay.js'></script>");



function includeLinkStyle(url) {
  var link = document.createElement("link");
  link.rel = "stylesheet";
  link.type = "text/css";
  link.href = url;
  document.getElementsByTagName("head")[0].appendChild(link);
}

includeLinkStyle(""+baseUrl+"css/style.css");
includeLinkStyle(""+baseUrl+"css/iosSelect.css");