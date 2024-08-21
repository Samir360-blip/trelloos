import { Task } from './components/Task.js'
import { reload } from './utils/helpres.js'
import { ApiCall } from './utils/http.request.js'

const apiCall = new ApiCall('http://localhost:8080')

const info = await apiCall.getData('/info')

const cols = document.querySelectorAll('.desk_container')

reload(info, Task, cols)

cols.forEach(col => {
	col.ondragover = event => {
		event.preventDefault()
	}
	col.ondragenter = event => {
		event.preventDefault()
	}
	col.ondragleave = () => {}
	col.ondrop = () => {
		const selectedTask = document.getElementById('selected')

		col.append(selectedTask)
		selectedTask.removeAttribute('id')
	}
})

const close_dialog = document.querySelector('.close_dialog')
const overlay = document.querySelector('#overlay')
const add_btn = document.querySelector('#add_btn')

close_dialog.onclick = () => {
	overlay.style.display = 'none' // Скрываем диалог
}

add_btn.onclick = () => {
	overlay.style.display = 'flex' // Показываем диалог
}

const form = document.forms.namedItem('task-form')

form.onsubmit = async e => {
	e.preventDefault()

	const info = {
		Title: new FormData(form).get('title'),
		Description: new FormData(form).get('description'),
		status: new FormData(form).get('status'),
	}

	const res = await apiCall.postData('/info', info)

	if (res.status !== 201) {
		form.reset()
		location.assign('/')
	}
}
