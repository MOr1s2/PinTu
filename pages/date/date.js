const date = new Date()
const years = []
const months = []
const days = []
for (let i = date.getFullYear()-2; i <= date.getFullYear()+2; i++) {
	years.push(i)
}
for (let i = 1; i <= 12; i++) {
	months.push(i)
}
for (let i = 1; i <= 31; i++) {
	days.push(i)
}
Page({
	data: {
		years: years,
		months: months,
		days: days,
		value: [2,date.getMonth(),date.getDate()-1],
	},

    onLoad: function (options) {
        self = this;
    },

	bindChange: function (e) {
		const val = e.detail.value
		this.setData({
			year: this.data.years[val[0]],
			month: this.data.months[val[1]],
			day: this.data.days[val[2]]
		})
	}
})