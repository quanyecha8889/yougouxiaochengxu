/* 
1 页面加载的时候
  1 从缓存中获取购物车数据 渲染到页面中
    这些数据  checked=true 
2 微信支付
  1 哪些人 哪些帐号 可以实现微信支付
    1 企业帐号 
    2 企业帐号的小程序后台中 必须 给开发者 添加上白名单 
      1 一个 appid 可以同时绑定多个开发者
      2 这些开发者就可以公用这个appid 和 它的开发权限  
3 支付按钮
  1 先判断缓存中有没有token
  2 没有 跳转到授权页面 进行获取token 
  3 有token 。。。
  4 创建订单 获取订单编号
  5 已经完成了微信支付
  6 手动删除缓存中 已经被选中了的商品 
  7 删除后的购物车数据 填充回缓存
  8 再跳转页面 
 */
import { request } from "../../request/index.js"
import regeneratorRuntime from '../../lib/runtime/runtime';
import { getSetting, chooseAddress, openSetting, showModal, showToast, requestPayment }from "../../utils/asyncWx.js"
Page({
  data:{
    address:{},
    cart:[],
    totalPrice:0,
    totalNum:0
  },
  onShow(){
    // 获取缓存中的收货地址数据
    const address = wx.getStorageSync('address');
    // 获取缓存中的购物车数据
    let cart = wx.getStorageSync('cart')||[];
    // 过滤后的购物车数组
    cart = cart.filter(v=>v.checked);
    this.setData({address});
    // 总价格和总数量
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v=>{
      totalPrice+=v.num*v.goods_price;
      totalNum+=v.num
    })
    this.setData({
      cart,
      totalPrice,
      totalNum,
      address
    });
  },
  // 点击支付功能
  async handleOrderPay(){
    // 判断缓存中有无token
    const token = wx.getStorageSync('token');
    if(!token){
      wx.navigateTo({
        url: '/pages/auth/index',
      });
      return;
    }
    console.log("token存在");
    // 创建订单 准备 请求头参数
    const header = {Authorization:token};
    // 准备请求体参数
    const order_price = this.data.totalPrice;
    const consignee_addr = this.data.address.all;
    const cart = this.data.cart;
    let goods=[];
    cart.forEach(v=>goods.push({
      goods_id:v.goods_id,
      goods_number:v.num,
      goods_price:v.goods_price
    }))
    // 准备发送请求 创建订单 获取订单编号
    const orderParams = {order_price, consignee_addr, goods}
    const {order_number} = await request({url:"/my/orders/create", method:"POST", data:orderParams,header})
    // console.log(order_number);
    // 准备发起预支付的接口
    const {pay} = await request ({url:"/my/orders/req_unifiedorder", method:"POST", header, data:{order_number}});
    // console.log({pay});
    // 直接发起微信支付
    const res = await requestPayment(pay);
    console.log(res);
  },


})

