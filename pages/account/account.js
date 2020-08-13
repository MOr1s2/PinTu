// pages/account.js
Page({
  data: {
    avatar:"",
    rank:"",
    nickName:"",
    name:"",
    gender:"",
    phone:"",
    university:""
  },
  onLoad: function (options) {
    self = this;
    var app = getApp();
    var mygender;
    if(app.globalData.account.gender==1){
      mygender = "男"
    }else if(app.globalData.account.gender==2){
      mygender = "女"
    }else{
      mygender = "未知"
    }
    app.globalData.account.gender=1;
    self.setData({
      avatar:app.globalData.account.avatarUrl,
      name:app.globalData.account.nickName,
      gender:mygender
    })
  }
  
})