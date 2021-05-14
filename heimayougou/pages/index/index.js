import { request } from "../../request/index.js"
//获取应用实例
const app = getApp()

Page({
  data: {
    swiperList:[],
    catesList:[],
    // 楼层数据
    floorList:[],
    // qqry:["服饰","热","爆款","春季","心动"]
    // qqry:[]
  },

  onLoad:function(options){
    // wx-wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   success: (result) => {
    //     this.setData({
    //       swiperList:result.data.message
    //     })
    //   },
    // });
    
    // 使用了es6
    // request({url:"https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata"})
    // .then(result=>{
    //   this.setData({
    //     swiperList:result.data.message
    //   })
    // })

    this.getSwiperList();
    this.getCateList();
    this.getFloorList();
    // this.getQqry();
  },

  // 获取轮播图数据
    getSwiperList(){
      request({url:"/home/swiperdata"})
      .then(result=>{
        this.setData({
          swiperList:result
        })
      })
  },

  // 获取分类导航
    getCateList(){
      request({url:"/home/catitems"})
      .then(result=>{
        this.setData({
          catesList:result
        })
      })
  },
  // 楼层数据
  getFloorList(){
    request({url:"/home/floordata"})
    .then(result=>{
      this.setData({
        floorList:result
      })
      var xx = this.data.floorList
      console.log(xx);
    })
    
  },
  // getQqry(){
  //   request({url:"/home/floordata"})
  //   .then(result=>{
  //     this.setData({
  //       qqry:result
  //     })    
  //   })
  // },
  
  

})
