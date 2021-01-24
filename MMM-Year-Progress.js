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
		wrapper.className = "small progress-bar"

		// Start building table.
		const dataTable = document.createElement("table");

		let yearRow = document.createElement("tr");
		let monthRow = document.createElement("tr");
		let weekRow = document.createElement("tr");

		let yearNumberCell = document.createElement("td");
		yearNumberCell.className = "data numbers year";
		let yearBarCell = document.createElement("td");
		yearBarCell.className = "data bar year";
		let yearPercentCell = document.createElement("td");
		yearPercentCell.className = "data percent year";

		let monthNumberCell = document.createElement("td");
		monthNumberCell.className = "data numbers month";
		let monthBarCell = document.createElement("td");
		monthBarCell.className = "data bar month";
		let monthPercentCell = document.createElement("td");
		monthPercentCell.className = "data percent month";

		let weekNumberCell = document.createElement("td");
		weekNumberCell.className = "data numbers week";
		let weekBarCell = document.createElement("td");
		weekBarCell.className = "data bar week";
		let weekPercentCell = document.createElement("td");
		weekPercentCell.className = "data percent week";

		// Year
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
		const dayYear = Math.round((((date - initialDate) / (1000 * 60 * 60 * 24))))
		const daysInYear = isLeapYear(date.getFullYear()) ? 366 : 365
		const percentYear = Math.floor((dayYear / daysInYear) * 100)
		const yearBar = this.progressBar(percentYear)
		yearNumberCell.innerHTML = dayYear + "/" + daysInYear
		yearBarCell.innerHTML = yearBar
		yearPercentCell.innerHTML = percentYear + "%"

		yearRow.append(yearNumberCell)
		yearRow.append(yearBarCell)
		yearRow.append(yearPercentCell)

		dataTable.appendChild(yearRow);

		// Month
		const daysInMonth = new Date(moment().year(), moment().month() + 1, 0).getDate();
		const dayMonth = moment().date();
		const percentMonth = Math.floor(dayMonth/daysInMonth*100);
		percentWrapper = percentMonth + "%"
		const monthBar = this.progressBar(percentMonth)

		monthNumberCell.innerHTML = dayMonth + "/" + daysInMonth
		monthBarCell.innerHTML = monthBar
		monthPercentCell.innerHTML = percentMonth + "%"

		monthRow.append(monthNumberCell)
		monthRow.append(monthBarCell)
		monthRow.append(monthPercentCell)

		dataTable.appendChild(monthRow);

		// Week
		const weekDay = moment().isoWeekday()
		const percentWeek = Math.floor(weekDay/7*100);
		percentWrapper = percentWeek + "%"
		const weekBar = this.progressBar(percentWeek)

		weekNumberCell.innerHTML = weekDay + "/" + 7
		weekBarCell.innerHTML = weekBar
		weekPercentCell.innerHTML = percentWeek + "%"

		weekRow.append(weekNumberCell)
		weekRow.append(weekBarCell)
		weekRow.append(weekPercentCell)

		dataTable.appendChild(weekRow);

		wrapper.appendChild(dataTable);

		return wrapper;
	},

	progressBar: function(percent) {
		let progressBar = ""
		for (let i = 5; i <= 100; i += 5) {
			progressBar = (i <= percent) ? progressBar + "▓" : progressBar + "░"
		}
		return progressBar
	}
});
