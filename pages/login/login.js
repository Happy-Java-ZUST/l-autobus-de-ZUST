Page({

  data:{
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

  },
 onLoad: function(options) {
   var that = this;
   //查看是否授权
  /* wx.getSetting({
     success: function(res) {
       if (res.authSetting['scope.userInfo']) {
         console.log("用户授权了");
       } else {
         //用户没有授权
         console.log("用户没有授权");
       }
      }
   });*/
   wx.getSetting({
    success(res) {
      if (!res.authSetting['scope.userInfo']) {
        wx.authorize({
          scope: 'scope.userInfo',
          success() {
            // 用户已经同意小程序使用用户信息
            wx.getUserInfo()
          }
        })
      }
      if (!res.authSetting['scope.userLocation']) {
        wx.authorize({
          scope: 'scope.userLocation',
          success() {
            // 用户已经同意小程序使用地理位置
            wx.getLocation()
            wx.chooseLocation()
          }
        })
      }
      if (!res.authSetting['scope.userLocationBackground']) {
        wx.authorize({
          scope: 'scope.userLocationBackground',
          success() {
            // 用户已经同意小程序后台定位
            wx.startLocationUpdateBackground()
          }
        })
      }
    }
  })
  },
bindGetUserInfo: function(res) {
  if (res.detail.userInfo) {
     //用户按了允许授权按钮
     var that = this;
     // 获取到用户的信息了，打印到控制台上看下
     console.log("用户的信息如下：");
     console.log(res.detail.userInfo);
     //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
     that.setData({
       isHide: false
      });
      wx.switchTab({
        url: '/pages/index/index',
      })
    } else {
      //用户按了拒绝按钮
     wx.showModal({
       title: '警告',
       content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
       showCancel: false,
       confirmText: '返回授权',
       success: function(res) {
         // 用户没有授权成功，不需要改变 isHide 的值
         if (res.confirm) {
           console.log('用户点击了“返回授权”');
          }
        }
      });
    }
  }
})
