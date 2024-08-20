export function Task(item) {
	// Создаем главный контейнер
	const taskCard = document.createElement('div')
	taskCard.className = 'task-card'
	taskCard.draggable = true

	// Создаем заголовок карточки
	const taskHeader = document.createElement('div')
	taskHeader.className = 'task-header'

	const taskTitle = document.createElement('h3')
	taskTitle.className = 'task-title'
	taskTitle.textContent = item.Title

	const taskOptions = document.createElement('button')
	taskOptions.className = 'task-options'
	taskOptions.textContent = '⋮'

	taskHeader.appendChild(taskTitle)
	taskHeader.appendChild(taskOptions)

	// Создаем тело карточки
	const taskBody = document.createElement('div')
	taskBody.className = 'task-body'

	const taskDescription = document.createElement('p')
	taskDescription.className = 'task-description'
	taskDescription.textContent = item.Description

	taskBody.appendChild(taskDescription)

	// Создаем футер карточки
	const taskFooter = document.createElement('div')
	taskFooter.className = 'task-footer'

	const commentButton = document.createElement('button')
	commentButton.className = 'task-button'
	commentButton.textContent = 'Add Comment'

	const moveButton = document.createElement('button')
	moveButton.className = 'task-button'
	moveButton.textContent = 'Move'

	taskFooter.appendChild(commentButton)
	taskFooter.appendChild(moveButton)

	// Собираем все части вместе
	taskCard.appendChild(taskHeader)
	taskCard.appendChild(taskBody)
	taskCard.appendChild(taskFooter)

	taskCard.ondragstart = () => {
		taskCard.id = 'selected'

		setTimeout(() => {
			taskCard.classList.add('hide')
		}, 0)
	}

	taskCard.ondragend = () => {
		taskCard.classList.remove('hide')
	}

	return taskCard
}
