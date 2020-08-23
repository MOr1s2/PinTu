Page({
  data: {
      code:"",
      app_access_token:"",
  },

  onLoad: function (options) {
    self = this
  },

  test: function(e){
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
                    console.log(`code2session 调用成功 ${res.data.code}`);
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
  }
})