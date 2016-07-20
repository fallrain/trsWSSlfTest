/**
 * Created by wangguangkai on 2016/6/30.
 */
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
      prototype[name] = typeof prop[name] == "function"
      && typeof _super[name] == "function" && fnTest.test(prop[name]) ?
        (function(name, fn){
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

(function($){
  window.PageRefresh = Class.extend({
    //参数举例
    defaultCfg: {
      appendId: '',
      isDown: false,//是否下拉刷新
      pullDownHtml: '<div class="pr-pull-down">' +
      '<div class="pr-loader">' +
      '<span></span><span></span><span></span><span></span>' +
      '</div>' +
      '<div class="pr-loader-inf">下拉刷新</div>' +
      '</div>',//下拉的HTML
      pullUpHtml: '<div class="pr-pull-up">' +
      '<div class="pr-loader">' +
      '<span></span><span></span><span></span><span></span>' +
      '</div>' +
      '<div class="pr-loader-inf">上拉刷新</div>' +
      '</div>',//下拉的HTML
      beginPullUp: function(){
      },
      downRefreshFn: function(){
      },//查询数据的函数，一般是异步，所以需要在回调函数最后执行afterDownRefreshFn方法
    },
    init: function(cfg){
      this.cfg = cfg;
      this.rbCfg();
      this.geniScroll(this.cfg);

    },
    rbCfg: function(){
      /*修改些参数，本方法待修改*/
      var appendId = this.cfg.appendId;
      if(appendId){
        this.rootDom = $('#' + appendId);
      }
    },
    setWrapper: function(){
      var top = this.iScroll.wrapperOffset.top * -1;//是正常top的相反数

    },
    geniScroll: function(cfg){
      var _this = this;
      //load事件中构建IScroll对象，复杂页面需要延迟加载
      window.onload = function(){
        var appendId = _this.cfg.appendId;
        _this.iScroll = new IScroll('#' + appendId, _this.cfg);
        /*组合下拉，因为在onload事件中，所以需要在此方法执行，扩展性待修改*/
        if(_this.cfg.isPullDown){
          _this.genPullDown();
          _this.pullDownHover();
        }
        if(_this.cfg.isPullUp){
          _this.genPullUp();
          _this.pullUpHover();
        }
      }
    },
    pullDownHover: function(){
      /*下拉刷新悬停*/
      var _this = this;
      var iScroll = _this.iScroll;
      var scrollDownEndFn = function(){
        if(_this.cfg.downRefreshFn){
          _this.cfg.downRefreshFn();
        }
        iScroll.off('scrollEnd');
      };
      iScroll.on('scroll', function(){
        if(this.y >= this.pullDownY){
          if(_this.cfg.beginPullDown){
            _this.cfg.beginPullDown();
            iScroll.off('scrollEnd', scrollDownEndFn);
            iScroll.on('scrollEnd', scrollDownEndFn);
          }else{
            _this.defaultBeginPullDown();
            iScroll.off('scrollEnd', scrollDownEndFn);
            iScroll.on('scrollEnd', scrollDownEndFn);
          }
        }
      });
    },
    pullUpHover: function(){
      /*上拉刷新悬停*/
      var _this = this;
      var iScroll = _this.iScroll;
      var scrollUpEndFn = function(){
        if(_this.cfg.upRefreshFn){
          _this.cfg.upRefreshFn();
        }
        iScroll.off('scrollEnd');
      };
      iScroll.on('scroll', function(){
        if(this.y <= (this.maxScrollY - (_this.pullDownHeight || 0) - (_this.pullUpHeight || 0))){
          if(_this.cfg.beginPullUp){
            _this.cfg.beginPullUp();
            iScroll.off('scrollEnd', scrollUpEndFn);
            iScroll.on('scrollEnd', scrollUpEndFn);
          }else{
            _this.defaultBeginPullUp();
            iScroll.off('scrollEnd', scrollUpEndFn);
            iScroll.on('scrollEnd', scrollUpEndFn);
          }
        }
      });
    },
    afterRefreshFn: function(type){
      /*在下拉刷新后需要执行的函数*/
      var nameType = type.substr(0, 1).toUpperCase() + type.substr(1);
      this.iScroll['pull' + nameType + 'Y'] = type == 'up' ? 0 : this['pull' + nameType + 'Height'];
      this.iScroll.refresh();
      this.iScroll.resetPosition(400);
      this.rootDom.find('.pr-loader').css('display', 'none');

    },
    defaultBeginPullDown: function(){
      /*在把下拉提示框都拉出来之后需要执行的函数*/
      this.rootDom.find('.pr-pull-down .pr-loader').css('display', 'block');
      this.iScroll.pullDownY = 0;//
    },
    defaultBeginPullUp: function(){
      /*在把上拉提示框都拉出来之后需要执行的函数*/
      this.rootDom.find('.pr-pull-up .pr-loader').css('display', 'block');
      this.iScroll.pullUpY = this.pullUpHeight;
    },
    genPullDown: function(){
      /*组合下拉的代码区*/
      var pullDownHtml = this.cfg.pullDownHtml ? this.cfg.pullDownHtml : this.defaultCfg.pullDownHtml;
      var $pullDownHtml = $(pullDownHtml);
      /*var preHtml = $(this.iScroll.scroller).prevAll();
       preHtml.remove();//暂时设定为删除滚动区域之前的所有
       this.rootDom.prepend(pullDownHtml);*/
      var scroller = $(this.iScroll.scroller);
      scroller.prepend($pullDownHtml);
      var pullDownHeight = $pullDownHtml.height();//插入后才取值
      this.iScroll.scrollTo(0, pullDownHeight * -1);
      this.pullDownHeight = pullDownHeight;
      this.iScroll.pullDownY = pullDownHeight;//需要拿这个判断的值
    },
    genPullUp: function(){
      var pullUpHtml = this.cfg.pullUpHtml ? this.cfg.pullUpHtml : this.defaultCfg.pullUpHtml;
      var $pullUpHtml = $(pullUpHtml);

      var iScroll = this.iScroll;
      var scroller = $(iScroll.scroller);
      var scrollerHeight;
      if(this.cfg.isPullDown && this.cfg.pullDownHtml){
        scrollerHeight = iScroll.scrollerHeight - $(this.cfg.pullDownHtml).height();
      }else{
        scrollerHeight = iScroll.scrollerHeight;
      }
      scroller.append($pullUpHtml);
      var pullUpHeight = $pullUpHtml.height();//插入后取值
      if(scrollerHeight < iScroll.wrapperHeight){
        /*小于容器高则不会显示*/
        $pullUpHtml.css('display', 'none');
      }else{
        //设置上拉的区域的高
        this.pullUpHeight = pullUpHeight;
        this.iScroll.pullUpY = pullUpHeight;//需要拿这个判断的值
      }
    },
  });

})($);