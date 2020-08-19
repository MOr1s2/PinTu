// pages/log/log.js
Page({
  data: {
      code:"",
      app_access_token:"",
      tenant_access_token:""
  },

  onLoad: function (options) {
    self = this
  },

  test: function(e){
    tt.request({
        url: 'https://open.feishu.cn/open-apis/auth/v3/app_access_token/internal/',
        method: "POST",
        data: {
            "app_id":"cli_slkdjalasdkjasd",
            "app_secret":"dskLLdkasdjlasdKK"
        },
        header: {
            'content-type': 'application/json'
        },
        success (res) {
            self.setData({
                app_access_token: res.app_access_token,
                tenant_access_token: res.tenant_access_token
            })
            console.log(`app_access_token 调用成功 ${res}`);
        },
        fail (res) {
            console.log(`app_access_token 调用失败`);
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
                    "code": self.data.code
                },
                header: {
                    'content-type': 'application/json',
                    'Authorization': self.data.app_access_token
                },
                success (res) {
                    console.log(`code2session 调用成功 ${res}`);
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