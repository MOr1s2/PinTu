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
    university:"",
    icon: "/icon/edit.png",
    disabled: true,
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
  },
  
  edit: function (e) {
    if (self.data.icon == "/icon/edit.png"){
      self.setData({
        disabled: false,
        icon: "/icon/done.png"
      })
    }else{
      self.setData({
        disabled: true,
        icon: "/icon/edit.png",

      })
    }
  },

  submit:function(e){
    let first,second;
    self.setData({
        nickname: e.detail.value.nickname,
        gender: e.detail.value.gender,
        phone: e.detail.value.phone,
    })
    console.log(self.data.nickname)
    console.log(self.data.gender)
    console.log(self.data.phone)
  }
})