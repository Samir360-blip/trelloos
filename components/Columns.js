export function Column(item) {
	const col = document.createElement('div')

	col.classList.add('col')

	col.ondragover = event => {
		event.preventDefault()
		trash_img.style.display = 'block'
	}
	col.ondragenter = event => {
		event.preventDefault()
    col.style.border = "2px solid white"
	}
	col.ondragleave = () => {}
	col.ondrop = () => {
		const selectedTask = document.getElementById('selected')
		trash_img.style.display = 'none'
    col.style.border = 'none'

		col.append(selectedTask)
		selectedTask.removeAttribute('id')

		fetch(`${baseUrl}info/${selectedTask.getAttribute('data-id')}`, {
			method: 'PATCH',
			body: JSON.stringify({ status: idx + 1 }),
		})
	}

	return col
}
