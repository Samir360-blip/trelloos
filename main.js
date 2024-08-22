import { Task } from './components/Task.js'
import { reload } from './utils/helpres.js'
import { ApiCall } from './utils/http.request.js'
import { Toast } from 'toaster-js'
import 'toaster-js/default.scss'

const apiCall = new ApiCall('http://localhost:8080')
const baseUrl = 'http://localhost:8080/'

const info = await apiCall.getData('/info')

const cols = document.querySelectorAll('.desk_container')

reload(info, Task, cols)

cols.forEach((col, idx) => {
	col.ondragover = event => {
		event.preventDefault()
		trash_img.style.display = 'block'
	}
	col.ondragenter = event => {
		event.preventDefault()
	}
	col.ondragleave = () => {}
	col.ondrop = () => {
		const selectedTask = document.getElementById('selected')
		trash_img.style.display = 'none'

		col.append(selectedTask)
		selectedTask.removeAttribute('id')

		fetch(`${baseUrl}info/${selectedTask.getAttribute('data-id')}`, {
			method: 'PATCH',
			body: JSON.stringify({ status: idx + 1 }),
		})
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

	const info = {}

	const fm = new FormData(e.target)

	fm.forEach((val, key) => (info[key] = val))

	const res = await apiCall.postData('/info', info)

	if (res.status !== 201) {
		form.reset()
		location.assign('/')
	}
}

const trash = document.querySelector('.trash')
const trash_img = document.querySelector('#trash')

trash_img.ondragover = e => {
	e.preventDefault()
}

trash_img.ondrop = async e => {
	e.preventDefault()

	const selectedTask = document.querySelector('#selected')

	const id = selectedTask.getAttribute('data-id')
	

	trash_img.style.display = 'none'

	const res = await fetch(`${baseUrl}` + 'info/' + id, {
		method: 'delete',
	})
	selectedTask.remove()

	if (res.status !== 200 || res.status == 201) {
		new Toast('Ошибка в коде ')
	}

	const audio = document.querySelector('audio')

	const source = document.createElement('source')

	source.src = './public/dropping-a-pen-on-wood-103665.mp3'
	source.type = 'audio/mpeg'

	audio.append(source)

	audio.play()
}
