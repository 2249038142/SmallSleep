// pages/sleep/sleep.js
const bmap = require('../../libs/bmap-wx.js'); 
Page({

  /**
   * 页面的初始数据
   */
  data: {
sleepTimeList:[
{
  name:"效率小休",
  imagePath:"/images/10min.png",
  message:"提升效率",
  times:360
},
  {
    name: "放松长休",
    imagePath: "/images/24min.png",
    message: "精神焕发",
    times: 1200
  },
  {
    name: "NASA午休",
    imagePath: "/images/25min.png",
    message: "下午心神好",
    times: 2400
  },
  {
    name: "完整午休",
    imagePath: "/images/90min.png",
    message: "周期睡眠",
    times: 5400
  },

],
    weatherData: '',
    weatherPicPath:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     
      // 新建百度地图对象 
      const BMap = new bmap.BMapWX({
        ak: '0CGkWt5EQovqTUKGN9K0CIEbeOXVl8gN'
      });
      let fail = data=>  console.log(data);
      let success = data=> {
        console.log(data)
        let weatherData = data.currentWeather[0]
        this.setData({
          weatherData: weatherData
        });
    
       let weatherPic = weatherData.weatherDesc.match(/晴|阴|雨|雪|雾|沙/)
console.log(weatherPic)
switch(weatherPic[0]){
  case '晴': this.setData({
    weatherPicPath: '/images/sun.png'
  }); break;
  case '阴': this.setData({
    weatherPicPath: '/images/cloudy.png'
  }); break;
  case '雨': this.setData({
    weatherPicPath: '/images/rain.png'
  }); break;
  case '雪': this.setData({
    weatherPicPath: '/images/snow.png'
  }); break;
  case '雾': this.setData({
    weatherPicPath: '/images/fog.png'
  }); break;
  case '沙': this.setData({
    weatherPicPath: '/images/sandstorm.png'
  }); break;
  default: this.setData({
    weatherPicPath: '/images/sun.png'
  }); break;
}
      }
      // 发起weather请求 
      BMap.weather({
        fail: fail,
        success: success
      }); 
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})