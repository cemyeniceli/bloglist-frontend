import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
	token = `bearer ${newToken}`
}

const getAll = async () => {
	const response = await axios.get(baseUrl)
	return response.data
}

const create = async newBlog => {
	const config = {
		headers: { Authorization: token }
	}

	const response = await axios.post(baseUrl, newBlog, config)
	return response.data
}

const increaseLikes = async (blogToUpdate) => {
	const id = blogToUpdate.id
	const numLikes = blogToUpdate.likes + 1
	const blog = { ...blogToUpdate, likes:numLikes }
	const response = await axios.put(`${baseUrl}/${id}`, blog)
	return response.data
}

const remove = async (blogToDelete) => {
	const config = {
		headers: { Authorization: token }
	}

	const id = blogToDelete.id
	const response = await axios.delete(`${baseUrl}/${id}`, config)
	return response.status
}

const blogService = { getAll, create, setToken, increaseLikes, remove }

export default blogService