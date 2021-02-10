//index.js
//获取应用实例
const app = getApp()
//var longitude=getApp().globaldata.longtitude
//var latitude=getApp().globaldata.latitude
//get local data
var timeTable = require("../../static/timetable.js").data;
var pyName = require("../../static/pyname.js").data;

//util
var util = require("../../static/util.js");
//build the page
Page({
  data: {
    // userinfo
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    pickerDepart: "市区",
    pickerDestin: "小和山",
    week: "？",
    pickerWeek: "工作日",
    // picker
    multiArray: [
      ['工作日', '周六', '周日', '节假日'],
      ['市区', '小和山', '安吉'],
      ['小和山']
    ],
    multiIndex: [0, 0, 0],
    when: "?",
    timeList: {},
    //routes:''
  },

  bindMultiPickerChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)

    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex,

      timeList: this.data.timeList,
      currentLoca: this.data.currentLoca,
      pickerDepart: this.data.pickerDepart,
      pickerDestin: this.data.pickerDestin,
      pickerWeek: this.data.pickerWeek,

      when: "",
      background: "/static/image/block. jpg",

    };

    // update picker display
    data.pickerWeek = data.multiArray[0][data.multiIndex[0]];
    data.pickerDepart = data.multiArray[1][data.multiIndex[1]];
    data.pickerDestin = data.multiArray[2][data.multiIndex[2]];

    // update timelist
    data.timeList = timeTable[pyName[data.multiArray[0][data.multiIndex[0]]]][pyName[data.multiArray[1][data.multiIndex[1]]]][pyName[data.multiArray[2][data.multiIndex[2]]]];
    let result = util.update_next(data.timeList);
    data.when = result.when;
    // update currentLoca
    data.multiIndex = e.detail.value;

    this.setData(data);
  },
  bindMultiPickerColumnChange: function (e) {
    // console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    // data dic for update
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };

    // update multiIndex
    data.multiIndex[e.detail.column] = e.detail.value;

    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex[0]) {
          case 0:
            data.multiArray[1] = ['市区', '小和山', '安吉'];
            data.multiArray[2] = ['小和山'];
            break;
          case 1:
            data.multiArray[1] = ['市区', '小和山','安吉'];
            data.multiArray[2] = ['小和山','安吉'];
            break;
          case 2:
            data.multiArray[1] = ['市区', '小和山','安吉'];
            data.multiArray[2] = ['小和山','安吉'];
            break;
          case 3:
            data.multiArray[1] = ['安吉','市区'];
            data.multiArray[2] = ['市区'];
            break;
        }
        data.multiIndex[1] = 0;
        data.multiIndex[2] = 0;
        break;
      case 1:
        switch (data.multiIndex[0]) {
          case 0:
            switch (data.multiIndex[1]) {
              case 0:
                data.multiArray[2] = ['小和山'];
                break;
              case 1:
                data.multiArray[2] = ['市区', '安吉'];
                break;
              case 2:
                data.multiArray[2] = ['小和山','市区'];
                break;
            }
            break;
          case 1:
            switch (data.multiIndex[1]) {
              case 0:
               
                data.multiArray[2] = ['小和山','安吉'];
                
                break;
              case 1:
                data.multiArray[2] = ['市区'];
                break;
              case 2:
                data.multiArray[2]=['市区'];
            }
            break;
          case 2:
            switch (data.multiIndex[1]) {
              case 0:
                data.multiArray[2] = ['小和山','安吉'];
                break;
              case 1:
                data.multiArray[2] = ['市区'];
                break;
              case 2:
                data.multiArray[2]=['市区'];
            }
            break;
          case 3:
            switch (data.multiIndex[1]) {
              case 0:
                data.multiArray[2] = ['市区'];
                break;
              case 1:
                data.multiArray[2] = ['安吉'];
                break;
            }
            break;
        }
        data.multiIndex[2] = 0;
        break;
    }

    // update data
    this.setData(data);
  },

  getMap(e) {
   console.log(e)
    var route = e.currentTarget.dataset.timerow["site"]
    var starting=e.currentTarget.dataset.timerow["start"]
    
   /* this.setData({
      routes:route
    })*/
   // console.log(starting)
    wx.navigateTo({
      url: '../map/map?current=' + route +'&onstart='+starting
    })

  },
  onLoad: function (e) {
    console.log(e.title)
    this.setData({ 
      msgList: [ 
        { url: "url", title: "公告：浙科校车小程序还在整改，目前部分" },
        { url: "url", title: "定位还在完善中.....，建议前往上车地点前" }, 
        { url: "url", title: "询问下老师！另外部分起始点为市区，即是小和" }, 
        { url: "url", title: "山校区门口，请广大师生在进行比对后再确认" }, 
      {url:"url",title:"上车地点！"}] 
    }) 
    wx.getLocation({
      type: 'gcj02',
      success:(res)=> {
          this.latitude=res.latitude
          this.longitude=res.longitude
              
      }
    }) 
    wx.getNetworkType({
      success(res) {
        let networkType = res.subtype || res.networkType;
        if (networkType == "none") {
          wx.showToast({
            title: '无网络连接',
            icon: 'loading',
            duration: 2000
          })
        } else {
          wx.showToast({
            title: '加载中',
            icon: 'loading',
            duration: 2000
          })
        }
      }
    })

    // basic update
    //刷新时间
    //获取当前日期
    let time = util.formatDate(new Date());
    //获取当前日期对应的星期
    let today = util.dateLater(time, 0);
    //let timePicker = util.timePicker(today.week)
    //console.log(today)
    //每秒刷新日期
    setInterval(() => {
      this.setData({
        week: today.week,
      })
    }, 1000)
    let week = this.data.week
    let pickerWeek;
    let multiIndex = this.data.multiIndex;
    if (week == "周六") {
      pickerWeek = "周六";
      multiIndex[0] = 1;
    } else if (week == "周日") {
      pickerWeek = "周日";
      multiIndex[0] = 2;
    } else {
      pickerWeek = "工作日";
      multiIndex[0] = 0;
    }
    let timeList = timeTable[pyName[pickerWeek]][pyName[this.data.pickerDepart]][pyName[this.data.pickerDestin]];
    let result = util.update_next(timeList);
    this.setData({
      week: week,
      pickerWeek: pickerWeek,
      timeList: timeList,
      multiIndex: multiIndex,
      when: result.when
    })
    console.log(this.data.timeList)

    wx.onNetworkStatusChange(function (res) {
      if (res.isConnected === false) {
        wx.showToast({
          title: '无网络连接',
          icon: 'loading',
          duration: 2000
        })
      } else {
        wx.showToast({
          title: '加载中',
          icon: 'loading',
          duration: 2000
        })
      }
    })
  },
 
})
/*module.exports = {
  data: routes
};*/