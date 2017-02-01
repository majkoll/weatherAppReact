import React from 'react'
import { CountryCodeToCountry, SetWeatherIcon } from '../util.js'

import './ResultListItem.css'
import './animations.css'

const ResultListItem = ({ item }) => {
	let country = item.sys.country ? CountryCodeToCountry(item.sys.country) : ''
	let weatherIcon = SetWeatherIcon(item.weather[0].icon)
	return (
		<article className="ResultListItem expandUp" key={item.id}>
			<header>
				<h2>{item.name}, {country}</h2>
			</header>
			<div className="weather">
				<span>{item.main.temp.toFixed(0)}&#x2103;, {item.weather[0].description}</span>
			</div>
			<div className="weatherIcon">
				<i data-icon={weatherIcon}></i>
			</div>
			
			
		</article>
	)
}

export default ResultListItem