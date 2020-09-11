// pages/account.js
var app = getApp();
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
    if(self.data.disabled){
      let first,second;
      self.setData({
          nickname: e.detail.value.nickname,
          gender: 2,
          phone: e.detail.value.phone,
      })
      tt.request({
        //url: `http://192.168.1.104:8080/user?openid=${app.globalData.account.openid}&phone=${self.data.phone}`,
        url: `http://192.168.1.104:8080/user?openid=${app.globalData.account.openid}&nickname=${self.data.nickname}&gender=${self.data.gender}&phone=${self.data.phone}`,
        //url: `http://192.168.1.104:8080/user?openid=ou_cd3fdc86c63a91b2bf9ee34cd&nickname=cngz&gender=2&phone=11111111111`,
        method:'PUT',
        success(res) {
          console.log(res.data)
        }
      })
      console.log(app.globalData.account.openid) 
      console.log(self.data.nickname)
      console.log(self.data.gender)
      console.log(self.data.phone)
    }
  }
})