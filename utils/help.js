export function reload(arr, component, places, isTasks = true) {
	places.forEach(el => (el.innerHTML = ''))

	for (let item of arr) {
		const elem = component(item)

		places[isTasks ? item.status - 1 : 0].append(elem)
	}
}
