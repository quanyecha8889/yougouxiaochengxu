import { request } from "../../request/index.js"
import regeneratorRuntime from '../../lib/runtime/runtime.js';
Page({

  data: {
    //左侧菜单数据
    leftMenuList:[],
    //右侧商品数据
    rightContent:[],
    //被点击的菜单
    currentIndex:0,
    // 右侧内容的滚动条距离顶部的距离
    scrollTop:0

  },
  //接口的返回数据
  Cates:[],



  onLoad: function (options) {
  // 0 web中的本地存储和 小程序中的本地存储的区别
  //     1 写代码的方式不一样了 
  //       web: localStorage.setItem("key","value") localStorage.getItem("key")
  //       小程序中: wx.setStorageSync("key", "value"); wx.getStorageSync("key");
  //     2:存的时候 有没有做类型转换
  //       web: 不管存入的是什么类型的数据，最终都会先调用以下 toString(),把数据变成了字符串 再存入进去
  //       小程序: 不存在 类型转换的这个操作 存什么类似的数据进去，获取的时候就是什么类型

    // 先判断一下本地存储中有没有旧数据
    // 没有旧数据就直接发送新请求
    // 有旧的数据 同时 旧的数据也没有过期 就使用 本地存储中的旧数据

    // 1、获取本地存储中的数据 小程序也有本地存储技术
    const Cates = wx.getStorageSync("cates")

    // 2、判断
    if (!Cates){
      // 不存在，就发送请求获取数据
      this.getCates();
      // console.log("可以使用旧的2222");
    }else{
      // 有旧的数据 定义过期时间 10s  验证完再改成五分钟
      if(Date.now() - Cates.time>1000*10){
        // 就重新发送请求
        this.getCates();
        // console.log("可以使用旧的11111");
      }else{
        // 可以使用旧的数据
        // console.log("可以使用旧的");
        this.Cates=Cates.data;
        // 构造左侧的大菜单数据
        let leftMenuList=this.Cates.map(v=>v.cat_name);
        // 构造右侧的商品数据
        let rightContent=this.Cates[0].children;

        this.setData({
          leftMenuList,
          rightContent
         })
      }
    }

    // this.getCates();
  },
  // 获取分类数据
  async getCates(){
    // request({
    //   url: '/categories',
    // })
    //   .then(res=>{
    //     // console.log(res);
    //     this.Cates=res.data.message;

    //     //把接口的数据存入到本地存储中
    //     wx.setStorageSync("cates", {time:Date.now(), data:this.Cates}) ;


    //     // 构造左侧的大菜单数据
    //     let leftMenuList=this.Cates.map(v=>v.cat_name);
    //     // 构造右侧的商品数据
    //     let rightContent=this.Cates[0].children;

    //   this.setData({
    //     leftMenuList,
    //     rightContent
    //   })
    // })
    // 使用es7的async await来发送异步请求
    const res = await request({url:"/categories"});
    // this.Cates=res.data.message;
    this.Cates=res;
    //把接口的数据存入到本地存储中
    wx.setStorageSync("cates", {time:Date.now(), data:this.Cates}) ;
    // 构造左侧的大菜单数据
    let leftMenuList=this.Cates.map(v=>v.cat_name);
    // 构造右侧的商品数据
    let rightContent=this.Cates[0].children;
    this.setData({
      leftMenuList,
      rightContent
      })
  },
   //左侧菜单点击事件
   handleItemTap(e){
    // console.log(e);
    // 获取标题身上的索引并给data中的cuurentIndex赋值，然后根据不同的索引来渲染右侧的商品内容
    const {index}=e.currentTarget.dataset;

    let rightContent=this.Cates[index].children;
    this.setData({
      currentIndex:index,
      rightContent,
      // 重新设置右侧内容的scrollTop
      scrollTop:0
    })
    
   }
})