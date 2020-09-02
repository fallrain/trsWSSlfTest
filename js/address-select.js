/**
 * Created by wangguangkai on 2016/5/4.
 */

(function () {
  /**
   * 所有类的基类，提供继承机制
   */
  var initializing = false; var fnTest = /xyz/.test(function () {
    xyz;
  }) ? /\b_super\b/ : /.*/;
  this.Class = function () {
  };

  Class.extend = function (prop) {
    var _super = this.prototype;

    initializing = true;
    var prototype = new this();
    initializing = false;

    for (var name in prop) {
      prototype[name] = typeof prop[name] === 'function' &&
      typeof _super[name] === 'function' && fnTest.test(prop[name])
        ? (function (name, fn) {
          return function () {
            var tmp = this._super;

            this._super = _super[name];

            var ret = fn.apply(this, arguments);
            this._super = tmp;

            return ret;
          };
        })(name, prop[name]) : prop[name];
    }

    function Class () {
      if (!initializing && this.init) { this.init.apply(this, arguments); }
    }

    Class.prototype = prototype;

    Class.prototype.constructor = Class;

    Class.extend = arguments.callee;

    return Class;
  };
})();
var addressArgs = {};
(function () {
  /**
   * 初始化下拉框及绑定下拉框事件
   */
  /* 下拉框收起下拉框 */
  var bodySltClick = function () {
    $('.js_pulldown').parent('ul').find('ul').hide();
  };
  /* 下拉框展开下拉框 */
  var sltShow = function () {
    $('.js_pulldown').parent('ul').find('ul').hide();
    $(this).find('ul').show();
    // event.stopPropagation();
    return false;
  };
  var rb = function () {
    var thisValue = $(this).attr('livalue');
    var thisValueName = $(this).html();
    var thisId = $(this).parent('ul').attr('id');	// 点击节点的id
    if (thisId == 'province') {	// 点击省，构建市的数据
      $('#hidden_province').val(thisValue + ',' + thisValueName);
      $('#hidden_city').val('');	// 清空隐藏域市的数据
      $('#hidden_area').val('');	// 清空隐藏域区的数据
      $('#city').html('');		// 清空下拉市的数据
      $('#area').html('');		// 清空下拉区的数据
      $('#city').prev().html('请选择');
      $('#area').prev().html('请选择');
      $('#addressError').html('');
      buildZones('city');
    } else if (thisId == 'city') {		// 点击市，构建区的数据
      $('#hidden_city').val(thisValue + ',' + thisValueName);
      $('#hidden_area').val('');	// 清空隐藏域区的数据
      $('#area').html('');		// 清空下拉区的数据
      $('#area').prev().html('请选择');
      $('#addressError').html('');
      buildZones('area');
    } else if (thisId == 'area') {		// 点击区只做赋值操作
      $('#hidden_area').val(thisValue + ',' + thisValueName);
      $('#addressError').html('');
    }
    $(this).parent().parent().find('em').html($(this).html());
    $(this).parent().hide();
    // event.stopPropagation();
    return false;
  };
  var pulldown = addressArgs.pulldown = function () {
    $('body').off('click', bodySltClick);
    $('body').on('click', bodySltClick);

    $('.js_pulldown').parent('.ul1').off('click', sltShow);
    $('.js_pulldown').parent('.ul1').on('click', sltShow);

    $('.js_pulldown ul li').off('click', rb);
    $('.js_pulldown ul li').on('click', rb);
  };
  var buildZones = addressArgs.buildZones = function (selectId) {
    var surl = '';
    var data;
    var curId = '';		// 当前显示节点,-1为无数据
    // 省
    var hiddenProvince = $.trim($('#hidden_province').val());
    if (hiddenProvince == '' || hiddenProvince == '0,') {
      hiddenProvince = '-1,';
      $('#province').prev().html('请选择');
      $('#city').prev().html('请选择');
      $('#area').prev().html('请选择');
    }
    // 市
    var hiddenCity = $.trim($('#hidden_city').val());
    if (hiddenCity == '' || hiddenCity == '0,') {
      hiddenCity = '-1,';
      $('#city').prev().html('请选择');
      $('#area').prev().html('请选择');
    }
    // 区
    var hiddenArea = $.trim($('#hidden_area').val());
    if (hiddenArea == '' || hiddenArea == '0,') {
      hiddenArea = '-1,';
      $('#area').prev().html('请选择');
    }
    if (selectId == 'province') {
      surl = '/HaierFramework/productstore/queryTopProvicnesAsync.do';
      curId = hiddenProvince.split(',')[0];
      data = {
        'parentId': '0'
      };
    } else if (selectId == 'city') {
      surl = '/HaierFramework/productstore/queryProvicnesAsync.do';
      curId = hiddenCity.split(',')[0];
      data = {
        'parentId': hiddenProvince.split(',')[0]
      };
    } else if (selectId == 'area') {
      surl = '/HaierFramework/areainfo/queryAreas.do';
      curId = hiddenArea.split(',')[0];
      data = {
        'parentId': hiddenCity.split(',')[0]
      };
    } else {
      return;
    }
    jQuery.ajax({
      type: 'post',
      dataType: 'json',
      url: surl,
      data: data,
      success: function (returnData) {
        var resultList = returnData.provinces;
        if (resultList.length > 0) {
          jQuery('#' + selectId).empty();
        }
        // 开始动态追加数据
        // jQuery("<li liValue=NULLVALUE>请选择</li>").appendTo('#'+selectId);
        for (var i = 0; i < resultList.length; i++) {
          if (resultList[i].proId == curId) {
            var curProvinceName = resultList[i].name;
            $('#' + selectId).prev().html(curProvinceName);
          }
          jQuery("<li liValue='" + resultList[i].proId + "'>" + resultList[i].name + '</li>').appendTo('#' + selectId);
        }
        pulldown();
      }
    });
  };
  addressArgs.init = function () {
    this.buildZones('province');
  };
})();
var AddressSlt = Class.extend(addressArgs);
var actAds = new AddressSlt();
actAds.pulldown();
