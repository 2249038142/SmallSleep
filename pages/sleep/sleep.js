// pages/sleep/sleep.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sleepTimeList: [
      {
        name: "6min",
        imagePath: "/images/flower3.png",
        message: "效率小休 提升效率",
        times: 360
      },
      {
        name: "20min",
        imagePath: "/images/flower1.png",
        message: "放松长休 清醒头脑",
        times: 1200
      },
      {
        name: "40min",
        imagePath: "/images/flower4.png",
        message: "NASA午休 荣光焕发",
        times: 2400
      },
      {
        name: "90min",
        imagePath: "/images/flower2.png",
        message: "完整午休 周期睡眠",
        times: 5400
      },

    ],
    weatherData: '',
    weatherPicPath: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setEnableDebug({
      enableDebug: true
    })
    let that=this
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        console.log(`${latitude},${longitude}`)
        wx.request({
          url: 'https://www.xiaominblog.cn/sleep/public/api/v1/getCityPinyin',
          method: "POST",
          data: {
            location: `${longitude},${latitude}`
          },
          header: {
            'Content-Type': 'application/json'
          },
          success: res => {
            console.log(res.data)
            that.setData({
             weatherData:res.data
            })
            let weatherPic = res.data.weather_data.weather.match(/晴|云|阴|雨|雪|雾|沙/)
            console.log(weatherPic)
            switch (weatherPic[0]) {
              case '晴': that.setData({
                weatherPicPath: '/images/sun.png'
              }); break;
              case '阴': that.setData({
                weatherPicPath: '/images/cloudy.png'
              }); break;
              case '云': that.setData({
                weatherPicPath: '/images/cloudy.png'
              }); break;
              case '雨': that.setData({
                weatherPicPath: '/images/rain.png'
              }); break;
              case '雪': that.setData({
                weatherPicPath: '/images/snow.png'
              }); break;
              case '雾': that.setData({
                weatherPicPath: '/images/fog.png'
              }); break;
              case '沙': that.setData({
                weatherPicPath: '/images/sandstorm.png'
              }); break;
              default: that.setData({
                weatherPicPath: '/images/sun.png'
              }); break;
            }
          }
        })
      }
    })
    
     
    // 新建百度地图对象 
 /*  const BMap = new bmap.BMapWX({
      ak: '0CGkWt5EQovqTUKGN9K0CIEbeOXVl8gN'
    });
    let fail = data => console.log(data);
    let success = data => {
      console.log(data)
      let weatherData = data.currentWeather[0]
      this.setData({
        weatherData2: weatherData
      });
    }
    // 发起weather请求 
    BMap.weather({
      fail: fail,
      success: success
    });
*/
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