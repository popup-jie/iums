	
    function getUrlParam (name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) {
			return decodeURIComponent(r[2]);
		}
		return null;
	}
	
	function getMsgHost(interFace) {
	     var prd = '//pss-esales-msg.pa18.com';
		 var stg = 'https://pss-esales-msg.pa18.com';
		 var dmz = 'https://test1-pss-esales-msg.pa18.com:22181';
		 if (interFace == 'stg') {
		    return stg;
		 } else if (interFace == 'dmz') {
		    return dmz;
		 } else {
		    return prd;
		 }
	}
	
	function getCollectHost(interFace) {
		var prd = "//collect-ela.pa18.com"; //生产
		var stg = "http://pss-esales-collect-stg1.paic.com.cn"; //stg1内网
		var dmz = "https://test-collect.pa18.com:32443";//stg1外网
		if (interFace == "stg") {
			return stg;
		} else if (interFace == "dmz") {
			return dmz;
		} else {
			return prd;
		}
	}
	
	var interFace = getUrlParam("interFace");
	var collectHost = getCollectHost(interFace);
	var msgHost = getMsgHost(interFace);
	// 是否需要支持微信二次转发
	var isWxForward = getUrlParam("isWxForward");
	
	var type = getUrlParam("type");
	var typeNo = getUrlParam("typeNo");
	var title = getUrlParam("wxtitle");
	var desc =  getUrlParam("infoSummary");
	var imgUrl = getUrlParam("imgUrl");
	// 业务员工号
	var agentNo = getUrlParam("agentNo");
	
	// 微信分享链接
	var wxLinkUrl = location.href;
	// 对应微信客户信息
	var openid = getUrlParam("openID");
	// 授权编码
	var authorizeCode = getUrlParam("authorize");
	
	// 父级唯一代码，不传默认为0
	var parentCode = getUrlParam("parentCode");
	// 如果是H5工具中间流程页面进行授权，需要把currentCode放到url中，防止记录阅读时重新插入一条新记录
	var currentCode = getUrlParam("currentCode");
	// 生成微信分享code，为第一次分享做准备
	var shareCode = generateUUID();
	// 是否需要进行微信授权，显式授权E、隐式授权Y、不需要N
	var isWechatAuth = getUrlParam("isWechatAuth");
	
	$(document).ready(function() {
        if (isWeiXin() && isWechatAuth &&　isWechatAuth != 'N' && !authorizeCode && !openid) {
        	// 授权前先去掉url中的openID
        	var urlParam = location.search;
        	if (urlParam && urlParam.indexOf("openID") >= 0) {
        		urlParam = changeURLArg(urlParam, "openID", "");
        		urlParam = urlParam.split("&openID=").join("");
        	}
        	
            // 授权方式
            var authScope = isWechatAuth == 'E' ? 'snsapi_userinfo' : 'snsapi_base';
            window.location.href = msgHost + '/pss-esales-msg/wechat.getCustomerInfo?' +
            // 'scope=snsapi_userinfo' +
            // 'scope=snsapi_base' +
            'scope=' + authScope +
            '&redirectUri=' + encodeURIComponent(encodeURIComponent(location.pathname + urlParam)) +
            '&systemId=ESALES-ELA' +
            '&wechatName=ESALES-ELA' +
            '&refreshTime=86400000';
            return;
        }
        
        // 支持微信二次转发
        if (isWxForward == 'Y') {
        	var param = {'pageUrl' : wxLinkUrl, 'queryFlag' : "Y"};
        	if (interFace == "stg" || interFace == "dmz") {
        		// 测试环境区分渠道，使用自己申请的appID，便于修改域名            
        		param.channel = 'ELA';
        	}
        	
        	//获取签名
        	$.ajax({
        		type: "get",
        		dataType: "jsonp",
        		url: msgHost+"/pss-esales-msg/wechat/accessSignature",
        		data: param,
        		success: function(data) {
        			if (data) {
        				// 初始化微信js
        				initWxConfig(data);
        				// 去掉二次转发链接中的特殊参数
        				replaceUrlArg();
        			}
        		},
        		error : function(){
        			console.log("MicroMessenger access signature failed...");
        		}
        	})	
        }
        
		// 获取currentCode，用来记录阅读层级
		if (!currentCode) {
			currentCode = generateUUID();
		}
		// 记录阅读层级
		recordCurrentLevel(type, typeNo, title, "R");

		// authorizeCode不为空，保存微信客户信息
		if (authorizeCode) {
			queryWxCustomerInfo();
		}
		
        //支持记录阅读总数
        recordcollectCount({
			informationNo:typeNo,
			visitType:"elaInfo"
		});
	})
	
	function initWxConfig(data) {
		//微信接口调用前的配置
		wx.config({
			debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
			appId: data.appid, // 必填，公众号的唯一标识
			timestamp: data.timestamp, // 必填，生成签名的时间戳
			nonceStr: data.noncestr, // 必填，生成签名的随机串
			signature: data.signature,// 必填，签名，见附录1
			jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage']
		});
		
		wx.ready(function(){					
			//分享到朋友圈
			wx.onMenuShareTimeline({
				title: title, // 分享标题
				link: changeURLArg(wxLinkUrl, "parentCode", shareCode), // 分享链接，sharecode是下个页面的parentCode
				imgUrl: imgUrl, // 分享图标
				success: function(){
					// 记录分享记录
					recordCurrentLevel(type, typeNo, title, 'S');
					
					// 重新生成shareCode，防止无法插入分享记录，code是后端唯一索引
					shareCode = generateUUID();
				}
			});	
			
			//分享给朋友
			wx.onMenuShareAppMessage({
				title: title, // 分享标题
				desc: desc, // 分享描述
				link: changeURLArg(wxLinkUrl, "parentCode", shareCode), // 分享链接，sharecode是下个页面的parentCode
				imgUrl: imgUrl, // 分享图标
				success:  function(){
					// 记录分享记录
					recordCurrentLevel(type, typeNo, title, 'S');
					
					// 重新生成shareCode，防止无法插入分享记录，code是后端唯一索引
					shareCode = generateUUID();
				}
			});			
		});
	}
	
	// 记录阅读、分享层级
	function recordCurrentLevel(type, typeNo, typeName, channel) {
		// 没有parentCode，不插入记录
		if (!parentCode) {
			return;
		}
		
		var url = collectHost + "/pss-esales-collect/service/jsonpService/ela/new/lvl/insertNew?" + new Date().getTime(); 
		var param = {
				code : channel == "S" ? shareCode : currentCode, 
				parentCode : parentCode, 
				type       : type, 
				typeNo     : typeNo, 
				typeName   : typeName, 
				channel    : channel, 
				agent      : agentNo, 
				openid     : openid,
				referer    : isWeiXin()?'weixin':''};
		
		replaceNullStr(param);
		$.ajax({
			type: "get",
			dataType: "jsonp",
			url: url,
			data: param,
			success: function(data) {
				
			}
		})
	}
	
	// 过滤空值
	function replaceNullStr(object) {
		if (typeof(object) != "object") {
			return;
		}
		
		$.each(object, function(k, v) {
			if (!v) {
				object[k] = "";
			}
		});
	}
	
	// 生成uuid
	function generateUUID() {
	    var s = [];
	    var hexDigits = "0123456789abcdef";
	    for (var i = 0; i < 36; i++) {
	        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
	    }
	    s[14] = "4"; 
	    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); 
	                                                        
	    s[8] = s[13] = s[18] = s[23] = "-";
	
	    var uuid = s.join("");
	    return uuid;
	}
	
	// 修改url中某个指定的参数的值
	function changeURLArg(url, arg, arg_val) { 
	    var pattern=arg+'=([^&]*)'; 
	    var replaceText=arg+'='+arg_val; 
	    if(url.match(pattern)){ 
	        var tmp='/('+ arg+'=)([^&]*)/gi'; 
	        tmp=url.replace(eval(tmp),replaceText); 
	        return tmp; 
	    }else{ 
	        if(url.match('[\?]')){ 
	            return url+'&'+replaceText; 
	        }else{ 
	            return url+'?'+replaceText; 
	        } 
	    } 
	    return url+'\n'+arg+'\n'+arg_val; 
	}
	
	function replaceUrlArg() {
        // 微信分享出去的链接不能有currentCode
        if (wxLinkUrl.indexOf("currentCode") >= 0) {
        	// currentCode不为空，说明是微信授权后回调进入页面，需要去掉分享链接中的currentCode
        	wxLinkUrl = changeURLArg(wxLinkUrl, "currentCode", "");
        	wxLinkUrl = wxLinkUrl.split("&currentCode=").join("");
        }
        // 微信分享出去的链接不能有openID
        if (wxLinkUrl.indexOf("openID") >= 0) {
        	wxLinkUrl = changeURLArg(wxLinkUrl, "openID", "");
        	wxLinkUrl = wxLinkUrl.split("&openID=").join("");
        }
        // 微信分享出去的链接不能有authorize
        if (wxLinkUrl.indexOf("authorize") >= 0) {
        	wxLinkUrl = changeURLArg(wxLinkUrl, "authorize", "");
        	wxLinkUrl = wxLinkUrl.split("&authorize=").join("");
        }
	}
	
	// 根据授权编码获取客户信息
	function queryWxCustomerInfo() {
	    $.ajax({
	        type : "GET",
	        dataType: "jsonp",
	        url : msgHost + "/pss-esales-msg/wechat.getRedisUserInfo",
	        data : {'authorizeCode': authorizeCode},
	        success: function(data){
	            // 保存客户信息
	        	if (data) {
	        	  getWxCustomerInfo&&getWxCustomerInfo(data);
	        		saveWxCustomerInfo(data);
	        	}
	        },
	        error: function(xhr, type){
	            console.log('Get userInfo from msg fail');
	        }
	    })
	}

	// 保存微信客户信息
	function saveWxCustomerInfo(customerInfo) {
	    $.ajax({
	        type : "GET",
	        dataType: "jsonp",
	        url : collectHost + "/pss-esales-collect/service/jsonpService/ela/new/customer/saveNew",
	        data : customerInfo,
	        success: function(data){
	            console.log("保存客户信息成功");
	        },
	        error: function(xhr, type){
	            console.log('Save userInfo to ela fail');
	        }
	    })
	}
	
	// 是否微信客户端
	function isWeiXin() {
		var ua = window.navigator.userAgent.toLowerCase();
		if (ua.match(/MicroMessenger/i) == "micromessenger") {
			return true;
		} else {
			return false;
		}
	}
	
	//记录阅读总数
	function recordcollectCount(data){
        var param=data;
        var url = collectHost + '/pss-esales-collect/service/jsonpService/ela/new/visit/countNew?'+new Date().getTime();

        $.ajax({
            url : url,
            type : "get",
            data : param,
            dataType : "jsonp",
            success : function(data) {
                console.log("count success.");
            },
            error : function(data){
                console.log("count error.");
            }
        });
    }
	