import React, { useState } from 'react'
import propTypes from 'prop-types'

const Blog = ({ blog, handleLike, handleDelete, ownedByUser }) => {

	const [visible, setVisible] = useState(false)

	const hideWhenVisible = { display: visible ? 'none' : '' }
	const showWhenVisible = { display: visible ? '' : 'none' }

	const showWhenOwnedByUser = { display: ownedByUser ? '' : 'none' }
	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5
	}

	const toggleVisibility = () => {
		setVisible(!visible)
	}

	const likeBlog = (blog) => {
		const handler = () => handleLike(blog)
		return handler
	}

	const deleteBlog = (blog) => {
		const handler = () => handleDelete(blog)
		return handler
	}

	return (
		<div style={blogStyle} className='blog'>
			<div style={hideWhenVisible} className='defaultView'>
				{blog.title} {blog.author}<button onClick={toggleVisibility}>view</button>
			</div>
			<div style={showWhenVisible} className='detailView'>
				{blog.title} {blog.author}<button onClick={toggleVisibility}>hide</button>
				<div>{blog.url}</div>
				<div>likes <span className='numberOfLikes'>{blog.likes}</span> <button onClick={likeBlog(blog)}>like</button></div>
				<div>{blog.author}</div>
				<div style={showWhenOwnedByUser} className='removeButton'>
					<button onClick={deleteBlog(blog)}>remove</button>
				</div>
			</div>
		</div>
	)
}

Blog.propTypes = {
	blog: propTypes.object.isRequired,
	handleLike: propTypes.func,
	handleDelete: propTypes.func,
	ownedByUser: propTypes.bool
}

export default Blog