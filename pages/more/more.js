// pages/more/more.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    jump(){
      wx.navigateToMiniProgram({
        appId: 'wxd947200f82267e58',
        path: 'pages/wjxqList/wjxqList?activityId=75777492',
        extraData: {
          foo: 'bar'
        },
        
        success(res) {
          console.log("jump to WenJuanXing successfully")
          // 打开成功
        }
      })
    }

  }
})
