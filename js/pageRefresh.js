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
      beginPullUp: function(){
      },
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
        _this.genPullDown();//如果存在下拉就组合下拉
        _this.pullDownHover();
      }
    },
    pullDownHover: function(){
      /*下拉刷新悬停*/
      var _this = this;
      var iScroll=_this.iScroll;
      iScroll.on('scroll', function(){
        if(this.y >= this.pullDownY){
          if(_this.cfg.beginPullUp){
            _this.cfg.beginPullUp();
            iScroll.off('scrollEnd');
            iScroll.on('scrollEnd', function(){
              if(_this.cfg.downRefreshFn){
                _this.cfg.downRefreshFn();
              }
              iScroll.off('scrollEnd');
            });
          }else{
            _this.defaultBeginPullUp();
            iScroll.off('scrollEnd');
            iScroll.on('scrollEnd', function(){
              if(_this.cfg.downRefreshFn){
                _this.cfg.downRefreshFn();
              }
              iScroll.off('scrollEnd');
            });
          }
        }
      });
    },
    afterDownRefreshFn: function(){
      /*在下拉刷新后需要执行的函数*/
      this.iScroll.pullDownY = this.pullDownHeight;
      this.iScroll.resetPosition(400);
    },
    defaultBeginPullUp: function(){
      /*在把下拉提示框都拉出来之后需要执行的函数*/
      this.rootDom.find('.pr-loader').css('display', 'block');
      this.iScroll.pullDownY = 0;
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
  });

})($);