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
		trackers: "year month week",
		modern: false,
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
		const trackerData = {
			year: {
				type: "year",
				current: today.dayOfYear(),
				total: daysInYear,
			},
			month: {
				type: "month",
				current: today.date(),
				total: daysInMonth,
			},
			week: {
				type: "week",
				current: today.isoWeekday(),
				total: weekLength,
			},
		};

		return this.getEnabledTrackers()
			.map((type) => trackerData[type])
			.filter(Boolean);
	},

	getEnabledTrackers() {
		const defaults = ["year", "month", "week"];
		const configured =
			this.config.trackers ?? this.defaults.trackers ?? defaults;
		let tokens = [];
		if (Array.isArray(configured)) {
			tokens = configured;
		} else if (typeof configured === "string") {
			tokens = configured.split(/\s+/);
		} else {
			tokens = defaults;
		}
		const normalized = Array.from(
			new Set(
				tokens
					.map((token) => token?.toString().trim().toLowerCase())
					.filter(Boolean),
			),
		);
		const valid = normalized.filter((token) => defaults.includes(token));
		return valid.length ? valid : defaults;
	},

	buildRow(data) {
		const row = document.createElement("tr");
		const percent = this.calculatePercent(data.current, data.total);
		const barClass = this.config.modern ? "modern" : "classic";
		const barContent = this.renderBar(percent, data.type);

		row.appendChild(
			this.buildCell(
				`data numbers ${data.type}`,
				`${data.current}/${data.total}`,
			),
		);
		row.appendChild(
			this.buildCell(`data bar ${data.type} ${barClass}`, barContent),
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

	renderBar(percent, type) {
		return this.config.modern
			? this.renderModernBar(percent, type)
			: this.renderAsciiBar(percent);
	},

	renderModernBar(percent, type) {
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

	renderAsciiBar(percent) {
		let bar = "";
		for (let i = 5; i <= 100; i += 5) {
			bar += i <= percent ? "▓" : "░";
		}
		return bar;
	},

	calculatePercent(current, total) {
		if (!total) {
			return 0;
		}
		return Math.max(0, Math.min(100, Math.round((current / total) * 100)));
	},
});
