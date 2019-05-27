// pages/meditation/meditation.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    meditationtip: "手脚、全身都放松，闭上眼睛。把注意力集中于呼吸上面，深深地、静静地、缓缓地呼吸，关注自己的每一次呼气和吸气。 冥想可以改变大脑结构，提升我们的思维模式，觉知，与感受。"
  },
smallTip:function(){
  let objModal = {
    show: true,
    title: '冥想小贴士',
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

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
this.timer=this.selectComponent("#timer")
  },
  countDown() {
    this.timer.countDown();
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