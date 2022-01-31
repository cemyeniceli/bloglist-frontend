import React from 'react'
import propTypes from 'prop-types'

const messageBaseStyle = {
	background: 'lightgrey',
	fontSize: 20,
	borderStyle: 'solid',
	borderRadius: 5,
	padding: 10,
	marginBottom: 10
}

const Notification = ({ message }) => {
	if (message.content === '') {
		return null
	}
	const messageColor = message.type === 'success' ? 'green' : 'red'
	return(
		<div className='notification' style={{ ...messageBaseStyle, color:messageColor }}>
			{message.content}
		</div>
	)
}

Notification.propTypes = {
	message: propTypes.object.isRequired
}

export default Notification