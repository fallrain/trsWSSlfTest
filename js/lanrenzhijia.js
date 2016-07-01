function myEvent(obj, ev, fu){
  obj.attachEvent ? obj.attachEvent('on' + ev, fu) : obj.addEventListener(ev, fu, false);
}


window.onload = function(){
  var oBox = document.getElementById('ztbox');
  var oConter = document.getElementById('conter');
  var oUl = oConter.getElementsByTagName('ul')[0];
  var oLi = oConter.getElementsByTagName('li');
  var oScroll = document.getElementById('scroll');
  var oSpan = oScroll.getElementsByTagName('span')[0];
  var i = 0;
  oUl.style.width = 187 + 'px';
  //var iWidth = oScroll.offsetWidth/(oUl.offsetWidth / oConter.offsetWidth - 1)
  var iWidth = 416;
  //点击滚动条
  oScroll.onclick = function(e){
    var oEvent = e || event;
    var butscroll = oEvent.clientY - oSpan.offsetHeight / 2; //- oBox.offsetLeft - 53 - oSpan.offsetWidth / 2;
    oscroll(butscroll);
  };
  oSpan.onclick = function(e){
    var oEvent = e || event;
    oEvent.cancelBubble = true;
  };
  //拖拽滚动条
  var iX = 0;
  oSpan.onmousedown = function(e){
    var oEvent = e || event;
    iX = oEvent.clientY - oSpan.offsetTop;
    document.onmousemove = function(e){
      var oEvent = e || event;
      var l = oEvent.clientY - iX;
      td(l);
      return false;
    };
    document.onmouseup = function(){
      document.onmousemove = null;
      document.onmouseup = null;
    };
    return false;
  };
  //滚动事件
  function oscroll(l){
    if(l < 0){
      l = 0;
    }else if(l > oScroll.offsetHeight - oSpan.offsetHeight){
      l = oScroll.offsetHeight - oSpan.offsetHeight;
    }
    var scrol = l / (oScroll.offsetHeight - oSpan.offsetHeight);
    sMove(oSpan, 'top', Math.ceil(l));
    sMove(oUl, 'top', '-' + Math.ceil((oUl.offsetHeight - (oConter.offsetHeight + 15)) * scrol));
  }

  function td(l){
    if(l < 0){
      l = 0;
    }else if(l > oScroll.offsetHeight - oSpan.offsetHeight){
      l = oScroll.offsetHeight - oSpan.offsetHeight;
    }
    var scrol = l / (oScroll.offsetHeight - oSpan.offsetHeight);
    oSpan.style.top = l + 'px';
    oUl.style.top = '-' + (oUl.offsetHeight - (oConter.offsetHeight + 15)) * scrol + 'px';
  }
};
//运动框架
function getStyle(obj, attr){
  return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj, false)[attr];
}
function sMove(obj, attr, iT, onEnd){
  clearInterval(obj.timer);
  obj.timer = setInterval(function(){
    dMove(obj, attr, iT, onEnd);
  }, 30);
}
function dMove(obj, attr, iT, onEnd){
  var iCur = 0;
  attr == 'opacity' ? iCur = parseInt(parseFloat(getStyle(obj, attr) * 100)) : iCur = parseInt(getStyle(obj, attr));
  var iS = (iT - iCur) / 5;
  iS = iS > 0 ? Math.ceil(iS) : Math.floor(iS);
  if(iCur == iT){
    clearInterval(obj.timer);
    if(onEnd){
      onEnd();
    }
  }else{
    if(attr == 'opacity'){
      obj.style.ficter = 'alpha(opacity:' + (iCur + iS) + ')';
      obj.style.opacity = (iCur + iS) / 100;
    }else{
      obj.style[attr] = iCur + iS + 'px';
    }
  }
}
