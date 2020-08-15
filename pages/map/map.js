// 引入SDK核心类
var QQMapWX = require('../../libs/qqmap-wx-jssdk');
var local = require("../../static/local.js");
// 实例化API核心类
var qqmapsdk = new QQMapWX({
    key: 'NRQBZ-HJJ6J-KQ2FH-KHNX2-SDWUS-RABED' // 必填
});
//在Page({})中使用下列代码
//触发表单提交事件，调用接口
Page({

  

  data:{
    route:'学院东路——古荡公交站（天目山路）——古荡——香樟——康乐——府新——周家村——留下——茶楼旁（大客1辆）',
    stations:[],
    polyline:[],
    points:[],
    
  },
  onLoad:function(options){
    //get the route now
  /* this.setData({
     route:options.current
   }) */
   this.setData({
     stations:String(this.data.route).split("——")
    })
    console.log(JSON.parse(local.data[this.data.stations[0]]))
    var _this=this;
    for(var i=0;i<_this.data.stations.length;i++){
      var place=JSON.parse(local.data[_this.data.station[i]])
      console.log(place)
      _this.data.points.push({
        longitude: parseFloat(place.longitude),
        latitude: parseFloat(place.latitude)
      })
    }
    console.log(this.data.points)
 
    /*//将地址分两次请求
    var that=this;
    for(var i=0;i<5;i++){
      this.formSubmit(i)
    }
    setTimeout(function () {
      for(var i=5;i<that.data.stations.length;i++){
        that.formSubmit(i)
      }
     }, 1200)*/
  },

  //触发表单提交事件，调用接口
formSubmit(i) {
  var _this = this;
 // console.log(_this.data.points)
  //调用地址解析接口
  qqmapsdk.geocoder({
    //获取表单传入地址
    address: "浙江省杭州市西湖区"+_this.data.stations[i], //地址参数，例：固定地址，address: '北京市海淀区彩和坊路海淀西大街74号'
    success: function(res) {//成功后的回调
    //  console.log(res);
      var res = res.result;
      var latitude = res.location.lat;
      var longitude = res.location.lng;
        _this.data.points.push({
          longitude: parseFloat(longitude),
          latitude: parseFloat(latitude)
        })
      //根据地址解析在地图上标记解析地址位置
      _this.setData({ // 获取返回结果，放到markers及poi中，并在地图展示
        poi: { //根据自己data数据设置相应的地图中心坐标变量名称
          latitude: latitude,
          longitude: longitude
        },
        polyline:[{
          points: _this.data.points,
          color: "#0091ff",
          width: 6
        }]
      });
    },
    fail: function(error) {
      console.error(error);
    },
   
  })
},



})