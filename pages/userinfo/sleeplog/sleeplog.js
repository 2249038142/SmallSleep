// pages/userinfo/sleeplog/sleeplog.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    attributeName:true,
thatday:"",
meditationTime:"",
restTime:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.attributeName)
    let attributeName = options.attributeName === "false" ? false :true 
    console.log(attributeName)
  this.setData({
    attributeName: attributeName
  })
    
    wx.request({
      url: 'http://129.204.63.87/sleep/public/api/v1/getrecord',
      method: "get",
      header: {
        'Content-Type': 'application/json',
        'Token': wx.getStorageSync('userToken')
      },
      success: res => {
console.log(res)
    Object.keys(res.data).forEach((index)=>{
      console.log(res.data[index]) 
  this.setData({
    timeList: res.data[0].data
    })
    })
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