// 引入用来发送请求的方法，要把路径补全！
import { request } from "../../request/index.js";

Page({
  data: {
    // 轮播图数组
    swiperList: [],
    // 导航数组
    catesList: []
  },
  // 页面开始加载的时候就会触发的事件
  onLoad: function(options){
    // 1. 发送异步请求获取轮播图数据
    // 优先的手段可以通过es6的promise来解决
    // wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   success: (result)=>{
    //     this.setData({
    //       swiperList: result.data.message
    //     })
    //   }
    // });
    // 开启ES6转ES5才成功，看来这些还是有、、问题的
    this.getSwiperList();
    this.getCateList();
  },
  // 获取轮播图数据
  getSwiperList(){
    request({url:"https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata"})
    .then(result=>{
        this.setData({
          swiperList: result.data.message
        })
    })
  }, 
  // 获取分类导航数组
  getCateList(){
    request({url:"https://api-hmugo-web.itheima.net/api/public/v1/home/catitems"})
    .then(result=>{
        this.setData({
          catesList: result.data.message
        })
    })
  },
});