
/*
 * modal属性使用对象集合进行处理
 * 调用方式如下：
 *  modal: {
        show: false,//modal是否显示，默认false
        height: '',//modal显示内容高度，默认为50%
        title: '',//modal标题，默认提示
        showCancel: false,//是否显示取消按钮，默认显示
        cancelText: '取消',//取消按钮标题，默认为取消
        cancelColor: '',//取消按钮标题颜色，默认为#000000
        confirmText: '',//确定按钮标题，默认为确定
        confirmColor: '',//确定按钮标题颜色，默认为#3cc51f
        clickClose:true//点击取消或确认按钮后是否关闭modal,默认为true
    }

 */
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    modal: {
      type: Object,
      value: {
        show: false,
        height: '',
        title: '',
        showCancel: true,
        cancelText: '取消',
        cancelColor: '',
        confirmText: '',
        confirmColor: '',
        clickClose: true,
        isShare: false,
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    modalDefault: {
      show: false,
      height: '50%',
      title: '提示',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#000000',
      confirmText: '确定',
      confirmColor: '#3cc51f',
      clickClose: true,
      isShare:false,
    },
 
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 取消按钮事件
     */
    modalCancel() {
      this.modalShowChange();
      this.triggerEvent('success', {
        res: 'cancel'
      })
    },
    /**
     * 确定按钮事件
     */
    modalConfirm() {
      this.modalShowChange();
      this.triggerEvent('success', {
        res: 'confirm',
      })
    },
    /**
     * 弹框显示属性更改
     */
    modalShowChange: function () {
      let objModal = {
        show: false
      }
      this.setData({
        modal: objModal
      })
    }
  }
})
