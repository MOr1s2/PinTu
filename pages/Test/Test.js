var ms = [
    [// 0
        '已有1人',
        '已有2人',
        '已有3人'
    ],
    [// 1
        [// 1 0
            '还需3人',
            '还需2人',
            '还需1人'
        ],
        [// 1 1
            '还需2人',
            '还需1人'
        ],
        [// 1 2
            '还需1人'
        ]
    ]
];
Page({
    data: {
        multiArray: [
            ['已有1人','已有2人','已有3人'],
            ['还需3人','还需2人','还需1人']
        ],
        multiIndex: [0, 0, 0],
        objectMultiIndex: [0,0,0],
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
    }
})