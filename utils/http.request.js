import axios from 'axios'

export class ApiCall {
	constructor(url, token = null) {
		this.url = url
		this.token = token
	}

	async getData(path) {
		try {
			const res = await axios.get(this.url + path)

			if (res.status !== 200) {
				throw new Error('Something went wrong')
			}
			return res.data
		} catch (e) {
			alert(e.message)
			throw new Error(e.message)
		}
	}

	async postData(path, body) {
		try {
			const res = await axios.post(this.url + path, body)

			if (res.status !== 201) {
				throw new Error('Something went wrong')
			}
			return res.data
		} catch (e) {
			throw new Error(e.message)
		}
	}

	async patchData(path, body) {
		try {
			const res = await axios.patch(this.url + path, body)

			if (res.status !== 200) throw new Error('Something went wrong')
			Toastify({
				text: 'Patched successfuly',
				duration: 3000,
				destination: 'https://github.com/apvarun/toastify-js',
				newWindow: true,
				close: true,
				gravity: 'top',
				position: 'right',
				stopOnFocus: true,
				style: {
					background: 'linear-gradient(to right, red,red)',
				},
				onClick: function () {},
			}).showToast()
			return res.data
		} catch (e) {
			Toastify({
				text: e.message,
				duration: 3000,
				destination: 'https://github.com/apvarun/toastify-js',
				newWindow: true,
				close: true,
				gravity: 'top',
				position: 'right',
				stopOnFocus: true,
				style: {
					background: 'linear-gradient(to right, red, red)',
				},
				onClick: function () {},
			}).showToast()
			throw new Error(e.message)
		}
	}

	async deleteData(path) {
		try {
			const res = await axios.delete(this.url + path)

			if (res.status === 201 || res.status === 200) {
				throw new Error('Something went wrong')
			}
			return res.data
		} catch (e) {
			throw new Error(e.message)
		}
	}
}
