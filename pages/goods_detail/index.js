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
    this.setData({
      goodsObj: {
        goods_name: goodsObj.goods_name,
        goods_price: goodsObj.goods_price,
        pics: goodsObj.pics,
        // iphone部分手机不识别webp图片格式，
        // 前端可以临时自己改，要确保后台存在别的格式的图片
        goods_introduce: goodsObj.goods_introduce.replace(/\.webp/g,'.jpg'),
      }
    })
  }
})