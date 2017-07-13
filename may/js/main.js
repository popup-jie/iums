var telphoneNumArr = []; //手机号码;
var sexnum = 1; // 1是男  2是女

function getWxCustomerInfo(data) {
  // alert(data.sex);
  sexnum = data.sex;
  GetSex();
}
var mySwiper = null;
var timer = null // 屏七 时间变量
$(function(){
    var sd = $(window).height();
    document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false); 
    mySwiper = new Swiper ('.swiper-container', {
        direction : 'vertical',
        //history: 'index.html#',
        followFinger : false,
        onInit: function(swiper){
            swiperAnimateCache(swiper); //隐藏动画元素 
            swiperAnimate(swiper); //初始化完成开始动画
        },
        onSlideChangeEnd: function(swiper){
            swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
        },
        onSlideNextStart:function(swiper){
            
            //swiper.lockSwipeToNext();
        },
        onTransitionStart: function(swiper){
            swiper.unlockSwipeToNext();
        },
        onTransitionEnd: function(swiper){
            var url=window.location.href;//获取当前url
            if(url.indexOf("#") > 0){
                url = url.split("#")[0];
            }
            if(swiper.realIndex > 1){
                swiper.lockSwipeToNext();
            }
            window.location.href= url +'#' + swiper.realIndex;
            if(swiper.realIndex == 1){ //当前屏二
                clearTimeout(timer);
                $(".three .three_bg img").removeClass("fadeOutDown");
                $(".three .mine .img1").removeClass('hide');
                $(".three .mine .img2").addClass('hide');
                $(".three .btnx").show()
            }

            if(swiper.realIndex == 2){ //当前屏三
                // $(".three .mine").addClass("boyMine");
                clearTimeout(timer);
                //恢复屏四相关动画
                $('.fouth_one_title img').removeClass('fadeOutLeft');
                $(".fouth_one img").removeClass('fadeOutLeft');
                $('.fouth_two_title img').removeClass('fadeOutRight');
                $(".fouth_two img").removeClass('fadeOutRight');
                $(".fouth .people").removeClass("boyMine");
                $(".fouth .people")[0].style.display = "none";
                $(".fouth .btn").show()
            }
            else if(swiper.realIndex == 3){ //当前屏四
                clearTimeout(timer);
                $(".three .three_bg img").removeClass("fadeOutDown");
                //移除屏三小孩子点头动画
                $(".three .mine .img1").removeClass('hide');
                $(".three .mine .img2").addClass('hide');
                $(".three .btnx").show()

                //恢复屏五相关动画
                $('.fivth_one_title img').removeClass('fadeOutRight');
                $(".fivth_one img").removeClass('fadeOutRight');
                $('.fivth_two_title img').removeClass('fadeOutLeft');
                $(".fivth_two img").removeClass('fadeOutLeft');
                $(".fivth .people")[0].style.display = "none";
                $(".fivth .people").removeClass("boyMine");
                $(".fivth .btn").show()

            }
            else if(swiper.realIndex == 4){ //当前屏五
                clearTimeout(timer);
                //恢复屏四相关动画
                $(".fouth .people").removeClass("boyMine");
                $('.fouth_one_title img').removeClass('fadeOutLeft');
                $(".fouth_one img").removeClass('fadeOutLeft');
                $('.fouth_two_title img').removeClass('fadeOutRight');
                $(".fouth_two img").removeClass('fadeOutRight');
                $(".fouth .people")[0].style.display = "none";
                $(".fouth .btn").show()

            }else if(swiper.realIndex == 5){ //当前屏六

                clearTimeout(timer);
                //恢复屏五相关动画
                $(".fivth .btn").show();
                $('.fivth_one_title img').removeClass('fadeOutRight');
                $(".fivth_one img").removeClass('fadeOutRight');
                $('.fivth_two_title img').removeClass('fadeOutLeft');
                $(".fivth_two img").removeClass('fadeOutLeft');
                $(".fivth .people")[0].style.display = "none";
                $(".fivth .people").removeClass("boyMine");
                //移除屏七数字动画
                $('.seven .input').removeClass('Wm')
                clearTimeout(timer);
            }
            else if(swiper.realIndex == 6) {//当前屏七
                clearTimeout(timer);
                //$('.hand').removeAttr('style');
                timer = setTimeout(function(){
                    $('.seven .input .number').addClass('Wm');
                    sevenFn();
                },1500)
                sendTelphone();
                //移除屏八相关动画
                if(sexnum == 1){
                    $('#eight_boy_three').show()
                }else{
                    $('#eight_girl_three').show()
                }
                if(sexnum == 1){ //操作 男 动画
                    $("#eight_boy_one").removeClass('fadeOutDown');
                    $("#eight_boy_two").find(".eight_boy_bg").hide().parent().removeClass("fadeInUp");
                }else{ //操作 女  动画
                    $("#eight_girl_one").removeClass('fadeOutDown');
                    $("#eight_girl_two").find(".eight_girl_bg").hide().parent().removeClass("fadeInUp");
                }
            }
            else if(swiper.realIndex == 7) {//当前屏八
                clearTimeout(timer);
                $('.seven .input').removeClass('Wm');

            }
            else if(swiper.realIndex == 8) { //当前屏九
                clearTimeout(timer);
                //移除屏八相关动画
                 if(sexnum == 1){
                    $('#eight_boy_three').show()
                }else{
                    $('#eight_girl_three').show()
                }
                if(sexnum == 1){ //操作 男 动画
                    $("#eight_boy_one").removeClass('fadeOutDown');
                    $("#eight_boy_two").find(".eight_boy_bg").hide().parent().removeClass("fadeInUp");
                }else{ //操作 女  动画
                    $("#eight_girl_one").removeClass('fadeOutDown');
                    $("#eight_girl_two").find(".eight_girl_bg").hide().parent().removeClass("fadeInUp");
                }
            }
            
        },
        onSlideChangeStart: function(swiper){
        
        }
    })

    keyUp();

    var url = window.location.href;
    if(url.indexOf("#")>0){
        var toScroll = url.split("#")[1];
        if(toScroll == 0){
            mySwiper.slideTo(toScroll - 1,0,false);
        }else{
            mySwiper.slideTo(toScroll - 1,0,false);
            mySwiper.slideNext();
        }
    }

    //mySwiper.lockSwipeToPrev();
    //mySwiper.slideTo(6, 1000, false);


    // GetSex();



   
});


//屏四飞出动画
function FlyOut_fouth(){
    clearTimeout(timer);
    //fadeOutLeft
    $('.fouth_one_title img').addClass('fadeOutLeft');
    $(".fouth_one img").addClass('fadeOutLeft');
    
    $('.fouth_two_title img').addClass('fadeOutRight');
    $(".fouth_two img").addClass('fadeOutRight');
    $(".fouth .people")[0].style.display = "block";
}

//屏五飞出动画
function FlyOut_fivth(){
    clearTimeout(timer);
    //fadeOutLeft
    $('.fivth_one_title img').addClass('fadeOutRight');
    $(".fivth_one img").addClass('fadeOutRight');
    $('.fivth_two_title img').addClass('fadeOutLeft');
    $(".fivth_two img").addClass('fadeOutLeft');
    $(".fivth .people")[0].style.display = "block";
}

//屏六键盘输入
function keyUp(){
    $(".six .sixPhone div.num").click(function(){
        var xm = $(".six .telephoneNum").text();
        if(xm!="" && xm != null && xm.length >= 11 ){
            return;
        }
        telphoneNumArr.push($(this).text())
        xm += $(this).text();
        $(".six .telephoneNum").text(xm);
        $(".seven .number span").eq(xm.length - 1).text($(this).text());
        $(".six .number div.fonta").hide()
    })

    $(".six .sixPhone .del").click(function(){
        telphoneNumArr.splice(telphoneNumArr.length-1,1);
        $(".six .telephoneNum").text(telphoneNumArr.join(""));
        if(telphoneNumArr.length == 0){
            $(".six .number div").show()
        }
    })
}
//屏七函数
function sevenFn(){
    clearTimeout(timer);
    timer = setTimeout(function(){
        mySwiper.unlockSwipeToNext();
        mySwiper.slideNext();
        mySwiper.lockSwipeToNext();
    },4500)
}
//屏八 男||女 飞出动画
function FlyOut_eight(){
    if(sexnum == 1){ //操作 男 动画
        $("#eight_boy_one").addClass('fadeOutDown');
        $("#eight_boy_two").find(".eight_boy_bg").show().parent().addClass("fadeInUp");
    }else{ //操作 女  动画
        $("#eight_girl_one").addClass('fadeOutDown');
        $("#eight_girl_two").find(".eight_girl_bg").show().parent().addClass("fadeInUp");
    }
    clearTimeout(timer);
    timer = setTimeout(function(){
        mySwiper.unlockSwipeToNext();
        mySwiper.slideNext();
        mySwiper.lockSwipeToNext();
    },3000)
}


//请求地址栏参数。判断男女
function GetSex(){
    


    if(sexnum == 2){
        $("#eight_girl_one").show();
        $("#eight_girl_two").show();
        $("#eight_girl_three").show();

        $("#eight_boy_one").hide();
        $("#eight_boy_two").hide();
        $("#eight_boy_three").hide();
        //alert('女性');
    }else{  //默认都为男性

        $("#eight_girl_one").hide();
        $("#eight_girl_two").hide();
        $("#eight_girl_three").hide();

        $("#eight_boy_one").show();
        $("#eight_boy_two").show();
        $("#eight_boy_three").show();
        //alert('男性');
    }
}
function getQueryString(name) { 
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
    var r = window.location.search.substr(1).match(reg); 
    if (r != null) return unescape(r[2]); return null; 
}
//发送电话号码到数据库
function sendTelphone(){
    

    var orderNo = getQueryString("agentNo");
    var agentNo = getQueryString("agentNo");
    var productName = "tmmdh";
    var productCode = "ksb";
    var insName = getQueryString("insName");
    var insSex = getQueryString("insSex");
    var insAge = getQueryString("insAge");
    var insMobile = telphoneNumArr.join("");
    var documentStatus = "8";
    //var responseTime = getQueryString("documentStatus");
    var source = "ZEB";
    var openid = getQueryString("zebopenid");
    var money = getQueryString("money");

    // 测试环境
    $.getJSON("https://test-collect.pa18.com:32443/pss-esales-collect/service/jsonpService/ela/new/behavior/addNew?orderNo="+orderNo+"&agentNo="+agentNo+"&productName="+productName+"&productCode="+productCode+"&insMobile="+insMobile+"&documentStatus="+documentStatus+"&source="+source+"&callback=?",
    function(json){
        //alert(json);
    });

    // 生产环境
     //$.getJSON("https://collect-ela.pa18.com/pss-esales-collect/service/jsonpService/ela/new/behavior/addNew?orderNo="+orderNo+"&agentNo="+agentNo+"&productName="+productName+"&productCode="+productCode+"&insMobile="+insMobile+"&documentStatus="+documentStatus+"&source="+source+"&callback=?",
     //function(json){

     //});
}

//屏二按钮触发


//屏三按钮触发
$(".three .btnx").click(function(){
    $(".three .btnx").hide()
    $(".three .mine .img1").addClass('hide');
    $(".three .mine .img2").removeClass('hide');
    $(".three .three_bg img").addClass("fadeOutDown");
    clearTimeout(timer);
    timer = setTimeout(function(){
        mySwiper.unlockSwipeToNext();
        mySwiper.slideNext();
        mySwiper.lockSwipeToNext();
    },2500)
})


//屏四按钮触发
$('.fouth .btn').click(function(){
    $(".fouth .btn").hide()
    FlyOut_fouth();
    clearTimeout(timer);
    setTimeout(function(){
        $(".fouth .people").addClass("boyMine");
    },200)
    timer = setTimeout(function(){
        mySwiper.unlockSwipeToNext();
        mySwiper.slideNext();
        mySwiper.lockSwipeToNext();
    },3000)
})

//屏五按钮触发
$('.fivth .btn').click(function(){
    $(".fivth .btn").hide()
    FlyOut_fivth();
    setTimeout(function(){
        $(".fivth .people").addClass("boyMine");
    },200)
    clearTimeout(timer);
    timer = setTimeout(function(){
        mySwiper.unlockSwipeToNext();
        mySwiper.slideNext();
        mySwiper.lockSwipeToNext();
    },2500)
})

//屏六按钮触发
$(".six .btn").click(function(){
    
    var phone = $(".six .number .telephoneNum").text().trim();
    if(!(/^1(3|4|5|7|8)\d{9}$/.test(phone))){ 
        alert('请输入有效的手机号码！'); 
        return false; 
    }
    clearTimeout(timer);
    timer = setTimeout(function(){
        mySwiper.unlockSwipeToNext();
        mySwiper.slideNext();
        mySwiper.lockSwipeToNext();
    },300)
})


//屏八按钮触发
$('.eight .boy_btn').click(function(){
    FlyOut_eight();
    $(this).hide();
})

