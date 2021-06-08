import {
  request
} from "../../request/index.js";

import regeneratorRuntime from '../../lib/runtime/runtime'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj: {}
  },
  // 商品对象
  GoodsInfo: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {
      goods_id
    } = options
    this.getGoodsDetail(goods_id)
  },
  // 获取商品的详情数据
  async getGoodsDetail(goods_id) {
    const goodsObj = await request({
      url: "/goods/detail",
      data: {
        goods_id
      }
    })
    this.GoodsInfo = goodsObj
    this.setData({
      goodsObj: {
        goods_name: goodsObj.goods_name,
        goods_price: goodsObj.goods_price,
        pics: goodsObj.pics,
        // iphone部分手机不识别webp图片格式，
        // 前端可以临时自己改，要确保后台存在别的格式的图片
        goods_introduce: goodsObj.goods_introduce.replace(/\.webp/g, '.jpg'),
      }
    })
  },
  handlePreviewImage(e) {
    // 构造要预览的图片数组
    const urls = this.GoodsInfo.pics.map(v => v.pics_mid);
    // 接收传递过来的图片url
    const current = e.currentTarget.dataset.url;
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: urls // 需要预览的图片http链接列表
    })
  },
  // 点击加入购物车
  // 这里是利用缓存来实现，并非存真正的数据
  handleCartAdd() {
    // 获取缓存中的购物车数组
    let cart = wx.getStorageSync("cart") || [];
    // 判断商品对象是否存在于购物车数组中
    let index = cart.findIndex(v => v.goods_id === this.GoodsInfo.goods_id);
    if(index === -1){
      // 不存在，即第一次添加
      this.GoodsInfo.num = 1;
      cart.push(this.GoodsInfo)
    }else{
      // 已存在购物车数据，执行num++
      cart[index].num++;
    }
    // 把购物车重新添加回缓存中
    wx.setStorageSync("cart", cart);
    // 弹窗提示
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      // 防用户手抖
      mask: true
    });
      
  }
})