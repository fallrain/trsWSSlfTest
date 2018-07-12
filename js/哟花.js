/*-----------------------------------------------------------------------------
 * @Description:  模板-产品详情-产品口碑
 * @author:      xuyingdong
 * @date        2017.10.27
 * ---------------------------------------------------------------------------*/
//先取到taginfore
$(function(){

  //初始化分页
  getHeaderData();
  getContentData(1,reputationConfig.templet_pageSize);
});
var template_value='';
//初始化内容方法
function initContent(data,curPage,pageSize){
  //判断成功执行，失败。
  if(data.isSuccess==true){
    var commentNum=data.data.entityCount;
    $(".js_commentNum").find("span").html(commentNum);
    var commentNone='';
    //循环每个entity
    //初始化分页
    templet_pagination(curPage,data.data.pageCount,pageSize,$(this).text(),".pageMobile",3);
    templet_pagination(curPage,data.data.pageCount,pageSize,$(this).text(),".pageMiddle",6);
    templet_pagination(curPage,data.data.pageCount,pageSize,$(this).text(),".pageMax",8);
    if(commentNum!=0){
      $(".product-prise-body .o_df_10-12").html("");
      for (var j = 0; j<data.data.entities.length;j++) {
        var commentTime=data.data.entities[j].commentTime.replace(/-/g, "/");//时间处理
        //append每个entity
        $(".product-prise-body .o_df_10-12").append('<div class="o_g prise-box"><div class="o_u o_df_2-12 o_lg_3-12 o_md_2-2 o_sm_2-2 o_xs_2-2"><div class="prise-user-name">'+templet_userNameHide(data.data.entities[j].loginAccountName)+'</div></div><div class="o_u o_df_6-12 o_lg_9-12 o_md_2-2 o_sm_2-2 o_xs_2-2"><span class="prise-time">'+commentTime+'</span><span class="prise-form">来自</span><span class="prise-form">'+data.data.entities[j].channelSourceStr+'</span><div class="prise-column">'+data.data.entities[j].content+'</div><div class="prise-img img'+j+'"><img src=""/></div></div><div class="o_u o_lg_3-12 o_df-hide o_lg-show"></div>'+templet_reply(data.data.entities[j].replyContent)+'</div>');
        //插入图片
        for(var i=0;i<data.data.entities[j].paths.length;i++){
          //修改图片class
          var templet_contentImg=" ";
          templet_contentImg+='<div class="prise-img-box"><img src="/tongshuaifile'+data.data.entities[j].paths[i]+'"></div>';
          $(".img"+j).append(templet_contentImg);
        }
      }
    }else{
      /*commentNone+='<div class="o_g product-prise-header"><div class="o_u o_df_1-12"></div>';
      commentNone+='<div class="o_u o_df_10-12">';
      commentNone+='<div class="prise-head"><div class="prise-percent">';
      commentNone+='<div class="percent-key">好评率：</div>';
      commentNone+='<div class="percent-value">'+template_value+'<sub>%</sub></div></div><div class="prise-tips">';
      commentNone+='<span class="prise_no_title">暂时还没有买家印象哦</span></div>';
      commentNone+='<div class="clear"></div></div></div></div>';*/
      commentNone+='<div class="o_g prise_no_pic">';
      commentNone+='<div class="o_u o_df_1-12"></div>';
      commentNone+='<div class="prise_no_item"><img src="/images/no_praise.png"/></div>';
      commentNone+='<div class="prise_no_item">';
      commentNone+='<span class="prise_no_tip">暂时还没有任何买家评价哦</span></div></div></div>';
      $(".product-prise-header").after(commentNone);
      $(".js_comment1").hide();

    }


  }
}

//获取内容信息
function getContentData(curPage,pageSize){
  $.ajax({
    url:siteConfig.domain+"/interaction-comment/comment/commentListShow/getContentData/",
    data:{businessId:reputationConfig.templet_businessId,pageNo:curPage,pageSize:pageSize},
    type:"GET",
    dataType:"json",
    success_cb:	function (data){
      initContent(data,curPage,pageSize);},
  });
}
function getContentData1(curPage,pageSize){
  $.ajax({
    url: siteConfig.domain+"/interaction-comment/comment/commentListShow/getContentData/",
    data:{businessId:reputationConfig.templet_businessId,pageNo:curPage,pageSize:pageSize},
    type:"GET",
    dataType:"json",
    success_cb:	function (data){
      //判断成功执行，失败。
      if(data.isSuccess==true){
        //循环每个entity

        $(".product-prise-body .o_df_10-12").html("");
        for (var j = 0; j<data.data.entities.length;j++) {
          var commentTime=data.data.entities[j].commentTime.replace(/-/g, "/");//时间处理
          //append每个entity
          $(".product-prise-body .o_df_10-12").append('<div class="o_g prise-box"><div class="o_u o_df_2-12 o_lg_3-12 o_md_2-2 o_sm_2-2 o_xs_2-2"><div class="prise-user-name">'+templet_userNameHide(data.data.entities[j].loginAccountName)+'</div></div><div class="o_u o_df_6-12 o_lg_9-12 o_md_2-2 o_sm_2-2 o_xs_2-2"><span class="prise-time">'+commentTime+'</span><span class="prise-form">来自</span><span class="prise-form">'+data.data.entities[j].channelSourceStr+'</span><div class="prise-column">'+data.data.entities[j].content+'</div><div class="prise-img img'+j+'"><img src=""/></div></div><div class="o_u o_lg_3-12 o_df-hide o_lg-show"></div>'+templet_reply(data.data.entities[j].replyContent)+'</div>');
          //插入图片
          for(var i=0;i<data.data.entities[j].paths.length;i++){
            //修改图片class
            var templet_contentImg=" ";
            templet_contentImg+='<div class="prise-img-box"><img src="/tongshuaifile'+data.data.entities[j].paths[i]+'"></div>';
            $(".img"+j).append(templet_contentImg);
          }

        }


      }
    }
  });
}
//点击触发全部内容展示
function onTagAll(){
  $(".js_comment1").on("click", function(){
    $(this).addClass("active").siblings().removeClass("active");
    getContentData(1,reputationConfig.templet_pageSize);
  });
}


function getHeaderData(){
  //获取标签头部
  $.ajax({
    url: siteConfig.domain+"/interaction-comment/comment/commentListShow/getHeaderData/",
    data: {businessId: reputationConfig.templet_businessId},
    type: "GET",
    dataType: "json",
    success_cb: function (data){
      //循环输出。判断成功执行，失败。
      if(data.isSuccess==true){
        //修改好评率
        template_value=data.data.favorableRate;
        if(template_value==0){
          $(".percent-value").html('100'+'<sub>%</sub>');
        }else{
          $(".percent-value").html(data.data.favorableRate+'<sub>%</sub>');
        }

        if(template_value!=0){
          //循环遍历标签
          for(var k=0;k<data.data.topTagInfo.length;k++){
            var  templet_topTagInfo="";
            templet_topTagInfo+='<a href="javascript:;" class="l-btn-sm l-btn-line2 js_comment">'+data.data.topTagInfo[k].tagName+'</a>';
            $(".prise-tips").append(templet_topTagInfo);
          }
        }else{
          $(".prise-tips").append('<span class="prise_no_title">暂时还没有买家印象哦</span>');
        }
        //根据点击获取数据
        getContentDataByTag(1,reputationConfig.templet_pageSize);
        onTagAll();
      }
    }
  });
}
function getContentDataByTag(curPage,pageSize){
  //根据标签点击获取对应内容
  $(".js_comment").on("click", function(){
    var tagName=$(this).text();
    $(this).addClass("active").siblings().removeClass("active");
    $.ajax({
      url: siteConfig.domain+"/interaction-comment/comment/commentListShow/getContentDataByTag/",
      data:{businessId:reputationConfig.templet_businessId,pageNo:curPage,pageSize:pageSize,tagName:tagName},
      type:"GET",
      dataType:"json",
      success_cb: function (data){
        //初始化分页
        templet_pagination(curPage,data.data.pageCount,pageSize,$(this).text(),".pageMobile",3);
        templet_pagination(curPage,data.data.pageCount,pageSize,$(this).text(),".pageMiddle",6);
        templet_pagination(curPage,data.data.pageCount,pageSize,$(this).text(),".pageMax",8);
        //判断成功执行，失败。
        if(data.isSuccess==true){
          //循环每个entity
          $(".product-prise-body .o_df_10-12").html("");
          for (var j = 0; j<data.data.entities.length;j++) {
            var commentTime=data.data.entities[j].commentTime.replace(/-/g, "/");//时间处理
            //append每个entity
            $(".product-prise-body .o_df_10-12").append('<div class="o_g prise-box"><div class="o_u o_df_2-12 o_lg_3-12 o_md_2-2 o_sm_2-2 o_xs_2-2"><div class="prise-user-name">'+templet_userNameHide(data.data.entities[j].loginAccountName)+'</div></div><div class="o_u o_df_6-12 o_lg_9-12 o_md_2-2 o_sm_2-2 o_xs_2-2"><span class="prise-time">'+commentTime+'</span><span class="prise-form">来自</span><span class="prise-form">'+data.data.entities[j].channelSourceStr+'</span><div class="prise-column">'+data.data.entities[j].content+'</div><div class="prise-img img'+j+'"><img src=""/></div></div><div class="o_u o_lg_3-12 o_df-hide o_lg-show"></div>'+templet_reply(data.data.entities[j].replyContent)+'</div>');
            //插入图片
            for(var i=0;i<data.data.entities[j].paths.length;i++){
              //修改图片class
              var templet_contentImg=" ";
              templet_contentImg+='<div class="prise-img-box"><img src="/tongshuaifile'+data.data.entities[j].paths[i]+'"></div>';
              $(".img"+j).append(templet_contentImg);
            }

          }
        }
      }
    });
  });
}
function getContentDataByTag1(curPage,pageSize,tagName){
  //根据标签点击获取对应内容

  $.ajax({
    url: siteConfig.domain+"/interaction-comment/comment/commentListShow/getContentDataByTag/",
    data:{businessId:reputationConfig.templet_businessId,pageNo:curPage,pageSize:pageSize,tagName:tagName},
    type:"GET",
    dataType:"json",
    success_cb: function (data){
      //判断成功执行，失败。
      if(data.isSuccess==true){
        //循环每个entity
        $(".product-prise-body .o_df_10-12").html("");
        for (var j = 0; j<data.data.entities.length;j++) {
          var commentTime=data.data.entities[j].commentTime.replace(/-/g, "/");//时间处理
          //append每个entity
          $(".product-prise-body .o_df_10-12").append('<div class="o_g prise-box"><div class="o_u o_df_2-12 o_lg_3-12 o_md_2-2 o_sm_2-2 o_xs_2-2"><div class="prise-user-name">'+templet_userNameHide(data.data.entities[j].loginAccountName)+'</div></div><div class="o_u o_df_6-12 o_lg_9-12 o_md_2-2 o_sm_2-2 o_xs_2-2"><span class="prise-time">'+commentTime+'</span><span class="prise-form">来自</span><span class="prise-form">'+data.data.entities[j].channelSourceStr+'</span><div class="prise-column">'+data.data.entities[j].content+'</div><div class="prise-img img'+j+'"><img src=""/></div></div><div class="o_u o_lg_3-12 o_df-hide o_lg-show"></div>'+templet_reply(data.data.entities[j].replyContent)+'</div>');
          //插入图片
          for(var i=0;i<data.data.entities[j].paths.length;i++){
            //修改图片class
            var templet_contentImg=" ";
            templet_contentImg+='<div class="prise-img-box"><img src="/tongshuaifile'+data.data.entities[j].paths[i]+'"></div>';
            $(".img"+j).append(templet_contentImg);
          }

        }
      }
    }
  });

}
//官方回复校验
function templet_reply(replyContent) {
  var templet_reply=" ";
  if(replyContent==null||replyContent==""){
    templet_reply='<div class="o_u o_df_4-12 o_lg_9-12 o_md_10-12 o_sm_10-12 o_xs_10-12 prise-reply"><img src=""/></div>';
    return templet_reply;
  }else {
    templet_reply='<div class="o_u o_df_4-12 o_lg_9-12 o_md_10-12 o_sm_10-12 o_xs_10-12 prise-reply"><span class="prise-form">官方回复</span><div class="prise-column">replyContent</div></div>';
    return templet_reply;
  }
}
//用户名hide
function templet_userNameHide(data){

  var templet_userName_hide=data.substr(0,1)+'***'+data.substr(data.length-1);
  return templet_userName_hide;
}
//分页初始化
function templet_pagination(curPage,pageCount,pageSize,tagName,className,showPageCount){

  var pager=new pagination(className);
  pager.currPage = curPage;
  pager.pageSize=pageSize;
  pager.showPageCount=showPageCount;
  //重写click方法  ajax取数据
  pager.onclick = function(currPageT){
    //传入参数
    var dataT = {
      // type:type,
      pagesize:pageSize,
      curpage:currPageT
    }
    //  search(searchWord, _tableName, _xmlPath, currPageT, pageSize, order, isSelectItemStr);
    // 进行判断执行点击
    if(tagName==null||tagName==""){
      getContentData1(currPageT,pageSize);
    }else{

      getContentDataByTag1(currPageT,pageSize,tagName);
    }

    pager.totalPage =  pageCount;
    pager.currPage = currPageT;
    pager.pageCount = pageSize;
    pager.render();
  };
  pager.totalPage =  pageCount;
  pager.currPage = curPage;
  pager.pageCount = pageSize;
  pager.render();
}








