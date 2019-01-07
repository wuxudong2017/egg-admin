$.extend({
    message:function(message,obj,callback){
    if(callback instanceof Object||typeof callback =='Function'){
        
    }else{
        callback=function(){

        }
    }
        var deObj = {
            type:1,
            time:1000,
            message:'操作成功'
        };
        var option = $.extend(deObj,obj)
        var $wrap =$('<div id="toast-container" class="toast-top-right"></div>'),
            $closeBtn = $('<button type="button" class="toast-close-button"role="button">×</button>'),
            $box = $('<div class="" aria-live="assertive" style="display: block;"></div>'),
            $con = $('<div class="toast-message"></div>');
            if(option.type===0){
                $box.attr('class','toast toast-error')
            }else if(option.type === 1){
                $box.attr('class','toast toast-success')
            }else if(option.type === 2){
                $box.attr('class',' toast toast-warning')
            }else{
                $box.attr('class',' toast toast-info')
            }
            $con.text(option.message)
            var win = $wrap.width()
            $('body').append($wrap.append($box.append($closeBtn).append($con)));
            $closeBtn.bind('click',function(){
               $wrap.animate({
                   opacity:0,
                   top:-win
               },500,function(){
                $wrap.remove()
               })
            });
            setTimeout(()=>{
                $wrap.remove();
                setTimeout(() => {
                    callback()
                },100)
            },option.time)

    },
    alert:function(message,callback1){
        if(callback1 instanceof Object||typeof callback1 =='Function'){
        
        }else{
            callback1=function(){
    
            }
        }
        var content =""
        if(message === "" || message === null){
            content = "确定当前操作吗"
        }else{
            content = message
        }
        var $wrap =  $('<div class="modal fade in"  style="display: block;"></div>'),
            $bg = $(' <div class="modal-dialog"></div>'),
            $con =$('<div class="modal-content  modal-sm"></div>'),
            $head =$('<div class="modal-header"><h4 class="modal-title"></h4></div>'),
            $close = $('<button class="close"><span>&times;</span></button>'),
            $body= $('<div class="modal-body"></div>'),
            $foot = $('<div class="modal-footer"></div>'),
            $sure = $('<button class="btn btn-primary btn-md">确定</button>'),
            $cancel=$('<button class="btn btn-default btn-md">取消</button>');
            $content = $('<h4>'+content+'</h4>')
            $wrap.append($bg.append($con.append($head.prepend($close)).append($body.append($content).append()).append($foot.append($sure).append($cancel))))
            
            $('body').append($wrap)
            $sure.bind('click',function(){
                callback1();
                $wrap.remove()
            });
            $close.bind('click',function(){
                $wrap.remove()
            })
            $cancel.bind('click',function(){
                $wrap.remove()
            })

    }


})

