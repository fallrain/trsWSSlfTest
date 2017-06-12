(function(){
  /**
   * 所有类的基类，提供继承机制
   */
  var initializing = false, fnTest = /xyz/.test(function(){
    xyz;
  }) ? /\b_super\b/ : /.*/;
  this.Class = function(){
  };

  Class.extend = function(prop){
    var _super = this.prototype;

    initializing = true;
    var prototype = new this();
    initializing = false;

    for(var name in prop){
      prototype[name] = typeof prop[name] == "function" && typeof _super[name] == "function" && fnTest.test(prop[name]) ? (function(name, fn){
        return function(){
          var tmp = this._super;

          this._super = _super[name];

          var ret = fn.apply(this, arguments);
          this._super = tmp;

          return ret;
        };
      })(name, prop[name]) : prop[name];
    }

    function Class(){
      if(!initializing && this.init)
        this.init.apply(this, arguments);
    }

    Class.prototype = prototype;

    Class.prototype.constructor = Class;

    Class.extend = arguments.callee;

    return Class;
  };
})();

+function(){
  var beforeSendFn = function(ajaxRequest){
    ajaxRequest.setRequestHeader("Accept", "application/json");
  };
  var completeFn = function(){
  };
  var successFn = function(json){
    if(typeof json === 'string'){
      try{
        json = eval("(" + json + ")");
      }catch(e){
      }
    }
    if(this.callBack){
      this.callBack(json);
    }
  };
  var errorFn = function(x, t, e){
    var data = {
      isSuccess : false
    };
    if(t == "timeout"){
      data.resultMsg = "请求超时";
    }else if(x.status == 404){
      data.resultMsg = "404:您访问的资源不存在";
    }else if(x.status == 403){
      data.resultMsg = "403:您的访问被拒绝";
    }else{
      //data.resultMsg = "未知异常！源：" + (x && x.responseText) + "； 错误类型：" + t + "；异常：" + e;
      data.resultMsg = (x.responseJSON && x.responseJSON.resultMsg) || e || '未知错误' + ((x.responseJSON && x.responseJSON.errorCode) || x.statusText || '');
    }
    if(x.responseJSON && x.responseJSON.errorCode == 'error.notLogin'){
      var loginUrl = mpUrlsObj.login.login;
      var returnUrl = window.location.href;
      location.href = loginUrl + "&returnUrl=" + returnUrl;
      return;
    }
    if(this.callBack){
      //类型处理暂定
      this.callBack(data);
    }

  };
  window.Common = {
    get : function(str, domain){
      domain = domain || window.document;
      return domain.getElementById(str);
    },
    sendFormData : function(url, callBack, data, options){
      if(!Common.preventSend || (options && options.important)){
        options = options || {};
        $.ajax($.extend({
          url : url,
          type : 'post',
          async : true,
          data : data,
          beforeSend : beforeSendFn,
          complete : function(XMLHttpRequest, textStatus){
            completeFn(XMLHttpRequest, textStatus);
          },
          success : successFn,
          error : function(XMLHttpRequest, textStatus, errorThrown){
            errorFn.call(this, XMLHttpRequest, textStatus, errorThrown);
          },
          callBack : callBack
        }, options));
      }
    },
    sendData : function(url){
      return $.ajax({
        url : url,
        type : 'get',
        async : false,
        beforeSend : beforeSendFn
      }).responseText;
    },
    notify : function(msg, timeout){
      // to-do
    },
    comfirm : function(msg){
      // to-do
    },
    encode : function(encodeStr){
      return encodeURIComponent(encodeStr);
    },
    decode : function(decodeStr){
      return decodeURIComponent(decodeStr);
    },
    GetElCoordinate : function(e){
      var t = e.offsetTop;
      var l = e.offsetLeft;
      var w = e.offsetWidth;
      var h = e.offsetHeight;
      while(e = e.offsetParent){
        t += e.offsetTop;
        l += e.offsetLeft;
      }
      return {
        top : t,
        left : l,
        width : w,
        height : h,
        bottom : t + h,
        right : l + w
      };
    }
  };
}();

(function(){
  Common.detectOS = function(){
    var sUserAgent = navigator.userAgent;
    var isWin = (navigator.platform == "Win32") || (navigator.platform == "Windows");
    var isMac = (navigator.platform == "Mac68K") || (navigator.platform == "MacPPC") || (navigator.platform == "Macintosh") || (navigator.platform == "MacIntel");
    if(isMac)
      return "Macintosh";
    var isUnix = (navigator.platform == "X11") && !isWin && !isMac;
    if(isUnix)
      return "Unix";
    var isLinux = (String(navigator.platform).indexOf("Linux") > -1);
    if(isLinux)
      return "Linux";
    if(isWin){
      var isWin2K = sUserAgent.indexOf("Windows NT 5.0") > -1 || sUserAgent.indexOf("Windows 2000") > -1;
      if(isWin2K)
        return "Windows 2000";
      var isWinXP = sUserAgent.indexOf("Windows NT 5.1") > -1 || sUserAgent.indexOf("Windows XP") > -1;
      if(isWinXP)
        return "Windows XP";
      var isWin2003 = sUserAgent.indexOf("Windows NT 5.2") > -1 || sUserAgent.indexOf("Windows 2003") > -1;
      if(isWin2003)
        return "Windows 2003";
      var isWinVista = sUserAgent.indexOf("Windows NT 6.0") > -1 || sUserAgent.indexOf("Windows Vista") > -1;
      if(isWinVista)
        return "Windows Vista";
      var isWin7 = sUserAgent.indexOf("Windows NT 6.1") > -1 || sUserAgent.indexOf("Windows 7") > -1;
      if(isWin7)
        return "Windows 7";
      var isWin8 = sUserAgent.indexOf("Windows NT 6.2") > -1 || sUserAgent.indexOf("Windows 8") > -1;
      if(isWin8)
        return "Windows 8";
    }
    return "other";
  };
})();

(function(){
  // AJAX跨域请求
  Common.getJSON = function(url, data, fun, error, preUrl){
    // var perUrlTemp = preUrl || Common.servicePath;
    // var urlTemp = perUrlTemp + url;
    var urlTemp = url;

    $.ajax({
      type : "get",
      crossDomain : true,
      url : urlTemp,
      data : data,
      dataType : "jsonp",
      jsonp : "callback",
      success : fun,
      error : function(x, t, e){
        var data = {
          result : 'error'
        };
        if(t == "timeout"){
          data.errorInfo = "请求超时";
        }else if(x.status == 404){
          data.errorInfo = "404:您访问的资源不存在";
        }else{
          data.errorInfo = "未知异常！源：" + (x && x.responseText) + "； 错误类型：" + t + "；异常：" + e;
        }
      }
    });
  };
})();

var toString = {}.toString;// 释放到window对象中
(function(){
  var toString = {}.toString;// IE下不支持直接调用toString.call,重新定义只是为了避免从window对象中遍历
  /* 判断对象类型 */
  // undefined
  Common.isUndefined = function(value){
    return typeof value === 'undefined';
  };
  // 非undefined
  Common.isDefined = function(value){
    return typeof value !== 'undefined';
  };
  // 对象
  Common.isObject = function(value){
    return value !== null && typeof value === 'object';
  };
  // 字符串
  Common.isString = function(value){
    return typeof value === 'string';
  }
  // 数字
  Common.isNumber = function(value){
    return typeof value === 'number';
  };
  // 日期
  Common.isDate = function(value){
    return toString.call(value) === '[object Date]';
  };
  // 数组
  Common.isArray = function(value){
    return Array.isArray(value);
  };
  // 函数
  Common.isFunction = function(value){
    return typeof value === 'function';
  };
  // 正则对象
  Common.isRegExp = function(value){
    return toString.call(value) === '[object RegExp]';
  };
  // window
  Common.isWindow = function(obj){
    return obj && obj.document && obj.location && obj.alert && obj.setInterval;
  };
  // 文件
  Common.isFile = function(obj){
    return toString.call(obj) === '[object File]';
  };
  // BLOB
  Common.isBlob = function(obj){
    return toString.call(obj) === '[object Blob]';
  };
  // 布尔类型
  Common.isBoolean = function(value){
    return typeof value === 'boolean';
  };
  // js或者jQuery对象
  Common.isElement = function(node){
    return !!(node && (node.nodeName || (node.prop && node.attr && node.find)));
  };
  //网页禁止选中，主要用于去掉复制
  Common.setNoCopy = function(node){
    var dom = node || "body";
    $(dom)[0].onselectstart = $(dom)[0].oncontextmenu = function(){
      return false;
    };
    Common.getBrowserInfo().type == "Firefox" && $(dom).addClass("moz-no-select");
  }
})();
