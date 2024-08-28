const baseUrl = 'http://localhost:8080/'

export function Column(item) {
	const col = document.createElement('div')

	const trash_img = document.querySelector('#trash')

	col.classList.add('desk_container')

	col.ondragover = event => {
		event.preventDefault()
		trash_img.style.display = 'block'

		col.style.border = 'none'
	}
	col.ondragenter = event => {
		event.preventDefault()

		col.style.border = '2px solid white'
	}
	col.ondragleave = () => {
		col.style.border = 'none'
	}
	col.ondrop = () => {
		const selectedTask = document.getElementById('selected')
		trash_img.style.display = 'none'
		col.style.border = 'none'
		col.append(selectedTask)
		selectedTask.removeAttribute('id')

		fetch(`${baseUrl}info/${selectedTask.getAttribute('data-id')}`, {
			method: 'PATCH',
			body: JSON.stringify({ status: item.status + 1 }),
		})
	}

	return col
}
