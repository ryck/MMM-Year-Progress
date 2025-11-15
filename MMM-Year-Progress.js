/* Magic Mirror Module: MMM-Year-Progress
 * Version: 1.0.0
 *
 * By Ricardo Gonzalez https://github.com/ryck/MMM-Year-Progress
 * MIT Licensed.
 */
Module.register("MMM-Year-Progress", {
	defaults: {
		accent: "#999",
		updateInterval: 60 * 1 * 1000, // Every minute
		debug: false,
	},
	start() {
		this.updateTimer = null;
		this.updateDom(0);
		this.scheduleDomUpdate();
	},

	scheduleDomUpdate() {
		const interval = Math.max(this.config.updateInterval, 1000);
		if (this.updateTimer) {
			clearInterval(this.updateTimer);
		}
		this.updateTimer = setInterval(() => this.updateDom(), interval);
	},
	getStyles() {
		return ["MMM-Year-Progress.css"];
	},
	// Define required scripts.
	getScripts() {
		return ["moment.js"];
	},
	//Define header for module.
	getHeader() {
		return this.data.header;
	},
	// Override dom generator.
	getDom() {
		const wrapper = document.createElement("div");
		wrapper.className = "progress-bar";
		wrapper.style.setProperty(
			"--mmm-year-progress-accent",
			this.config.accent || this.defaults.accent,
		);

		const dataTable = document.createElement("table");
		this.collectProgressData().forEach((rowData) => {
			dataTable.appendChild(this.buildRow(rowData));
		});

		wrapper.appendChild(dataTable);
		return wrapper;
	},

	collectProgressData() {
		const today = moment();
		const daysInYear = moment([today.year(), 0, 1]).isLeapYear() ? 366 : 365;
		const daysInMonth = today.daysInMonth();
		const weekLength = 7;

		return [
			{
				type: "year",
				current: today.dayOfYear(),
				total: daysInYear,
			},
			{
				type: "month",
				current: today.date(),
				total: daysInMonth,
			},
			{
				type: "week",
				current: today.isoWeekday(),
				total: weekLength,
			},
		];
	},

	buildRow(data) {
		const row = document.createElement("tr");
		const percent = this.calculatePercent(data.current, data.total);

		row.appendChild(
			this.buildCell(
				`data numbers ${data.type}`,
				`${data.current}/${data.total}`,
			),
		);
		row.appendChild(
			this.buildCell(
				`data bar ${data.type}`,
				this.progressBar(percent, data.type),
			),
		);
		row.appendChild(this.buildCell(`data percent ${data.type}`, `${percent}%`));

		return row;
	},

	buildCell(className, value) {
		const cell = document.createElement("td");
		cell.className = className;
		if (value instanceof Node) {
			cell.appendChild(value);
		} else {
			cell.textContent = value;
		}
		return cell;
	},

	progressBar(percent, type) {
		const track = document.createElement("div");
		track.className = `progress-track ${type || ""}`.trim();
		track.setAttribute("role", "progressbar");
		track.setAttribute("aria-valuenow", percent);
		track.setAttribute("aria-valuemin", "0");
		track.setAttribute("aria-valuemax", "100");

		const fill = document.createElement("div");
		fill.className = "progress-fill";
		fill.style.width = `${percent}%`;

		track.appendChild(fill);
		return track;
	},

	calculatePercent(current, total) {
		if (!total) {
			return 0;
		}
		return Math.max(0, Math.min(100, Math.round((current / total) * 100)));
	},
});
