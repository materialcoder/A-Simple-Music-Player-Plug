# A-Simple-Music-Player-Plug 
一个极简音乐播放插件 

## 它能做到什么？ 

---------------------- 

1.可控制音乐状态（播放、暂停） 

2.灵活的音乐资源配置（单个、多个） 

3.自动音乐列表（无选择列表、有列表） 

4.可指定播放器所在容器（元素、页面） 

5.可指定播放器所在容器位置（顶、左、右、下） 

6.可自动加载音乐资源并自动播放（浏览器、微信） 

7.可自定义皮肤（按钮、列表） 

8.极简小巧（无图片资源、无CSS样式文件加载） 

9.更友好的用户体验（手机、PC） 


## 怎么去使用它？ 
-------------------------  

1.单个音乐 
	
```javascript
MusicPlay({audioUrl:"music/xxx.mp3"});
MusicPlay({audioUrl: {title:"xxxxx", source:"music/xxx.mp3"}});
```

2.多个音乐 
	
```javascript
MusicPlay({
audioUrl:[
	{title:"xxxxx", source:"music/xxx.mp3"}, 
	{title:"xxxxx2", source:"music/xxx2.mp3"}
	]
});
```

3.指定节点 
	
```javascript
MusicPlay({
	nodeId: "dntest",
	audioUrl:"music/xxx.mp3"
});
```

4.指定位置 
	
```javascript
MusicPlay({
	boxStyle: "top: 10px; left: 20px; opacity: 0.5;",
	audioUrl:"music/xxx.mp3"
});
```

5.修改皮肤 

按钮图（宽高比：1:2） 
	
```javascript
MusicPlay({
	buttonSrc: "icon.png",
	audioUrl:"music/xxx.mp3"
});
```

播放器 
	
```javascript
MusicPlay({
	htmls: "<div>.........<div>",
	audioUrl:"music/xxx.mp3"
});
```
