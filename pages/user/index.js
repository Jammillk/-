// pages/user/index.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: '',
    collectNum:0
  },
  /**
   * 获取用户信息
   * @param {*} e 
   */
   getUserProfile(e){
    // const {userInfo} = e.detail;
    // wx.setStorageSync("userinfo", userInfo);
    // this.setData({
    //   userInfo
    // })
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        const userInfo = res.userInfo; 
        console.log(userInfo)
        wx.setStorageSync("userInfo", userInfo);
        this.setData({
          userInfo: res.userInfo
        })
      }
    })
  },
  onShow(){
    // 
    const userInfo = wx.getStorageSync("userInfo");
    const collect = wx.getStorageSync("collect");
    this.setData({
      userInfo,
      collectNum:collect.length
    })
  },
  handleRefund(){
    wx.showToast({
      title: '暂不支持该功能~',
      mask: true
    });
  }
})