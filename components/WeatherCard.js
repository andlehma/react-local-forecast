import React from 'react';
const days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

function mode(arr) {
	let mapping = {};
	let greatestFreq = 0;
	let mode;
	arr.forEach(x => {
		mapping[x] = (mapping[x] || 0) + 1;
		if (greatestFreq <= mapping[x]) {
			greatestFreq = mapping[x];
			mode = x;
		}
	});
	return mode
}

function WeatherCard(props) {
	let date = new Date(props.data.date);
	let today = new Date();
	let dayOfWeek = days[date.getDay()];
	let highTemp = Math.max(...props.data.temps);
	let lowTemp = Math.min(...props.data.temps);
	let icons = props.data.weather.map(x => x.icon.substring(0, x.icon.length - 1)); // strip last character of icon name
	let iconMode = mode(icons);
	return (
		<div className={date.getDate() === today.getDate() ? "weather-card today" : "weather-card"}>
			{dayOfWeek}
			<br />
			<img src={"icons/" + iconMode + ".png"}></img>
			<br />
			<p className="high-temp">{highTemp.toFixed(0)}&deg;F</p>/<p className="low-temp">{lowTemp.toFixed(0)}&deg;F</p>
		</div>
	);
}

export default WeatherCard;