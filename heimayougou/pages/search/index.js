import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods:[],
    // 取消的按钮是否显示
    isFocus:false,
    // 输入框的值
    inpValue:""
  },
  TimeId:-1,
  handleInput(e){
    // console.log(e);
    // 获取输入框的值
    const {value} = e.detail;
    // 检查合法性
    if(!value.trim()){
      // 值不合法
      return;
      this.setData({
        goods:[],
        isFocus:false
      })
    }
    // 显示按钮
    this.setData({
      isFocus:true
    })
    //准备发送请求获取数据
    // 先清除定时器
    clearTimeout(this.TimeId);
    this.TimeId = setTimeout(() => {
      this.qsearch(value);
    }, 1000);
  },
  
  async qsearch(query){
    // console.log(query);
    const res = await request ({url:"/goods/qsearch", data:{query}});
    console.log(res);
    this.setData({
      goods:res
    })
  },
  handleCancel(){
    this.setData({
      inpValue:"",
      isFocus:false,
      goods:[]
    })
    
  }
})