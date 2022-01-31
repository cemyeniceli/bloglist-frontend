import axios from 'axios'
const baseUrl = '/api/users'

const getUserIdByUsername = async username => {
	const response = await axios.get(`${baseUrl}/${username}`)
	return response.data.id
}

const userService = { getUserIdByUsername }

export default userService