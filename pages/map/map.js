// 引入SDK核心类
var QQMapWX = require('../../libs/qqmap-wx-jssdk');
var local = require("../../static/local.js");
//获取上车地点
var latitudes='';
var longitudes='';

// 实例化API核心类
var qqmapsdk = new QQMapWX({
    key: 'NRQBZ-HJJ6J-KQ2FH-KHNX2-SDWUS-RABED' // 必填
});
//在Page({})中使用下列代码
//触发表单提交事件，调用接口
//var latitude=getApp().globalData.latitude;
//var longitude=getApp().globalData.longitude;
Page({
  data:{
    route:'',
    stations:[],
    polyline:[],
    points:[],
    markers:[],
    latitude:0,
    longitude:0,
    time:0,
    starts:'',
    items: [
      {
        title:""
      },
       
    ],
    notice:'',
    bus:'',
    people:0,
  },
  onLoad:function(options){
   
    //get the route now
    console.log(options)
    this.setData({
      route:options.current,
      starts:options.onstart,
      
    })
    //console.log(options.current);
   // console.log(this.data.starts);
    //get user location 
   
    wx.getLocation({
      type: 'gcj02',
      success:(res)=> {
        this.setData({
          latitude:res.latitude,
          longitude:res.longitude,
          
        })
      }
    }) 
    
    this.setData({
      stations:String(this.data.route).split("——"),
      
    })
    var _this=this;
    var markers=[];
    _this.setData({
      bus:_this.data.stations[_this.data.stations.length-1]
    })
    
    for(var i=0;i<_this.data.stations.length-1;i++){

      var strJSON=local.data[_this.data.stations[i]]
      _this.data.points.push({
        latitude:strJSON.latitude,
        longitude:strJSON.longitude
      })
      markers.push({
        id:i,
        latitude:strJSON.latitude,
        longitude:strJSON.longitude,
        
        width:40,
        height:40,
        iconPath:markers.png,
        callout:{
        
          content:_this.data.stations[i],
          display:'ALWAYS',
          borderRadius:20,
          fontSize:15,
          padding:2,
          anchorX:10,
          anchorY:10,
          textAlign:"center"

        }
      })
    }
    this.setData({
      markers:markers,
      polyline:[{
        points: _this.data.points,
        color: "#0091ff",
        width: 3,
      }],
    })
 console.log(this.data.markers)
 //console.log(typeof(this.data.markers))
 //console.log(this.data.markers[0].latitude)
 latitudes=this.data.markers[0].latitude;
 longitudes=this.data.markers[0].longitude
 qqmapsdk.calculateDistance({
   mode:'driving',
   from:'30.322399,120.151138',
   to:'30.21986,120.025139',
   success:function(res){
     console.log(res.elements)
   }
 })
/* this.setData({ 
  items: [ 
    { title: "本车路线：{{route}}" },
  ]
})*/ 
this.autoChangeX();
  
},
onReady: function () {
  if(this.data.bus=="（大客1辆）"){
    this.setData({
     people:"54人"
    })
   }else if(this.data.bus=="（中客1辆）"){
    this.setData({
      people:"38人"
    })
    }else{
      this.setData({
        people:"至少可以乘坐38人"
      })

     }
},
autoChangeX: function () {
    // 定义初始第一条的内容
    let index = 0;
    const {items} = this.data;
    this.setData({
      notice:this.data.route
    })
    index++;
    // 设置定时器，和动画时间间隔相等
    // 每隔20秒更换X轴公告的内容
    setInterval(() => {
      if (index === items.length - 1) {
        this.setData({
          notice:this.data.route
        })
        index = 0;
      } else {
        this.setData({
          notice: this.data.route
        })
        index++;
      }
    }, 1000*20)
  },

 /* findway(){
let plugin = requirePlugin('routePlan');
let key = 'NRQBZ-HJJ6J-KQ2FH-KHNX2-SDWUS-RABED';  //使用在腾讯位置服务申请的key
let referer = '浙科行';   //调用插件的app的名称
let endPoint = JSON.stringify({  //终点
    'name': '浙江科技学院',
    'latitude': 30.21871041514441,
    'longitude': 120.02810015875244
});
wx.navigateTo({
    url: 'plugin://routePlan/index?key=' + key + '&referer=' + referer + '&endPoint=' + endPoint
});
  },*/
  subway(){
    let plugin = requirePlugin("subway");
    let key = 'NRQBZ-HJJ6J-KQ2FH-KHNX2-SDWUS-RABED';  //使用在腾讯位置服务申请的key
    let referer = '浙科行';   //调用插件的app的名称
wx.navigateTo({
 url: 'plugin://subway/index?key=' + key + '&referer=' + referer
});
  },
  //
  findStation(){  
    let plugin = requirePlugin('routePlan');
    let key = 'NRQBZ-HJJ6J-KQ2FH-KHNX2-SDWUS-RABED';  //使用在腾讯位置服务申请的key
    let referer = '浙科行';   //调用插件的app的名称
    let endPoint = JSON.stringify({  //上车点
        'name': this.data.starts,
        'latitude':latitudes,
        'longitude':longitudes
    });
    wx.navigateTo({
        url: 'plugin://routePlan/index?key=' + key + '&referer=' + referer + '&endPoint=' + endPoint
    });
      
  }


})