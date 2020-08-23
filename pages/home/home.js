// pages/home/home.js
var startHour = ['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23'];
var startMinute = ['00','15','30','45'];
var startTime = [];
var endTime = [];
for (var i = 0; i < 24; i++) {
    for(var j = 0; j < 4; j++ ){
        startTime.push(startHour[i]+':'+startMinute[j])
    } 
}
startTime.push('24:00')

for (i = 1;i <= 96; i++){
    endTime.push(startTime.slice(i,i+4))
}

var ms = [
    startTime //0
    ,
    endTime //1
];

Page({
    data: {
        date:"",
        nameLeft: '',
        addressLeft: '',
        latitudeLeft: '',
        longitudeLeft: '',
        nameRight: '',
        addressRight: '',
        latitudeRight: '',
        longitudeRight: '',
        multiArray: [
            startTime,
            startTime
        ],
        multiIndex: [0, 0],
    },
    onLoad: function (options) {
        self = this;
        var myDate = new Date();
        var mymonth = `${myDate.getMonth()}`;
        var myday =  `${myDate.getDate()}`;
        var myhour = myDate.getHours();
        var myminute = myDate.getMinutes();
        if(myDate.getMonth()<10){
            mymonth = `0${myDate.getMonth()+1}`
        }
        if(myDate.getDate()<10){
            myday =  `0${myDate.getDate()}`
        }
        var mydate = `${myDate.getFullYear()}-${mymonth}-${myday}`;
        console.log(myhour)
        console.log(Math.floor(myminute/15))
        self.setData({
            date:mydate,
            nameLeft:'起点',
            nameRight:'终点',
            multiIndex: [myhour*4+Math.ceil(myminute/15), myhour*4+Math.ceil(myminute/15)],
            })
    },

    bindDateChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        self.setData({
        date: e.detail.value
        })
    },

    bindMultiPickerChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            multiIndex: e.detail.value
        })
    },
    bindMultiPickerColumnChange: function (e) {
        // return;
        console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
        var data = {
            multiArray: this.data.multiArray,
            multiIndex: this.data.multiIndex
        };
        switch (e.detail.column) {
            case 0:
                data.multiIndex[0] = e.detail.value;
                data.multiIndex[1] = 0;
                data.multiArray[1] = ms[1][data.multiIndex[0]];
                break;
            case 1:
                data.multiIndex[1] = e.detail.value;
                break;
        }
        this.setData(data);
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
                    //url: `http://192.168.1.109:8080/${app.globalData.account.id}`,
                    url: `http://192.168.1.109:8080/user/1`,
                    method:'get',
                    success(res) {
                        if(!res){
                            console.log(`get调用结果为${res}`); 
                        }else{
                            console.log(`get调用成功：${res.data.id}`);
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
                                    url: `http://192.168.1.109:8080/user?id=${app.globalData.account.id}&avatar=${res.userInfo.avatarUrl}&name=${res.userInfo.nickName}&gender=${2}`,
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
                        return self.data.nameLeft
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
                        return self.data.nameRight
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
    },

    search: function(e){
        tt.navigateTo({
            url: "/pages/result/result",
            //url: "/pages/Test/Test",
            success (res) {
                console.log(`${res}`);
            },
            fail (res) {
                console.log(`navigateTo 调用失败`);
            }
        });
    }
})