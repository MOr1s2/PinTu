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
        multiArray: [
            startTime,
            startTime
        ],
        multiIndex: [0, 0, 0],
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