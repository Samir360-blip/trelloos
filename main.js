import { Column } from './components/Columns.js'
import { Task } from './components/Task.js'
import { reload } from './utils/helpres.js'
import { ApiCall } from './utils/http.request.js'
import { Toast } from 'toaster-js'
import 'toaster-js/default.scss'

const apiCall = new ApiCall(import.meta.env.VITE_API_URL)
const baseUrl = 'http://localhost:8080/'

const info = await apiCall.getData('/info')
const cols_arr = await apiCall.getData('/columns')
const desk_cont = document.querySelector('.desk_cont')
const cols = document.querySelectorAll('.col')

// reload(info, Task,cols)
reload(cols_arr, Column, [desk_cont], false)

const close_dialog = document.querySelector('.close_dialog')
const overlay = document.querySelector('#overlay')
const add_btn = document.querySelector('#add_btn')
const select = document.querySelector('#status')
close_dialog.onclick = () => {
	overlay.style.display = 'none' // Скрываем диалог
}

add_btn.onclick = () => {
	overlay.style.display = 'flex' // Показываем диалог
}
const overlay_column = document.querySelector('#overlay_column')
const board = document.querySelector('#board')

board.onclick = () => {
	overlay_column.style.display = "flex"
}

const close_dialogs = document.querySelector('.close_dialogs')

close_dialogs.onclick = () => {
	overlay_column.style.display = 'none'
}


const columntask = document.forms.namedItem('column-task')



columntask.onsubmit = async (e) => {
	e.preventDefault()

	const column = {}

	const fm = new FormData(e.target)

	fm.forEach((val,key) => (column[key] = val))

	const res = await apiCall.postData('/columns', column)

	if (res.status !== 201) {
		form.reset()
		location.assign('/')
	}
}
const form = document.forms.namedItem('task-form')

for (let item of cols_arr) {
	const opt = new Option(item.title, item.status)

	select.append(opt)
}
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

	source.src = '/dropping-a-pen-on-wood-103665.mp3'
	source.type = 'audio/mpeg'

	audio.append(source)

	audio.play()
}
