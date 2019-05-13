// component/timer.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    increase:{
      type:Boolean,
      value:false
    },
    times:{
      type:Number,
      value:0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isStart:false,
    times:0,
    minute:0,
    second:0,
    leftDeg: 45,
    rightDeg: -45,
    log:{}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    countDown: function (event) {
      let isStart = this.data.isStart
       let [M,S]=[0,0]
      let times = this.data.times//获取倒计时初始值
      let halfTime = this.data.times / 2
      let todayT=new Date().toLocaleDateString()
      this.setData({
        isStart: !isStart
      })
      if(!isStart){
      if (this.properties.increase) {
      this.timer= setInterval( ()=> {
          times++
           M = Math.floor(times / 60) 
           S = Math.floor(times) % 60
        this.setData({
          endTime: times,
          minute: M,
          second:S
        })
        },1000)
        } else {
        this.timer= setInterval( () =>{
          times--
          if (times > halfTime) {
            this.setData({
              leftDeg: this.data.leftDeg -360/this.data.times 
            })
          } else {
            this.setData({
              leftDeg: -135,
              rightDeg: this.data.rightDeg - 360 / this.data.times 
            })
          }
          M = Math.floor(times / 60) 
          S = Math.floor(times) % 60
          this.setData({
            endTime:times,
            minute: M,
            second: S})
          if (times == 0) {
            clearInterval(this.timer)
          }
         } , 1000)}
      }else{
        this.setData({
          leftDeg: 45,
          rightDeg: -45
        })
        clearInterval(this.timer)
        this.data.log = {
          name: this.properties.increase,
          keepTime: Math.abs(this.data.endTime-times),
          today: todayT
        }
        console.log(this.data.log)
        this.saveLog(this.data.log)
      }
    },
    saveLog: function (log) {
      let logsTime = wx.getStorageSync('logsTime') || []
      logsTime.unshift(log)
      wx.setStorageSync('logsTime', logsTime)
      console.log(logsTime)
    }
  }
})
