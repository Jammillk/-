// pages/goodsList/index.js
import {
  request
} from "../../request/index.js";

import regeneratorRuntime from '../../lib/runtime/runtime'



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
    }],
    goodsList: []
  },

  // 接口要的参数
  QueryParams: {
    query: "",
    cid: "",
    pagenum: 1,
    pagesize: 10
  },
  /**
   * 总页数
   */
  totalPages: 1,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.QueryParams.cid = options.cid
    this.getGoodsList()
  },

  // 获得商品列表数据
  async getGoodsList() {
    
    const res = await request({
      url: "/goods/search",
      data: this.QueryParams
    })
    const total = res.total
    // 计算程序的总页数
    this.totalPages = Math.ceil(total / this.QueryParams.pagesize)
    this.setData({
      // goodsList: res.goods
      // 拼接数组
      goodsList: [...this.data.goodsList,...res.goods]
    })
    // 关闭下拉刷新的窗口
    wx.stopPullDownRefresh();
      
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
  },

  // 滚动条触底事件
  onReachBottom() {
    // 判断是否有下一页
    if (this.QueryParams.pagenum >= this.totalPages) {
      // console.log('没有下一页数据了')
      wx.showToast({
        title: '没有下一页数据了',
        icon: 'loading'
      });
    } else {
      // console.log('还有下一页数据')
      this.QueryParams.pagenum++;
      this.getGoodsList();
    }
  },

  // 下拉刷新事件，就要把数据全部清空，然后再
  onPullDownRefresh(){
    // 重置数据
    this.setData({
      goodsList:[]
    })
    this.QueryParams.pagenum = 1
    this.getGoodsList()
  }
})