/**
 * Created by lenovo on 2016/5/4.
 */
;(function($){
  $.fn.dbRotate2D = function(options){
    var opt = {
      rotateSpeed: 100 //速度设置为100毫秒
    }
    $.extend(opt, options);
    return this.each(function(){
      var $this = $(this);
      var $img = $this.find('img');
      var imgWidth = $img.width();
      var imgHeight = $img.height();
      var mOver = false;//当用鼠标出入时的控制参数，点击事件无用，暂时保留
      var rolateOpt = function(){
        mOver = true;
        setAnimation();
      };
      init();

      function init(){
        setCss();
        setMouseEvent();
      }

      function setCss(){
        //$this.css({'width': imgWidth, 'height': imgHeight});
        $img.data({'out': $img.attr('src'), 'over': $img.attr('alt')});
      }


      function setMouseEvent(){
         //鼠标出入方式
         $this.bind('mouseenter', function(){
         mOver = true;
         setAnimation();

         });
         $this.bind('mouseleave', function(){
         mOver = false;
         setAnimation();
         });
        //鼠标点击方式

        $img.off('click', rolateOpt);
        $img.on('click', rolateOpt);
      }

      function setAnimation(){
        if(mOver == true){
          $img.stop()
            .animate({'left': imgWidth / 2, 'width': 0}, opt.rotateSpeed, function(){
              $(this).attr({'src': $(this).data('over')});
            })
            .animate({'left': 0, 'width': imgWidth}, opt.rotateSpeed)

        }else {
          $img.stop()
            .animate({'left': imgWidth / 2, 'width': 0}, opt.rotateSpeed, function(){
              $(this).attr({'src': $(this).data('out')});
            })
            .animate({'left': 0, 'width': imgWidth}, opt.rotateSpeed)
        }
      }

    })

  }
})(jQuery)