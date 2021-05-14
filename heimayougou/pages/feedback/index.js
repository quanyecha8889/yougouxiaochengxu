/* 
1 点击 “+” 触发tap点击事件
  1 调用小程序内置的 选择图片的 api
  2 获取到 图片的路径  数组
  3 把图片路径 存到 data的变量中
  4 页面就可以根据 图片数组 进行循环显示 自定义组件
2 点击 自定义图片 组件
  1 获取被点击的元素的索引
  2 获取 data中的图片数组
  3 根据索引 数组中删除对应的元素
  4 把数组重新设置回data中
3 点击 “提交”
  1 获取文本域的内容 类似 输入框的获取
    1 data中定义变量 表示 输入框内容
    2 文本域 绑定 输入事件 事件触发的时候 把输入框的值 存入到变量中 
  2 对这些内容 合法性验证
  3 验证通过 用户选择的图片 上传到专门的图片的服务器 返回图片外网的链接
    1 遍历图片数组 
    2 挨个上传
    3 自己再维护图片数组 存放 图片上传后的外网的链接
  4 文本域 和 外网的图片的路径 一起提交到服务器 前端的模拟 不会发送请求到后台。。。 
  5 清空当前页面
  6 返回上一页 
 */
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:"体验问题",
        isActive:true
      },
      {
        id:1,
        value:"商品/商家投诉",
        isActive:false
      }
    ],
    // 被选中的图片的路径数组
    chooseImgs:[],
    textVal:""
  },
  // 外网的图片的路径数组
  UpLoadImgs:[],
  handleTabsItemChange(e){
    // console.log(e)
    // 获取被点击的标题索引
    const {index}=e.detail;
    // 修改源数组
    let {tabs}=this.data;
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    // 3 赋值嗷data中
    this.setData({
      tabs
    })
  },
  // 点击+号选择图片
  handleChooseImg(){
    // 调用小程序内置的选择图片api
    wx.chooseImage({
      // 同时选中的图片最大数量
      count: 9,
      // 图片格式 有原图和压缩
      sizeType: ['original','compressed'],
      // 图片的来源 相册 或者相机
      sourceType: ['album','camera'],
      success: (result) => {
        // console.log(result)
        this.setData({
          // 图片数组 进行拼接 
          // chooseImgs:result.tempFilePaths
          // ...是展开运算符，展开数组，再和其他展开数组拼接
          chooseImgs:[...this.data.chooseImgs,...result.tempFilePaths]
        })
      },
    })
  },
  // 点击自定义的组件  删除图片
  handleRemoveImg(e){
    // 获取被点击的组件的索引
    const {index} = e.currentTarget.dataset;
    // console.log(index);
    // 获取data中的源图片数组
    let {chooseImgs} = this.data;
    chooseImgs.splice(index,1);
    this.setData({
      chooseImgs
    });
  },
  // 文本域的输入事件
  handleTextInput(e){
    this.setData({
      textVal:e.detail.value
    })
  },
  // 提交按钮点击事件
  handleFormSubmit(){
    // 获取文本域的内容
    const {textVal,chooseImgs} = this.data;
    // 合法性验证 trim去掉字符串两端多余的空格
    if(!textVal.trim()){
      wx.showToast({
        title: '输入不合法',
        icon: 'none',
        mask: true,
      });
      return;
    }
    // 准备上传图片到专门的图片服务器
    // 上传文件的api 不支持多个文件同时上传  上传的图片放进数组里 只能遍历数组，挨个上传
    chooseImgs.forEach((v,i)=>{
      wx.uploadFile({
        // 被上传的路径
        filePath: v,
        // 上传图片的名称 后台来获取文件
        name: 'file',
        // 图片上传到哪里
        url: 'https://imgchr.com',
        // 顺带的文本信息
        formData: {},
        success: (result) => {
          console.log(result);
        },
      })
    })
   
  }

})