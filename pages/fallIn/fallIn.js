// pages/fallIn/fallIn.js
Page({
  
 /* properties: {
    increase: {
      type: Boolean,
      value: false
    },
  },*/
  /**
   * 页面的初始数据
   */
  data: {
    increase:false,
    isStart: false,
    times: 0,
    minute: 0,
    second: 0,
    leftDeg: 45,
    rightDeg: -45,
    log: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let minutes = Math.floor(options.times / 60)
    let inc = options.increase === "false" ? false : true
    if (inc === false) {
      this.setData({
        times: options.times,
        increase: inc,
        minute: minutes,
      })
      }
  },
 
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