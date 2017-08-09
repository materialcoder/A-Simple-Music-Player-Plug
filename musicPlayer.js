(function(global) {
	var __INFO__ = {
		plug: "MusicPlay",
		version: "1.0.1",
		author: "ryj"
	}

	// 默认参数
	var defaults = {
		audioUrl: "",
		nodeId: "",
		boxStyle: "",
		buttonSrc: "",
		htmls: `<audio autoplay loop>
					<source src="" type="audio/mpeg">
				</audio>
				<a style="width: 24px; height: 24px;
				background: url(icon.png); background-size: 100% auto; display: inline-block;" href="javascript:;" title="音乐开关"></a>
				<select name="" id="" style="vertical-align: top;">
				</select>`
	};

	var plugCode = function(options) {
		var settings = Object.assign({},defaults,options); //合并对象，ES6语法，浅拷贝

		// 如果没有自定义插入节点，则在body中插入
		var audioDOM = document.getElementById(settings.nodeId);
		if(!audioDOM) {
			audioDOM = document.body;
		}

		// 初始化播放器样式
		var audioBOX = document.createElement("div");
		audioBOX.id = "musiccontrol";
		audioBOX.style="overflow: hidden;position: absolute;z-index: 9999999;" + settings.boxStyle;
		audioBOX.innerHTML = settings.htmls;
		audioDOM.appendChild(audioBOX);

		// 获取节点
		var aduioButton = audioBOX.querySelectorAll("a")[0];
		var audioList = audioBOX.querySelectorAll("select")[0];
		var aduioTag = audioBOX.querySelectorAll("audio")[0];

		// 如果有自定义按钮资源，则显示
		if(settings.buttonSrc) {
			aduioButton.style.backgroundImage = "url(" + settings.buttonSrc + ")";
		}

		
		// 判断传入的文件地址参数（audioUrl）类型[object String] [object Object] [object Array]
		var _urlType = toString.apply(settings.audioUrl);

		// 如果传入的地址参数（audioUrl）是对象类型，将其转化为数组，方便提取数据
		if(_urlType === '[object Object]') {
			var _temp = [];
			_temp.push(settings.audioUrl);
			settings.audioUrl = _temp;
		}
		// 如果没有传入audioUrl，则提示错误
		if(!settings.audioUrl.length) {
			console.log(__INFO__.plug + "因无音乐资源启动失败，请添加音乐资源 audioUrl");
			return;
		}
		// 如果有多个音乐资源，则显示选择栏，否则隐藏选择栏
		if(typeof settings.audioUrl === "object") {
			aduioTag.src = settings.audioUrl[0].source;
			for(var i=0;i<settings.audioUrl.length;i++) {
				var _option = new Option(settings.audioUrl[i].title, settings.audioUrl[i].source);
				audioList.add(_option);
			}
		} else {
			aduioTag.src = settings.audioUrl;
			audioList.style.display = "none";
		}

		// 两个方法：播放和暂停
		var audionFN = {
			play: function(url) {
				if(url) {
					aduioTag.src = url;
				}
				aduioButton.style.backgroundPosition = "0 0";
				aduioTag.play();
			},
			stop: function() {
				aduioButton.style.backgroundPosition = "0 100%";
				aduioTag.pause();
			}
		};

		// 检测设备是在移动端还是PC端
		var _device = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
		var clickEvtName = _device ? "touchstart" : "mousedown";
		var state = true;

		// 播放和暂停
		aduioButton.addEventListener(clickEvtName, function(e) {
			if(state) {
				state = false;
				audionFN.stop();
			} else {
				state = true;
				audionFN.play();
			}
		});

		// 切换歌曲
		audioList.addEventListener("change", function(e) {
			var musicName = this.options[this.selectedIndex].value;
			audionFN.play(musicName);
			state = true;
		});

		// 微信端自动播放
		if(navigator.userAgent.toLowerCase().match(/micromessenger/i)) {
			document.addEventListener("WeixinJSBridgeReady", function onBridgeReady() {
				WeixinJSBridge.invoke("getNetworkType", {}, function(e) {
					audionFN.play();
				});
			})
		}


	};

	global[__INFO__.plug] = plugCode;

})(typeof window !== "undefined" ? window : this);