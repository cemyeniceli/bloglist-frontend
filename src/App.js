import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/Login'
import Notification from './components/Notification'
import AddBlogForm from './components/AddBlog'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [errorMessage, setErrorMessage] = useState({ type:'success', content:'' })
	const [user, setUser] = useState(null)
	const sortByLikes = (blogs) => blogs.sort((a,b) => b.likes - a.likes)

	useEffect(() => {
		blogService.getAll().then(blogs => {
			setBlogs(sortByLikes(blogs))
		})
	}, [])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			blogService.setToken(user.token)
		}
	},[])

	const addBlogFormRef = useRef()

	const handleLogin = async (username, password) => {
		try {
			const user = await loginService.login({ username, password })
			const userId = await userService.getUserIdByUsername(username)
			user.id = userId
			window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
			blogService.setToken(user.token)
			setUser(user)
			setErrorMessage({ type:'success', content:`User ${user.name} is logged in` })
			setTimeout(() => {setErrorMessage({ type:'success', content:'' })}, 2000)
		} catch (exception) {
			setErrorMessage({ type:'error', content:'Wrong credentials' })
			setTimeout(() => {setErrorMessage({ type:'error', content:'' })}, 3000)
		}
	}

	const handleLogout = () => {
		window.localStorage.removeItem('loggedBlogappUser')
		setUser(null)
		setErrorMessage({ type:'error', content:'' })
	}

	const addNewBlog = async (newBlog) => {
		try {
			const addedBlog = await blogService.create(newBlog)
			addBlogFormRef.current.toggleVisibility()
			setBlogs(sortByLikes(blogs.concat(addedBlog)))
			setErrorMessage({ type:'success', content:`a new blog ${addedBlog.title} by ${addedBlog.author} added` })
			setTimeout(() => {setErrorMessage({ type:'success', content:'' })}, 3000)
		} catch (exception){
			setErrorMessage({ type:'error', content:'Blog can not be added' })
			setTimeout(() => {setErrorMessage({ type:'error', content:'' })}, 3000)
		}
	}

	const handleLike = (blog) => {
		blogService
			.increaseLikes(blog)
			.then((updatedBlog) => {
				const blogIndex = blogs.findIndex((blog) => blog.id === updatedBlog.id)
				const newBlogs = [...blogs]
				newBlogs[blogIndex] = updatedBlog
				setBlogs(sortByLikes(newBlogs))
			})
	}

	const handleDelete = (blogToDelete) => {

		if (window.confirm(`Remove blog ${blogToDelete.title} by ${blogToDelete.author}`)) {
			blogService
				.remove(blogToDelete)
				.then((response) => {
					if (response === 204) {
						const newBlogs = blogs.filter((blog) => blog.id !== blogToDelete.id)
						setBlogs(sortByLikes(newBlogs))
					}
				})
		}
	}

	return (
		<div>
			{user === null ?
				<div>
					<h2>log in to application</h2>
					<Notification message={errorMessage} />
					<Togglable buttonLabel='login' isShownOnDefault={true}>
						<LoginForm handleLogin={handleLogin}/>
					</Togglable>
				</div>:
				<div>
					<h2>blogs</h2>
					<Notification message={errorMessage} />
					<p>{user.name} logged-in <button onClick={handleLogout}>logout</button></p>
					<Togglable buttonLabel='create new blog' ref={addBlogFormRef} isShownOnDefault={false}>
						<AddBlogForm addNewBlog={addNewBlog}/>
					</Togglable>
				</div>
			}
			{blogs.map(blog => {
				const blogUserID = blog.user.id || blog.user
				if (user && (blogUserID === user.id)) {
					return <Blog key={blog.id} blog={blog} handleLike={handleLike} handleDelete={handleDelete} ownedByUser={true}/>
				} else {
					return <Blog key={blog.id} blog={blog} handleLike={handleLike} handleDelete={handleDelete} ownedByUser={false}/>
				}
			})
			}
		</div>
	)
}

export default App