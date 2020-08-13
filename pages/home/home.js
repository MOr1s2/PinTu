// pages/home/home.js
Page({
  data: {
    date:"",
    time:""
  },
  onLoad: function (options) {
    self = this;
    var myDate = new Date();
    var mymonth = `${myDate.getMonth()}`;
    var myday =  `${myDate.getDate()}`;
    var mytime = `${myDate.getHours()}:${myDate.getMinutes()}`;
    if(myDate.getMonth()<10){
        mymonth = `0${myDate.getMonth()+1}`
    }
    if(myDate.getDate()<10){
        myday =  `0${myDate.getDate()}`
    }
    var mydate = `${myDate.getFullYear()}-${mymonth}-${myday}`;
    if(myDate.getMinutes()<10){
        mytime = `${myDate.getHours()}:0${myDate.getMinutes()}`
    }
    self.setData({date:mydate,time:mytime})
  },

    bindDateChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        self.setData({
        date: e.detail.value
        })
    },

    bindTimeChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        self.setData({
        time: e.detail.value
        })
    },

    login: function (e) {
        tt.login({
            success (res) {
                console.log(`login 调用成功 ${res.code} `);
            },
            fail (res) {
                console.log(`login 调用失败`);
            }
        });
        tt.getUserInfo({
            success (res) {
                var app = getApp();
                app.globalData.account = res.userInfo;
                console.log(`getUserInfo 调用成功 ${app.globalData.account}`);
                tt.navigateTo({
                  url: '/pages/account/account'
                });
            },
            fail (res) {
                console.log(`getUserInfo 调用失败`);
            }
        })
    }
  
})