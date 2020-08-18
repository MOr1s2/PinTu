// pages/home/home.js
Page({
    data: {
        date:"",
        time:"",
        nameLeft: '',
        addressLeft: '',
        latitudeLeft: '',
        longitudeLeft: '',
        nameRight: '',
        addressRight: '',
        latitudeRight: '',
        longitudeRight: ''
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
        self.setData({
            date:mydate,
            time:mytime,
            nameLeft:'起点',
            nameRight:'终点'
            })
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
        try {
            var app = getApp();
            app.globalData.account = tt.getStorageSync('account');
            if (app.globalData.account) {
                tt.navigateTo({
                    url: '/pages/account/account'
                });
            }else{
                tt.login({
                    success (res) {
                        console.log(`login 调用成功 ${res.code} `);
                        var app = getApp();
                        app.globalData.account.id = res.code;
                    },
                    fail (res) {
                        console.log(`login 调用失败`);
                    }
                });
                tt.request({
                    url: `http://localhost:8080/${app.globalData.account.id}`,
                    method:'get',
                    success(res) {
                        if(!res){
                            console.log(`get调用结果为${res}`); 
                        }else{
                            console.log(`get调用成功：${res}`);
                            var app = getApp();
                            app.globalData.account = res.data;
                            try {
                                tt.setStorageSync('account', app.globalData.account);
                            } catch (error) {
                                console.log(`setStorageSync 调用失败`);
                            }
                            tt.navigateTo({
                            url: '/pages/account/account'
                            });    
                        }    
                    },
                    fail(res) {
                        console.log(`get 调用失败`);
                        tt.getUserInfo({
                            success (res) {
                                console.log(`getUserInfo 调用成功 ${res.userInfo}`);
                                tt.request({
                                    //url: `http://localhost:8080/user?id=${}&avatar=${}&rank=${}&nickName=${}&name=${}&gender=${}&phone=${}&university=${}`,
                                    url: `http://localhost:8080/user?id=${app.globalData.account.id}&avatar=${res.userInfo.avatarUrl}&name=${res.userInfo.nickName}&gender=${2}`,
                                    method:'post',
                                    success(res) {
                                        if(!res){
                                            console.log(`post调用结果为${res}`)
                                        }else{
                                            console.log(`post调用成功：${res}`);
                                            var app = getApp();
                                            app.globalData.account = res;
                                            try {
                                                tt.setStorageSync('account', app.globalData.account);
                                            } catch (error) {
                                                console.log(`setStorageSync 调用失败`);
                                            }
                                            tt.navigateTo({
                                            url: '/pages/account/account'
                                            });    
                                        }
                                    },
                                    fali(res){
                                        console.log(`save调用失败：${res}`); 
                                    }
                                });
                            },
                            fail (res) {
                                console.log(`getUserInfo 调用失败`);
                            }
                        })
                    },
                })
                /*
                
                */
            }
        } catch (error) {
            console.log(`getStorageSync 调用失败`);
            
        }
    },
    
    chooseLeft: function(e){
        tt.getLocation({
            success: function(res) {
                var latitude = res.latitude;
                var longitude = res.longitude;
                tt.openLocation({
                    latitude: latitude,
                    longitude: longitude,
                    scale: 28
                });
                tt.chooseLocation({
                    success: function (res) {
                        var name = res.name
                        var address = res.address
                        var latitude = res.latitude
                        var longitude = res.longitude
                        self.setData({
                            nameLeft: name,
                            addressLeft: address,
                            latitudeLeft: latitude,
                            longitudeLeft: longitude
                        })
                        console.log(`choose success:${self.data.nameLeft}`)
                    },
                    complete(res){
                        console.log(res)
                    }
                })
            }
        })
    },

    chooseRight: function(e){
        tt.getLocation({
            success: function(res) {
                var latitude = res.latitude;
                var longitude = res.longitude;
                tt.openLocation({
                    latitude: latitude,
                    longitude: longitude,
                    scale: 28
                });
                tt.chooseLocation({
                    success: function (res) {
                        var name = res.name
                        var address = res.address
                        var latitude = res.latitude
                        var longitude = res.longitude
                        self.setData({
                            nameRight: name,
                            addressRight: address,
                            latitudeRight: latitude,
                            longitudeRight: longitude
                        })
                        console.log(`choose success:${self.data.nameRight}`)
                    },
                    complete(res){
                        console.log(res)
                    }
                })
            }
        })
    },

    switchName: function(e){
        var nameLeft = self.data.nameRight;
        var nameRight = self.data.nameLeft;
        self.setData({
            nameLeft:nameLeft,
            nameRight:nameRight
        })
        if(self.data.nameLeft == '终点'){
            self.setData({
                nameLeft:'起点'
            })
        }
        if(self.data.nameRight == '起点'){
            self.setData({
                nameRight:'终点'
            })
        }
    }
})