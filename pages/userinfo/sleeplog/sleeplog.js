// pages/userinfo/sleeplog/sleeplog.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    attributeName: true,
    thatday: "",
    meditationTime: "",
    restTime: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    console.log(options.attributeName)
    let attributeName = options.attributeName === "false" ? false : true
    let timeLogUrl = attributeName ? 'http://www.xinyewangluo.xin/public/api/v1/getsleep' :'http://www.xinyewangluo.xin/public/api/v1/getthink'
   
    this.setData({
      attributeName: attributeName
    })
    wx.request({
      url: timeLogUrl,
      method: "get",
      header: {
        'Content-Type': 'application/json',
        'Token': wx.getStorageSync('userToken')
      },
      success: res => {
        console.log(res)
       /* for (let realTime of res.data){
          console.log(realTime)
        }*/
        this.setData({
          timeList:res.data
        })
        wx.hideLoading()
      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */


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