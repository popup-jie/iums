$(function(){
    var sd = $(window).height();
    document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false); 
    var mySwiper = new Swiper ('.swiper-container', {
        direction : 'vertical',
        followFinger : false,
        onInit: function(swiper){
            swiperAnimateCache(swiper); //隐藏动画元素 
            swiperAnimate(swiper); //初始化完成开始动画
        },
        onSlideChangeEnd: function(swiper){
            swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
            if(swiper.realIndex == 0){
                $(".cir").css({'-webkit-animation-duration':'8s','animation-duration':'8s'})
                setTimeout(function(){
                    $(".cir").addClass('cir2');
                },700);
            }else{
                $(".cir").css({'-webkit-animation-duration':'0.8s'});
                $(".cir").removeClass('cir2');
            }
        },
        onSlideNextStart:function(swiper){
            swiperAnimate(swiper);
            $('.swiper-container').height(sd+'px'); 
            $('input').blur();
            swiper.lockSwipeToNext();

        },
        onTransitionStart: function(swiper){
            swiper.unlockSwipeToNext();
            
            //$('.swiper-slide').height(sd+'px');  
        },
        onTransitionEnd: function(swiper){
            var url=window.location.href;//获取当前url
            if(url.indexOf("#") > 0){
                url = url.split("#")[0];
            }
            window.location.href= url +'#' + swiper.realIndex;
            if(swiper.realIndex == 6){
                
                $("#year").val($("#pay_year").text().trim().split("年")[0]);
                //alert($("#pay_year").text().trim().split("年")[0]);
                //alert($("#year").val());
            }
            if(swiper.realIndex == 7){
                $("#lv").val($("#lv-ued").text().trim().split("%")[0]);
            }

            if(swiper.realIndex == 10){
                getAllmenoy();
            }
            else if(swiper.realIndex >= 1){
                swiper.lockSwipeToNext();
            }
            
            
            //$('.swiper-slide').height(sd+'px');  
        },
        onSlideChangeStart: function(swiper){
            if(swiper.realIndex == 0){
                mySwiper.lockSwipeToPrev();
                $(".footer").addClass('hide');
            }
            else{
                if(swiper.realIndex == 1){
                    mySwiper.unlockSwipeToNext();
                }
                mySwiper.unlockSwipeToPrev();
                $(".footer").removeClass('hide');
            }
        }
    })

//     if($('#iframepage')){
//        $('#iframepage').parents("body").css({'overflow':'hidden'});
// }


    mySwiper.lockSwipeToPrev();
    setTimeout(function(){
        $(".cir").addClass('cir2');
        $(".cir").css({'-webkit-animation-duration':'8s'})
    },700);

    var f = this,g = document,b = window,m = Math;
    $(".six .cons .programe .btnx")[0].addEventListener('touchstart',function(event){
        var x = event.targetTouches[0].pageX; 
        var l = $(this)[0].offsetLeft;
        var max = $(".six .cons .programe")[0].offsetWidth - $(this)[0].offsetWidth;
        event.preventDefault();
        $(".six .cons .programe .btnx")[0].addEventListener('touchmove',function(event){
            var thisX = event.targetTouches[0].pageX; 
            var to  = m.min(max,m.max(0, l + (thisX - x)));
            $(".six .cons .programe .btnx").animate({'left':to+'px'},0);
            var px = m.round(m.max(0, to/max) * 100);
            $(".six .cons .programe .mxd").width(px + "%");
            $('.six .cons .font_tx').html(m.floor(px / 3.33) + 10 + '年');
            b.getSelection ? b.getSelection().removeAllRanges() : g.selection.empty();
        },false);
        $(".six .cons .programe .btnx")[0].addEventListener('touchend',function(event){
        },false)
       $(".six .cons .programe .btnx")[0].onmouseup=new Function('this.onmousemove=null');
    },false)
 
    $(".seven .cons .programe .btnx")[0].addEventListener('touchstart',function(event){
        var x = event.targetTouches[0].pageX; 
        var l = $(this)[0].offsetLeft;
        var max = $(".seven .cons .programe")[0].offsetWidth - $(this)[0].offsetWidth;
        event.preventDefault();
        $(".seven .cons .programe .btnx")[0].addEventListener('touchmove',function(event){
            var thisX = event.targetTouches[0].pageX; 
            var to  = m.min(max,m.max(0, l + (thisX - x)));
            $(".seven .cons .programe .btnx").animate({'left':to+'px'},0);
            var px = m.round(m.max(0, to/max) * 100);
            $(".seven .cons .programe .mxd").width(px + "%");
            $(".seven .cons .programe .mxd").width(px + "%");
            var xrr = [0.5, 1, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0];
            if(px == 0){
                $('.seven .cons .font_tx').html('0.5%');
            }
            else{
                var mx = xrr[Math.floor(px / 10)];
                if( px >= 100){
                    $('.seven .cons .font_tx').html('5%');
                }
                else{
                    $('.seven .cons .font_tx').html(mx + '%');
                }
            }
            b.getSelection ? b.getSelection().removeAllRanges() : g.selection.empty();
        },false);
        $(".seven .cons .programe .btnx")[0].addEventListener('touchend',function(event){
        },false)
       $(".seven .cons .programe .btnx")[0].onmouseup=new Function('this.onmousemove=null');
    },false)

   
    //男女选择 
    $(".two .btna").click(function(){
        $(this).addClass('on').siblings().removeClass('on');
    })
    //人口选择
    $(".four .btna").click(function(){
        $(this).addClass('on').siblings().removeClass('on');
    })
     $("html,body").css({'overflow':'hidden'});
    //下一步
    for( var i = 0; i< $(".nextBtn").length;i++){
        $(".nextBtn").eq(i)[0].addEventListener('touchstart', function(){
            if($(this).parents('.swiper-slide').index() == 1 || $(this).parents('.swiper-slide').index() == 3){
                if($(this).parents('.swiper-slide').find('.on')[0]){
                    mySwiper.unlockSwipeToNext();
                    mySwiper.slideNext();
                    mySwiper.onTransitionStart(mySwiper);
                }
                else{
                    alert('请选择相关信息');
                }
            }
            else if(Xm($(this).parents('.swiper-slide').index())){
                mySwiper.unlockSwipeToNext();
                mySwiper.slideNext();
                mySwiper.onTransitionStart(mySwiper);
            }
            else{
                alert('请输入相关内容');
            }
            return false;
        },false);
    }
    
    $('input').bind('focus',function(){  
        //$('.footer').css('position','static');  
        //$('.swiper-container').height(sd+'px');  
       
    }).bind('blur',function(){  
        //$('.footer').css({'position':'fixed','bottom':'0'});  
        //$(this).parents('.swiper-slide').height(sd);
        //alert();
    });    
    if(getQueryString('returnAa')){
        localStorage.removeItem('returnAa');
    }
    // document.addEventListener('visibilitychange',function(){
    //         alert(1);
    // },false);
    var url = window.location.href;//获取当前url
    if(url.indexOf("#")>0){
        var toScroll = url.split("#")[1];
        mySwiper.slideTo(toScroll - 1,0,false);
        mySwiper.slideNext();
    }
    // if(document.URL.indexOf("#") == -1){
    //     mySwiper.slideTo(9,0,false);
    //     //pushHistory();
    //     //alert(1);
    // }else{
    //     window.addEventListener("popstate", function(e) { 
    //         //alert('退出');
    //         localStorage.removeItem('returnAa');
    //         if(WeixinJSBridge){
    //             WeixinJSBridge.call('closeWindow');
    //         }
    //         else{   
    //             window.close();
    //         }
    //     }, false);
    // }
    
    // if(localStorage.getItem('returnAa')){
    //     var returnAa = localStorage.getItem('returnAa');
    //     mySwiper.slideTo(returnAa,0,false);
    //     mySwiper.slideNext();
    // }
    // window.addEventListener("popstate", function(e) { 
    //     if(WeixinJSBridge){
    //         WeixinJSBridge.call('closeWindow');
    //     }
    //     else{   
    //         window.close();
    //     }
    // }, false);
    
    // function pushHistory() { 
    //     var state = { 
    //         title: "index", 
    //         url: "#"
    //     }; 
    //     window.history.pushState(state, "index", "#");
    // }
    // $(".btns a").click(function(){
    //     //window.location.href = 'index.html?returnAa=9';
    //     localStorage.setItem('returnAa', '9');
    // })      
      
    //if(getQueryString('returnAa')){
                
   // }else{
        //window.location.href = 'index.html#9'; //返回来的值
   // }  
})
var audio;
document.addEventListener('DOMContentLoaded', function(){
    audio = document.getElementById('bg-music');    
    function audioAutoPlay() {
            audio.play();
            document.addEventListener("WeixinJSBridgeReady", function () {
            audio.play();
        }, false);
    }
    audioAutoPlay();
    $(".normalmusic").addClass("maikecir2");
    $(".normalmusic").click(function(){
        if($(".normalmusic").hasClass("maikecir2")){
            audio.pause();
            $(".normalmusic").removeClass("maikecir2");
        }
        else{
            $(".normalmusic").addClass("maikecir2");
            audio.play();
        }
    })
}, false);

function getQueryString(name) { 
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
    var r = window.location.search.substr(1).match(reg); 
    if (r != null) return unescape(r[2]); return null; 
} 

//判断是否有值
function Xm(i){
    var arr = ['','','date','','pay','pay_year','lv-ued','daikuang','nowmoney','buy'];
    if($("#" + arr[i])[0]){
        if($("#" + arr[i]).val() != undefined && $("#" + arr[i]).val().trim() != ""){
            return true;
        }else if($("#" + arr[i]).text() != undefined && $("#" + arr[i]).text().trim() != ""){
            return true;
        }else{
            return false;
       }
   }else{
        return true;
   }
}

//求补充投保金额
function getAllmenoy(){
    //localStorage.setItem('arr',[]);

    var pay = $("#pay").val(); //每月支出金额 单位: 万元
    var year = $("#year").val();
    //var year = $("#pay_year").text().trim().split('年')[0] //照顾年限
    var lv = $("#lv").val();
    //var lv = $("#lv-ued").text().trim().split('%')[0]; //年利率
    //var lv = "1.5";
    var daikuang = $("#daikuang").val().trim(); //贷款 单位:万元
    var nowmoney = $("#nowmoney").val().trim(); //现有金额 单位:万元
    var buy = $("#buy").val().trim(); //已购买保障额度 单位:万元

    
   // alert(pay+','+year+','+lv+','+daikuang+','+nowmoney+','+buy);

    var xm = ReturnArr(lv,year); //数据表 相对应的数据
    var xpm = parseFloat(pay) * 12 * xm + parseFloat(daikuang * 10000) - parseFloat(nowmoney * 10000) - parseFloat(buy * 10000);
    $(".eleven .comx .title .inputx").text((xpm / 10000).toFixed(2));
    console.log(xpm / 10000);
}


//根据年利率返回相对应的数据表 数据
function ReturnArr(lv,year){
    var arr = {
        '0.5' : 'oneArr',
        '1.0' : 'twoArr',
        '1.5' : 'threeArr',
        '2.0' : 'fourArr',
        '2.5' : 'fivthArr',
        '3.0' : 'sixArr',
        '3.5' : 'sevenArr',
        '4.0' : 'eightArr',
        '4.5' : 'nightArr',
        '5.0' : 'tenArr',
    }
    lv = parseFloat(lv).toFixed(1)
    var lv = arr[lv];
    return eval(lv)[year];
}
//设置url中参数值
function setParam(param,value){
    var query = location.search.substring(1);
    var p = new RegExp("(^|)" + param + "=([^&]*)(|$)");
    if(p.test(query)){
        //query = query.replace(p,"$1="+value);
        var firstParam=query.split(param)[0];
        var secondParam=query.split(param)[1];
        if(secondParam.indexOf("&")>-1){
            var lastPraam=secondParam.split("&")[1];
            return  '?'+firstParam+'&'+param+'='+value+'&'+lastPraam;
        }else{
            if(firstParam){
                return '?'+firstParam+'&'+param+'='+value;
            }else{
                return '?'+param+'='+value;
            }
        }
    }else{
        if(query == ''){
            return '?'+param+'='+value;
        }else{
            return '?'+query+'&'+param+'='+value;
        }
    }    
}