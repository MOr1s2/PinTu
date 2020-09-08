var ms = [
    [// 0
        '已有1人',
        '已有2人',
        '已有3人'
    ],
    [// 1
        [// 1 0
            '最多4人',
            '最多3人',
            '最多2人'
        ],
        [// 1 1
            '最多4人',
            '最多3人'
        ],
        [// 1 2
            '最多4人'
        ]
    ]
];
Page({
    data: {
        multiArray: [
            ['已有1人','已有2人','已有3人'],
            ['最多4人','最多3人','最多2人']
        ],
        multiIndex: [0, 0, 0],
        objectMultiIndex: [0,0,0],
		icon:"/icon/add.png" 
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