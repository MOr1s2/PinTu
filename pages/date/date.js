// pages/log/log.js
Page({
  data: {
    message:"",
    date:"",
    week:"",
    city:"",
    wea:"",
    air_tips:""

  },
  onLoad: function (options) {
    self = this
  },

  send1:function(){
    tt.getLocation({
      success (res) {
        console.log(`经度 ${res.longitude}，纬度 ${res.latitude}`);
        self.setData({
          message:`经度 ${res.longitude}，纬度 ${res.latitude}`
        })
      },
      fail (res) {
        console.log(`getLocation 调用失败`);
        self.setData({
          message:`getLocation 调用失败`
        })       
      }
  });
  },

  send2:function(){
    tt.request({
      url: 'https://tianqiapi.com/api',
      method:'GET',
      data:{
        appid:31663895,
        appsecret:'hdkf5NSn',
        version:'v6',
        city:'成都'
      },
      success(res) {
        console.log(res.data);
        self.setData({
          message:`日期：${res.data.date}，天气：${res.data.wea}`,
          city:res.data.city,
          date:res.data.date,
          week:res.data.week,
          wea:res.data.wea,
          air_tips:res.data.air_tips
        }) 
      },
      fail(res) {
        console.log(`request 调用失败`);
        self.setData({
          message:`request 调用失败`
        })
      },
    })
  },

  send3:function(){
    tt.request({
      url: 'http://localhost:8080',
      method:'GET',
      success(res) {
        console.log(res);
        self.setData({
          message:res.data
        }) 
      },
      fail(res) {
        console.log(`request 调用失败`);
        self.setData({
          message:`request 调用失败`
        })
      },
    })
  }

})