That's my first programme, I want to do it better
Hello github!
Add my first change!

学习笔记
sitemap.json是是否被微信搜索
project.config.json是项目配置文件，增加了云开发
app.json中增加了底部的两个选择栏，增加了插件，小程序接口权限相关设置，全局自定义组件配置
		希望增加 多个选项栏。优化window
	插件有：腾讯位置服务地图选点，腾讯位置服务路线规划，腾讯位置服务地铁图
		希望增加 位置定位
	权限：地图选点
app.wxss调用了微信UI
		希望增加 一些优化
app.js中增加了云开发，获取位置信息，菜单选项，位置的全局变量
		希望修改 位置信息
style
	weui.wxss是git上微信自己的UI，可以参考调用
static
	image：包含所有的图片文件
		修改：进行分类，图片优化
	local.js：包含所有地理位置
	pyname.js：包含所有的页面选择文字
		修改：仅查看当前，当天的路径，将查询放到更多
	timetable.js：包含所有时间表
		修改：仅显示运行的班车
	util.js：显示当前时间，匹配当前数据
page
	in
libs
	amap-wx.js
	bmap-wx.js
	config.js
	qqmap-wx-jssdk.js
	qqmap-wx-jssdk.min.js
components
	footer
		footer.js
		footer.json
		footer.wxml
		footer.wxss
cloud|当前环境：lwt
		修改 完善云服务的东西，包括免费试用的内容
	getopenid
		config.json
		index.js
		package.json


