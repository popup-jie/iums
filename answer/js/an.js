var letter_count={
	A:0,
	B:0,
	C:0,
	D:0,
	E:0,
	F:0,
	G:0,
	H:0,
}
var letter_arr=[];
var counts=[];//分数
var page=0;
$(function(){
var mySwiper = new Swiper('.swiper-container', {
	onSlideNextEnd: function(swiper){
		var px = Math.round(Math.max(0, (swiper.realIndex+1) *8.3));
      	$(".pbar").css("width",px +"%");
      	$(".pbar_bq").text(swiper.realIndex+1);
      	if(swiper.realIndex==11){
			$(".an-sub img").attr("src","img/an-sub.png");
			$(".an-sub").attr("id","an-sub");

      	}
    },
    onSlidePrevEnd: function(swiper){
    	$(".an-sub img").attr("src","img/an-next.png");
    	$(".an-sub").removeAttr("id","an-sub");
	    letter_arr.splice(letter_arr.length-1,1);
	    counts.splice(counts.length-1,1);
	    page--;
	    var px = Math.round(Math.max(0, (swiper.realIndex+1) *8.3));
      	$(".pbar").css("width",px +"%");
      	$(".pbar_bq").text(swiper.realIndex+1);
    }


})

$(".an_con_select ul li").click(function(){
	$(this).addClass("active").siblings().removeClass("active");
})
mySwiper.lockSwipeToNext();
$(".an-sub").click(function(){
	var act=$('.an_con_select ul li.active').eq(page);
	if(act==""||act==undefined||act.length==0){
		alert("此题尚未作答");
	}
	else{
	if(page!=11){
	var info=act.data("info");
	var trues=act.data("trues")==undefined?0:act.data("trues");
	$(".an-sub").attr("id",page+1);
	letter_arr.push(info);
	counts.push(trues);
	console.log(counts);
	mySwiper.unlockSwipeToNext();
	mySwiper.slideNext();
	mySwiper.lockSwipeToNext();
	console.log(page);
	page++;
		}
	else{
		var c=jiesuang(); //结算
		var ca=fx();
		window.location.href="result.html?score="+ca+"&pageStatus="+c;
	}
	}
})



function jiesuang(){//结算
	for(var i=0;i<letter_arr.length;i++){
		letter_count[letter_arr[i]]++;
	}
	var count =rand(letter_count);
	return count;
}
	function rand(obj){
		var temp = [];
		for(var j in obj){
			temp.push([j, obj[j]]);
		}
		var temx = [ [temp[0][0],temp[0][1]] ];
		var tp = null;
		for(var j = 0; j < temp.length; j++){
			if(temp.length - 1 > j){
				if(temx[0][1] < temp[j + 1][1]){ // 最大值
					temx.splice(0, temx.length-1);
					temx[0][1] = temp[j + 1][1];
				}else{ //永远相同的
					if(temx[0][1] === temp[j + 1][1]){
						temx.push([temp[j + 1][0],temp[j + 1][1]]);
					}
				}
			}
		}		
		function round(){
			var xm = Math.abs(Math.round(Math.random() * (temx.length - 1)));
			return xm;
		}	
		return temx[round()][0];
	}
	function fx(){ //分数计算
		var ca=0;
		for(var i=0;i<counts.length;i++){
			ca=ca+counts[i];
		}

		return ca<30?30:ca;

	}
})