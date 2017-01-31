import { stringify } from 'querystring'

const weatherAPI = 'http://api.openweathermap.org/data/2.5/weather?APPID=a5b44d175d779cec67ddc81ce214b437&units=metric&q='

const fetchURL = (url, city) => {
	return fetch(url + stringify(city)).then(res => res.json())
}

export const search = (params) => {
	return fetchURL(weatherAPI + params.city)
}