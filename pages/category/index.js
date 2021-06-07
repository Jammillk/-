// pages/category/index.js
import {
  request
} from "../../request/index.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 左侧菜单数据
    leftMenuList: [],
    // 右侧商品数据
    rightContent: [],
    // 被点击的左侧的菜单
    currentIndex: 0
  },
  // 接口的返回数据
  Cates: [],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCates();
  },
  getCates() {
    request({
        url: "https://api-hmugo-web.itheima.net/api/public/v1/categories"
      })
      .then(res => {
        // console.log(res)
        this.Cates = res.data.message
        // 构造左侧大菜单数据
        let leftMenuList = this.Cates.map(v => v.cat_name)
        // 构造右侧商品数据
        let rightContent = this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightContent
        })
      })
  },
  handleItemTap(e) {
    // console.log(e)
    // 获取被点击的标题身上的索引，给data中的currentIndex赋值
    const {
      index
    } = e.currentTarget.dataset;
    // 根据不同的索引渲染不同的数据
    let rightContent = this.Cates[index].children;
    this.setData({
      currentIndex: index,
      rightContent
    })
   
  }
})