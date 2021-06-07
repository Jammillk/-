// pages/goods_list/index.js
Page({
  data: {
    tabs: [{
      id: 0,
      value: "综合",
      isActive: true

    }, {
      id: 1,
      value: "销量",
      isActive: false

    }, {
      id: 2,
      value: "价格",
      isActive: false

    }, ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  // 标题点击事件
  handleTabsItemChange(e) {
    // 获取被点击的标题索引
    const {
      index
    } = e.detail;
    // 修改源数组
    let {
      tabs
    } = this.data;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    // 赋值到data中
    this.setData({
      tabs
    })
  }
})