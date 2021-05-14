import { request } from "../../request/index.js"
import regeneratorRuntime from '../../lib/runtime/runtime.js';
import { login }from "../../utils/asyncWx.js"
Page({
 async handleGetUserInfo(e){
   try {
    //  获取用户信息
    const {encryptedData, rawData, iv, signature} = e.detail;
    // 获取小程序登录成功后的code
    const {code} = await login();
    // 发送请求， 获取用户token
    const loginParams = {encryptedData, rawData, iv, signature, code};
    // const res = await request({url:"/users/wxlogin", data:loginParams, method:"POST"});
    wx.setStorageSync('token', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo')
    // const token=wx.getStorageSync("token")
    // console.log(token);
    wx.navigateBack({
      delta:1,
    })
  }
    catch (error) {
     Console.log(error);
    }
    
     

  }
})