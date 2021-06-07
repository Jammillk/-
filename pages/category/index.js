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
    /**
     * 添加缓存，看看本地存储中有没有旧数据
     * 没有旧数据，直接发送新请求
     * 有旧数据，且没有过期，就取本地的旧数据
     */
    const Cates = wx.getStorageSync("cates");
    if (!Cates) {
      console.log('获取新数据')
      // 不存在，则获取数据
      this.getCates();
    }else{
      // 有旧数据，过期时间10s ---》5分钟
      if(Date.now() - Cates.time > 1000 * 10){
        // 时间chuo，10s+
        // 超时了，获取新数据
        this.getCates();
      }else{
        console.log('可以用旧的数据')
        this.Cates = Cates.data
        let leftMenuList = this.Cates.map(v => v.cat_name)
        let rightContent = this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightContent
        })
      }

    }
  },
  getCates() {
    request({
        url: "https://api-hmugo-web.itheima.net/api/public/v1/categories"
      })
      .then(res => {
        // console.log(res)
        this.Cates = res.data.message
        // 把接口的数据存到本地存储中
        wx.setStorageSync("cates", {
          time: Date.now(),
          data: this.Cates
        });


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