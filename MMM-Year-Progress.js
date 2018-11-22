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
		var wrapper = document.createElement("div");
		wrapper.className = "small align-right progress-bar"

		// Year
		var yearWrapper = document.createElement("div");
		date = new Date()
		const initialDate = new Date(date.getFullYear(), 0, 1)
		const isLeapYear = year => {
			return year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)
		}
		const dayYear = Math.floor((((date - initialDate) / (1000 * 60 * 60 * 24))))
		const daysInYear = isLeapYear(date.getFullYear()) ? 366 : 365
		const percentYear = Math.floor((dayYear / daysInYear) * 100)
		const yearBar = this.progressBar(percentYear)
		const yearDisplay = dayYear + "/" + daysInYear + " " + yearBar + " " + percentYear + "%"
		yearWrapper.innerHTML = yearDisplay;

		wrapper.appendChild(yearWrapper);

		// Month
		var monthWrapper = document.createElement("div");
		const daysInMonth = new Date(moment().year(), moment().month() + 1, 0).getDate();
		const dayMonth = moment().date();
		const percentMonth = Math.floor(dayMonth/daysInMonth*100);
		const monthBar = this.progressBar(percentYear)
		const monthDisplay = dayMonth + "/" + daysInMonth + " " + monthBar + " " + percentMonth + "%"
		monthWrapper.innerHTML = monthDisplay

		wrapper.appendChild(monthWrapper);

		return wrapper;
	},

	progressBar: function(percent) {
		let progressBar = ""
		for (let i = 5; i <= 100; i += 5) {
			progressBar = (i < percent) ? progressBar + "▓" : progressBar + "░"
		}
		return progressBar
	}
});
