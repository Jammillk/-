// pages/cart/index.js
import {
  openSetting,
  chooseAddress,
  getSetting
} from '../../utils/asyncWX'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{}
  },
  onShow(){
    const address = wx.getStorageSync("address");
    this.setData({
      address
    })
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  async handleChooseAddress() {
    try {
      const res1 = await getSetting();
      const scopeAddress = res1.authSetting["scope.address"]
      // 2.判断权限状态
      if (scopeAddress === false) {
        // 用户拒接过授予权限，诱导用户打开授权界面
        await openSetting();
      }
      // 3.调用获取地址API
      let address = await chooseAddress();
      address.all=address.provinceName+address.cityName+address.countyName+address.detailInfo
      wx.setStorageSync("address", address);
    } catch (err) {
      console.log(err)
    }
  }
})