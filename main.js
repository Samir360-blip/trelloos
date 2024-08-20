import { Task } from './components/Task.js'
import { reload } from './utils/helpres.js'
import { ApiCall } from './utils/http.request.js'

// const arr = [
// 	{
// 		id: 1,
// 		title: 'Buy milk',
// 		description: 'Lorem ipsum dolor sit amet',
// 		status: '1',
// 	},
// 	{
// 		id: 2,
// 		title: 'hello world',
// 		description: 'Lorem ipsum dolor sit amet',
// 		status: '2',
// 	},
// 	{
// 		id: 3,
// 		title: 'bye bye',
// 		description: 'Lorem ipsum dolor sit amet',
// 		status: '3',
// 	},
// ]

const apiCall = new ApiCall('http://localhost:8080')


const info = apiCall.getData('/info')

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



form.onsubmit = async (e) => {
  e.preventDefault()

  const info = {
		Title: new FormData(form).get('title'),
		Description: new FormData(form).get('description'),
		Labels: new FormData(form).get('status'),
	}

  const res = await apiCall.postData('/info', info)

	if (res.status !== 201) {
		form.reset()
		location.assign('/')
	}
}