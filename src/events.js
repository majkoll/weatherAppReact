export const on = (event, handler) => {
	window.addEventListener(event, handler, false)
}

export const off = (event, handler) => {
	window.removeEventListener(event, handler)
}

export const fire = (event) => {
	window.dispatchEvent(new Event(event))
}

export default {
	on, off, fire
}