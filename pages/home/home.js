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

Page({
    data: {
        code:'',
        app_access_token:'',
        openid:'',
        date:'',
        time:'',
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
        multiIndex: [0, 0]
    },
    onLoad: function (options) {
        self = this;
        self.setData({
        date:mydate,
        nameLeft:'起点',
        nameRight:'终点',
        multiIndex: [myhour*4+Math.ceil(myminute/15), 0],
        multiArray: [
            startTime,
            startTime.slice(myhour*4+Math.ceil(myminute/15),myhour*4+Math.ceil(myminute/15)+4)
        ]
})
    },

    bindDateChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        self.setData({
        date: e.detail.value
        })
    },

    bindMultiPickerChange: function (e) {
        console.log('Multipicker发送选择改变，携带值为', e.detail.value)
        this.setData({
            time: self.data.multiArray[0].slice(e.detail.value[0],e.detail.value[0]+e.detail.value[1]+1),
            multiIndex: e.detail.value
        })
        console.log(self.data.time)
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
                tt.request({
                            url: 'https://open.feishu.cn/open-apis/auth/v3/app_access_token/internal/',
                            method: "POST",
                            data: {
                                "app_id":"cli_9fad765d3175100d",
                                "app_secret":"W4BkcbAdYW6azsnoTUUL1ersWQvDCXLe"
                            },
                            header: {
                                'content-type': 'application/json'
                            },
                            success (res) {
                                self.setData({
                                    app_access_token: res.data.app_access_token
                                })
                                console.log(`token 调用成功 ${res.data.app_access_token}`)
                            },
                            fail (res) {
                                console.log(`token 调用失败`);
                            }
                        });
                tt.login({
                    success (res) {
                        self.setData({
                            code: res.code
                        })
                        tt.request({
                            url: 'https://open.feishu.cn/open-apis/mina/v2/tokenLoginValidate',
                            method: "POST",
                            data: {
                                "app_access_token":self.data.app_access_token,
                                "code": self.data.code
                            },
                            header: {
                                'content-type': 'application/json',
                                'Authorization': self.data.app_access_token
                            },
                            success (res) {
                                self.setData({
                                    openid:res.data.data.open_id
                                })
                                console.log(`code2session 调用成功:${self.data.openid}`);
                            },
                            fail (res) {
                                console.log(`code2session 调用失败`);
                            }
                        });
                        console.log(`login 调用成功 ${self.data.code} `);               
                    },
                    fail (res) {
                        console.log(`login 调用失败`);
                    }
                });
                tt.request({
                    //url: `http://localhost:8080/user/8`,
                    //url: `http://192.168.1.101:8080/user/ou_cd3fdc86c63a91b2bf9ee34cd74fc943`,
                    url: `http://192.168.1.101:8080/user/${self.data.openid}`,
                    method:'GET',
                    success(res) {
                        console.log('open_id为：'+self.data.openid)
                        if(res.data.openid){
                            console.log(`get调用成功，openid为：${res.data.openid}`);
                            app.globalData.account = res.data;
                            try {
                                tt.setStorageSync('account', app.globalData.account);
                            } catch (error) {
                                console.log(`setStorageSync 调用失败`);
                            }
                            tt.navigateTo({
                                url: '/pages/account/account'
                            });
                        /*    
                        } else {
                            console.log(`get调用失败`);
                            tt.getUserInfo({
                                success (res) {
                                    console.log(`getUserInfo 调用成功 ${res.userInfo}`);
                                    tt.request({
                                        //url: `http://localhost:8080/user?avatar=${res.userInfo.avatarUrl}&name=${res.userInfo.nickName}&gender=${0}`,
                                        url: `http://192.168.1.101:8080/user?openid=${self.data.openid}&avatar=${res.userInfo.avatarUrl}&name=${res.userInfo.nickName}&gender=${0}`,
                                        method:'POST',
                                        success(res) {
                                            app.globalData.account = res.data;
                                            try {
                                                tt.setStorageSync('account', app.globalData.account);
                                            } catch (error) {
                                                console.log(`setStorageSync 调用失败`);
                                            }
                                            tt.navigateTo({
                                                url: '/pages/account/account'
                                            });  
                                            console.log(`post调用成功，openid为：${res.data.openid}`);  
                                        },
                                        fali(res){
                                            console.log(`post调用失败：${res.data}`); 
                                        }
                                    });
                                },
                                fail (res) {
                                    console.log(`getUserInfo 调用失败`);
                                }
                            })                            
                        } 
                        */
                        }
                    },     
                    fail(res){
                        console.log(`get调用失败`);
                    }    
                });
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