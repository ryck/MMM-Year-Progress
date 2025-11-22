# MMM-Year-Progress

This a module for the [MagicMirror](https://github.com/MichMich/MagicMirror).

This module tracks the progress of the year / month.

## Inspiration

- [@year_progress](https://twitter.com/year_progress?lang=en)
- [year_progress](http://progressbarserver.appspot.com/)
- [Progress Bar](https://itunes.apple.com/us/app/progress-bar/id1441939775)

## Screenshots

### Classic


| ![](/screenshots/screenshot_classic.png) |
| :------------- |
| _classic ASCII mode_ |

### Modern

| ![](/screenshots/screenshot_default.png) | ![](/screenshots/screenshot_yellow.png) |
| :------------- | :--------------- |
| _default accent_ | _yellow accent_ |

| ![](/screenshots/screenshot_green.png) | ![](/screenshots/screenshot_purple.png) |
| :------------- | :--------------- |
| _green accent_ | _purple accent_ |

## Installation`

```bash
git clone https://github.com/ryck/MMM-Year-Progress.git && cd MMM-Year-Progress && npm install && cd ..
```

## Config

The entry in `config.js` can include the following options:

| Option           | Description                                                                                       |
| ---------------- | ------------------------------------------------------------------------------------------------- |
| `accent`         | Hex/RGB/CSS color used for the progress bars.<br><br>**Type:** `string`<br>**Default:** `#999` |
| `trackers`       | Space-separated list choosing which trackers to show (`year`, `month`, `week`). Separate each tracker with a single space, not commas.<br><br>**Type:** `string`<br>**Default:** `"year month week"` |
| `modern`         | Use the modern CSS-based progress bars (`true`) or fall back to ASCII blocks for legacy browsers (`false`).<br><br>**Type:** `boolean`<br>**Default:** `false` |
| `updateInterval` | How often the arrival information is updated.<br><br>**Type:** `integer`<br>**Default:** `1 min`  |
| `debug`          | Show debug information. <br><br> **Possible values:** `true` or `false` <br> **Default:** `false` |

Here is an example of an entry in `config.js`

```
{
	module: 'MMM-Year-Progress',
	position: 'bottom_left',
	header: 'Progress',
	config: {
		accent: '#61e9f3ff',
		trackers: 'year week', // note the space-separated values
		modern: true, // set false for ASCII bars (better legacy compatibility)
		updateInterval: 60 * 60 * 1000,
		debug: false,
	}
},
```

## Dependencies

- moment.js (provided by MagicMirror)
- Time itself

## Thanks To...

- [Michael Teeuw](https://github.com/MichMich) for the [MagicMirror2](https://github.com/MichMich/MagicMirror/) framework that made this module possible.
