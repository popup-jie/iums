(function($, doc) {
	$.init();
	$.ready(function() {
   		//类型
   		if(Zepto('#types')[0]){
			var userPicker = new $.PopPicker();
		    userPicker.setData([{
		   		value: '川菜',
		   		text: '川菜'
		   	}, {
		   		value: '四川菜',
		   		text: '四川菜'
		  	}, {
			   	value: '零食',
			   	text: '零食'
		   	}, {
		   		value: '服装',
		   		text: '服装'
		   	}, {
		   		value: '鞋子',
		   		text: '鞋子'
		   	}, {
		   		value: '皮包',
		   		text: '皮包'
		   	}, {
		   		value: '化妆品',
		   		text: '化妆品'
		   	}, {
		   		value: '护肤品',
		  		 text: '护肤品'
		   	}, {
		  		value: '日用品',
		   		text: '日用品'
		   	}, {
		   		value: '母婴', 
		   		text: '母婴'
		   	}, {
		   		value: '生活用品', 
		   		text: '生活用品'
		   	}]);
			var showUserPickerButton = Zepto('#types');
			showUserPickerButton[0].addEventListener('tap', function(event) {
				userPicker.show(function(items) {
		    		showUserPickerButton.find("input").val(items[0].text)
				    //返回 false 可以阻止选择框的关闭
				    //return false;
		   		});
			}, false);
		}

		//营业时间
		//layer: 2
		if(Zepto('#userTime')[0]){
			var userTime = new $.PopPicker({});
		    userTime.setData([{
		   		value: '全年无休',
		   		text: '全年无休'
		   	}, {
		   		value: '法定节假日除外',
		   		text: '法定节假日除外'
		  	}, {
			   	value: '周末除外',
			   	text: '周末除外'
		   	}])
			var userTimeButton = Zepto('#userTime');
			userTimeButton[0].addEventListener('tap', function(event) {
				userTime.show(function(items) {
		    		userTimeButton.find("input").val(items[0].text)
				    //返回 false 可以阻止选择框的关闭
				    //return false;
		   		});
			}, false);
		}
		//折扣价
		//layer: 2
		if(Zepto('#zhekou')[0]){
			var zhekou = new $.PopPicker({});
		    zhekou.setData([{
		   		value: '9折',
		   		text: '9折'
		   	}, {
		   		value: '8.5折',
		   		text: '8.5折'
		  	}, {
			   	value: '8折',
			   	text: '8折'
		   	}])
			var zhekouButton = Zepto('#zhekou');
			zhekouButton[0].addEventListener('tap', function(event) {
				zhekou.show(function(items) {
		    		zhekouButton.find("input").val(items[0].text)
				    //返回 false 可以阻止选择框的关闭
				    //return false;
		   		});
			}, false);
		}

		//选择级别
		//layer: 2
		if(Zepto('#chooseAp')[0]){
			var chooseAp = new $.PopPicker({});
		    chooseAp.setData([{
		   		value: '一级',
		   		text: '一级'
		   	}, {
		   		value: '二级',
		   		text: '二级'
		  	}, {
			   	value: '三级',
			   	text: '三级'
		   	}])
			var chooseApButton = Zepto('#chooseAp');
			chooseApButton[0].addEventListener('tap', function(event) {
				chooseAp.show(function(items) {
		    		chooseApButton.find("input").val(items[0].text)
				    //返回 false 可以阻止选择框的关闭
				    //return false;
		   		});
			}, false);
		}
	});
})(mui, document);
