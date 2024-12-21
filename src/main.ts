const body = document.body
const ball = document.querySelector('.img') as HTMLDivElement
const dangerZone = document.querySelector('.danger-zone') as HTMLDivElement

ball.ondragstart = () => {
	console.log('stared');
}
ball.ondragend = () => {
	console.log('stoped');
}

body.ondragover = (e) => {
	e.preventDefault()
}

dangerZone.ondragenter = () => {
	console.log('Get out from here!')
}

body.ondrop = (e) => {
	const {x, y} = e

	ball.style.top = y + "px"
	ball.style.left = x + "px"
}