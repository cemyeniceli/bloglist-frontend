import React, { useState } from 'react'
import propTypes from 'prop-types'

const LoginForm = ({ handleLogin }) => {

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const login = (event) => {
		event.preventDefault()
		handleLogin(username, password)
		setUsername('')
		setPassword('')
	}

	return (
		<div className='loginForm'>
			<form onSubmit={login}>
				<div>
                    username
					<input id="username" type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)} />
				</div>
				<div>
                    password
					<input id="password" type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)} />
				</div>
				<button id='login-button' type="submit">login</button>
			</form>
		</div>

	)
}

LoginForm.propTypes = {
	handleLogin: propTypes.func.isRequired
}

export default LoginForm