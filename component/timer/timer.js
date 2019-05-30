// component/timer.js
const backgroundAudioManager = wx.createInnerAudioContext()
backgroundAudioManager.autoplay = false
backgroundAudioManager.loop = true
let voiceCP = backgroundAudioManager.volume
let [startTime, endTime] = [0, 0]
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    increase: {
      type: Boolean,
      value: false
    },
    times: {
      type: Number,
      value: 0
    },
    minute: {
      type: Number
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    voicePath: "/images/icon/voice-open.png",
    modal: {},
    resttext: "休息结束时间未到哦，如果休息好了那就继续工作吧！",
    finishtext: "",
    beforeKeepTime: 0,
    bgms: [
      {
        name: "乡间漫步",
        imageClass: ".bg2",
        backgroudSound: "http://music.163.com/song/media/outer/url?id=1325545439.mp3"
      }, 
      {
        name: "风吹金麦",
        imageClass: ".bg1",
      backgroudSound: "http://music.163.com/song/media/outer/url?id=1306896463.mp3"
      },
     {
        name: "夜雨禅修",
        imageClass: ".bg3",
        backgroudSound: "http://music.163.com/song/media/outer/url?id=1310317459.mp3"
      },
      {
        name: "海鸥湖岸",
        imageClass: ".bg4",
        backgroudSound: "http://music.163.com/song/media/outer/url?id=1325545440.mp3"
      },

    ],
    isStart: false,
    second: 0,
    leftDeg: 45,
    rightDeg: -45,
    log: {}
  },



  attached() {
    let bsound = this.data.bgms[0].backgroudSound
    backgroundAudioManager.title = this.data.bgms[0].name
    backgroundAudioManager.src = bsound
  },
  pageLifetimes: {
    show: function() {
      // 页面被展示
      this.setData({
        realTime: this.properties.times
      })
      if (!this.data.increase) {
        this.countDown()
      }
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    voiceClose: function() {
      console.log(voiceCP)
      if (voiceCP) {
        backgroundAudioManager.pause()
        this.setData({
          voicePath: "/images/icon/voice-close.png"
        })
        voiceCP = 0
      } else {
        if (this.data.isStart) {
          backgroundAudioManager.play()
        }
        this.setData({
          voicePath: "/images/icon/voice-open.png"
        })
        voiceCP = 1
      }

    },
    //背景页转换
    swiperChange: function(e) {
      if (e.detail.source == 'touch') {
        this.setData({
          current: e.detail.current
        })
      }
      let bsound = this.data.bgms[this.data.current].backgroudSound
      backgroundAudioManager.title = this.data.bgms[this.data.current].name
      backgroundAudioManager.src = bsound
      if (this.data.isStart) {
        backgroundAudioManager.play()
        /*  backgroundAudioManager.onPlay(() => 
           backgroundAudioManager.pause())*/
      }
    },

    countDown: function(event) {
      let isStart = this.data.isStart
      let times = this.data.times //获取倒计时初始值
      let halfTime = this.data.realTime / 2
      let todayT = new Date().toLocaleDateString()

      this.setData({
        isStart: !isStart
      })
      //判断开始
      if (!isStart) {
        wx.setKeepScreenOn({
          keepScreenOn: true
        })
        startTime = new Date().getTime() / 1000
        backgroundAudioManager.play()
        //冥想正计时
        if (this.data.increase) {
          this.timer = setInterval(() => {
            times++
            this.mathTime(times)
          }, 1000)

        }
        //睡眠倒计时
        else {
          this.timer = setInterval(() => {
            times--
            //圆形进度条
            console.log(times)
            console.log(halfTime)
            if (times > halfTime) {
              this.setData({
                leftDeg: this.data.leftDeg - 360 / this.data.realTime
              })
            } else {
              this.setData({
                leftDeg: -135,
                rightDeg: this.data.rightDeg - 360 / this.data.realTime
              })
            }
            this.mathTime(times)
            //如果睡眠结束
            if (times == 0) {
              wx.vibrateLong()
              this.setData({
                leftDeg: 45,
                rightDeg: -45,
              })
              this.data.log = {
                name: this.properties.increase,
                keepTime: this.data.realTime,
                today: todayT
              }
              this.saveLog(this.data.log)
              clearInterval(this.timer)
              this.finished()
              backgroundAudioManager.pause()
            }
          }, 1000)
        }
      } //判断结束按钮
      else {
        endTime = new Date().getTime() / 1000
        backgroundAudioManager.pause()
        this.data.log = {
          name: this.properties.increase,
          keepTime: Math.abs(this.data.endTime - times) + this.data.beforeKeepTime,
          today: todayT
        }
        this.saveLog(this.data.log)

        clearInterval(this.timer)
        if (!this.data.increase && this.data.endTime > 1) {
          //console.log(this.data.endTime,'睡眠未完成')
          let objModal = {
            show: true,
            title: '休息好了吗',
            showCancel: true,
            cancelText: '休息',
            height: '30%',
            confirmText: '好!'
          }
          this.setData({
            modal1: objModal
          })
        } else if (this.data.increase) {
          this.finished()
        }
      }
      //传Modal框数据
    },
    saveLog: function(log) {
      //防止用户多次点击
      if (log.keepTime > 2) {
        let meditationTime = log.name ? log.keepTime : 0
        let sleepTime = log.name ? 0 : log.keepTime
        wx.request({
          url: 'http://www.xinyewangluo.xin/public/api/v1/UserInformation',
          method: "POST",
          data: {
            think_time: meditationTime,
            sleep_time: sleepTime,
            end_time: endTime,
            start_time: startTime
          },
          header: {
            'Content-Type': 'application/json',
            'Token': wx.getStorageSync('userToken')
          },
          success: res => {
            console.log('成功入库')
          }
        })
      }

    },
    //计算分秒函数
    mathTime: function(times) {
      let M = Math.floor(times / 60)
      let S = Math.floor(times) % 60
      this.setData({
        endTime: times,
        minute: M,
        second: S,
      })
    },
    //完成弹出框
    finished: function() {
      let objModal = {
        show: true,
        title: '完成！',
        showCancel: true,
        cancelText: '返回',
        height: '40%',
        confirmText: '分享',
        isShare: true
      }
      let kind2 = this.data.increase ? "冥想" : "休息"
      this.setData({
        today: this.data.log.today,
        modal2: objModal,
        finishtext: `刚刚${kind2}了${this.data.log.keepTime}秒，美好生活继续前行...`
      })
    },
    modalOperate: function(res) {
      if (res.detail.res == 'confirm') {
        this.setData({
          leftDeg: 45,
          rightDeg: -45,
        })
        this.finished()
        console.log('confirm')
      } else if (res.detail.res == 'cancel') {
        this.setData({
          beforeKeepTime: this.data.beforeKeepTime + this.data.log.keepTime,
          times: this.data.realTime - this.data.log.keepTime
        })
        console.log(this.data.beforeKeepTime)
        this.countDown()
      }
    },
    restfinish: function(res) {
      if (res.detail.res == 'confirm') {
        console.log('confirm')
      } else if (res.detail.res == 'cancel') {
        this.setData({
          minute: 0,
          second: 0
        })
        wx.navigateBack({
          delta: 1
        })
        console.log('cancel')
      }
    }
  },
})