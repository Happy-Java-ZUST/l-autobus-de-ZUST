// pages/correct/correct.js
const chooseLocation = requirePlugin('chooseLocation');

Page({

  /**
   * 页面的初始数据
   */
  data: {
   
  },
  correct(){
    const key = 'NRQBZ-HJJ6J-KQ2FH-KHNX2-SDWUS-RABED'; //使用在腾讯位置服务申请的key
  const referer = '浙科行'; //调用插件的app的名称
  const location = JSON.stringify({
    latitude:30.267942,
    longitude: 120.123749
  });
  const category = '生活服务,娱乐休闲';
  
  wx.navigateTo({
    url: `plugin://chooseLocation/index?key=${key}&referer=${referer}&location=${location}&category=${category}`
  });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
    // 从地图选点插件返回后，在页面的onShow生命周期函数中能够调用插件接口，取得选点结果对象
onShow () {
  const location = chooseLocation.getLocation(); // 如果点击确认选点按钮，则返回选点结果对象，否则返回null
  console.log(location)
},


})