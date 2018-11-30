/* Magic Mirror Module: MMM-Year-Progress
 * Version: 1.0.0
 *
 * By Ricardo Gonzalez https://github.com/ryck/MMM-Year-Progress
 * MIT Licensed.
 */
Module.register("MMM-Year-Progress", {
	defaults: {
		updateInterval: 60 * 1 * 1000, // Every minute
		debug: false
	},
	start: function() {
		var self = this;
		setInterval(function() {
			self.updateDom(); // no speed defined, so it updates instantly.
		}, this.config.updateInterval);
	},
	getStyles: function() {
		return ["MMM-Year-Progress.css"];
	},
	// Define required scripts.
	getScripts: function() {
		return ["moment.js"];
	},
	//Define header for module.
	getHeader: function() {
		return this.data.header;
	},
	// Override dom generator.
	getDom: function() {
		let wrapper = document.createElement("div");
		wrapper.className = "small align-right progress-bar"

		// Year
		let yearWrapper = document.createElement("div");
		let numWrapper = document.createElement("span");
		numWrapper.className="numbers"
		let barWrapper = document.createElement("span");
		barWrapper.className = "bar"
		let percentWrapper = document.createElement("span");
		percentWrapper.className = "percent"
		date = new Date()
		const initialDate = new Date(date.getFullYear(), 0, 1)
		const isLeapYear = year => {
			return year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)
		}
		const dayYear = Math.floor((((date - initialDate) / (1000 * 60 * 60 * 24))))
		const daysInYear = isLeapYear(date.getFullYear()) ? 366 : 365
		const percentYear = Math.floor((dayYear / daysInYear) * 100)
		const yearBar = this.progressBar(percentYear)
		numWrapper = dayYear + "/" + daysInYear
		barWrapper = yearBar
		percentWrapper = percentYear + "&%"
		const yearDisplay = numWrapper + " " + barWrapper + " " + percentWrapper
		yearWrapper.innerHTML = yearDisplay;

		wrapper.appendChild(yearWrapper);

		// Month
		var monthWrapper = document.createElement("div");
		const daysInMonth = new Date(moment().year(), moment().month() + 1, 0).getDate();
		const dayMonth = moment().date();
		const percentMonth = Math.floor(dayMonth/daysInMonth*100);
		console.log('percentMonth', percentMonth);
		const monthBar = this.progressBar(percentMonth)
		const monthDisplay = dayMonth + "/" + daysInMonth + " " + monthBar + " <span class='percent'>" + percentMonth + "%</span>"
		monthWrapper.innerHTML = monthDisplay

		wrapper.appendChild(monthWrapper);

		// Week
		var weekWrapper = document.createElement("div");
		const weekDay = moment().isoWeekday()
		const percentWeek = Math.floor(weekDay/7*100);
		console.log('percentWeek', percentWeek);
		const weekBar = this.progressBar(percentWeek)
		const weekDisplay = weekDay + "/7" + " " + weekBar + " <span class='percent'>" + percentWeek + "%</span>"
		weekWrapper.innerHTML = weekDisplay

		wrapper.appendChild(weekWrapper);

		return wrapper;
	},

	progressBar: function(percent) {
		console.log('percent', percent);
		let progressBar = ""
		for (let i = 5; i <= 100; i += 5) {
			console.log('i', i);

			progressBar = (i <= percent) ? progressBar + "▓" : progressBar + "░"
			console.log('progressBar', progressBar);
		}
		return progressBar
	}
});
