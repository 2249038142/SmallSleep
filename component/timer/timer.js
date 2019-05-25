// component/timer.js
const backgroundAudioManager = wx.getBackgroundAudioManager()
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
    modal: {},
    resttext: "休息结束时间未到哦，如果休息好了那就继续工作吧！",
    finishtext: "",
    bgms: [{
      name: "林泉禅修",
      imagePath: "https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640",
      imageClass: ".bg1",
      backgroudSound: "http://music.163.com/song/media/outer/url?id=1310317459.mp3"
    },
    {
      name: "溪水溶洞",
      imagePath: "../images/Wavey-Fingerprint.svg",
      imageClass: ".bg2",
      backgroudSound: "http://music.163.com/song/media/outer/url?id=1310316559.mp3"
    },

    ],
    isStart: false,
    second: 0,
    leftDeg: 45,
    rightDeg: -45,
    log:{}
  },


  onShareAppMessage(res) {
    return {
      title: '歇息与冥想',
    }
  },
  attached() {
    let bsound = this.data.bgms[0].backgroudSound
    backgroundAudioManager.title = this.data.bgms[0].name
    backgroundAudioManager.src = bsound
    backgroundAudioManager.pause()
  },

  /**
   * 组件的方法列表
   */
  methods: {

    swiperChange: function (e) {
        if (e.detail.source == 'touch') {
      this.setData({
        current: e.detail.current
      })
       }
      let bsound = this.data.bgms[this.data.current].backgroudSound
      backgroundAudioManager.title = this.data.bgms[this.data.current].name
      backgroundAudioManager.src = bsound
      if (!this.data.isStart) {
       backgroundAudioManager.pause()
      /*  backgroundAudioManager.onPlay(() => 
         backgroundAudioManager.pause())*/
      }
   
    },
  
    countDown: function (event) {
      let isStart = this.data.isStart
      let times = this.data.times //获取倒计时初始值
      let halfTime = this.data.times / 2
      let todayT = new Date().toLocaleDateString()

      this.setData({
        isStart: !isStart
      })
      //判断开始
      if (!isStart) {
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
            if (times > halfTime) {
              this.setData({
                leftDeg: this.data.leftDeg - 360 / this.data.times
              })
            } else {
              this.setData({
                leftDeg: -135,
                rightDeg: this.data.rightDeg - 360 / this.data.times
              })
            }
            this.mathTime(times)
            if (times == 0) {
              this.data.log = {
                name: this.properties.increase,
                keepTime: times,
                today: todayT
              }
              this.saveLog(this.data.log)
              clearInterval(this.timer)
              this.finished()
            }
          }, 1000)
        }
      }//判断结束按钮
      else {
        backgroundAudioManager.pause()
        this.data.log = {
          name: this.properties.increase,
          keepTime: Math.abs(this.data.endTime - times),
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
    saveLog: function (log) {
      //防止用户多次点击
      console.log(wx.getStorageSync('userToken')) 
      if (log.keepTime > 2) {
        let meditationTime = log.name ? log.keepTime : 0
        let sleepTime = log.name ? 0 : log.keepTime
        wx.request({
          url: 'http://129.204.63.87/sleep/public/api/v1/UserInformation',
          method: "POST",
          data: {
            think_time: meditationTime,
            sleep_time: sleepTime
          },
          header: {
            'Content-Type': 'application/json',
            'Token': wx.getStorageSync('userToken')
          },
          success: res => {
            console.log('成功入库')
          }
        })}
    
    },
    mathTime: function (times) {
      let M = Math.floor(times / 60)
      let S = Math.floor(times) % 60
      this.setData({
        endTime: times,
        minute: M,
        second: S,
      })
    },
    finished: function () {
      console.log(this.data)
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
    modalOperate: function (res) {
      if (res.detail.res == 'confirm') {
        this.setData({
          leftDeg: 45,
          rightDeg: -45,
        })
        this.finished()
        console.log('confirm')
      } else if (res.detail.res == 'cancel') {
        console.log('cancel')
        this.setData({
          times: this.data.times-this.data.log.keepTime
        })
        console.log(this.data.times)
        this.countDown()
      }
    },
    restfinish: function (res) {
      if (res.detail.res == 'confirm') {
        console.log('confirm')
      } else if (res.detail.res == 'cancel') {
        console.log('cancel')
      }
    }
  },


})