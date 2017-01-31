import React from 'react'
import './ResultListItem.css'
import './animations.css'

const ResultListItem = ({ item }) => {
	return (
		<article className="ResultListItem expandUp" key={item.id}>
			<h3>{item.name}, {item.sys.country}</h3>
			<div className="weather">
				<span>{item.main.temp.toFixed(0)}&#x2103;, {item.weather[0].description}</span>
			</div>
		</article>
	)
}

export default ResultListItem