// pages/account.js
Page({
  data: {
    id:"",
    avatar:"",
    credit:"",
    nickname:"",
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
      mygender = "保密"
    }
    self.setData({
      avatar:app.globalData.account.avatar,
      name:app.globalData.account.name,
      gender:mygender,
      nickName:app.globalData.account.nickname,
      phone:app.globalData.account.phone,
      university:app.globalData.account.university,
      rank:app.globalData.account.credit
    })
  }
  
})