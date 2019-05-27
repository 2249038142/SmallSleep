// pages/fallIn/fallIn.js
Page({
  

  /**
   * 页面的初始数据
   */
  data: {
    meditationtip1:" 休息可以分很多形式，其中睡眠是最重要的投资。时间充裕的人往往能获得更多幸福感。请闭起眼睛，全神贯注地听你喜欢的音乐。",
    meditationtip2: " Stress is not the problem. The problem is lack of recovery.",
    increase:false,
    isStart: false,
    times: 0,
    minute: 0,
    second: 0,
    leftDeg: 45,
    rightDeg: -45,
    log: {}
  },
  smallTip: function () {
    let objModal = {
      show: true,
      title: '歇息小贴士',
      showCancel: false,
      height: '50%',
      confirmText: '知道啦'
    }
    this.setData({
      modal3: objModal
    })
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