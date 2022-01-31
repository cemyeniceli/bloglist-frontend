import React, { useState, useImperativeHandle, useEffect } from 'react'
import propTypes from 'prop-types'

const Togglable = React.forwardRef((props, ref) => {
	const [visible, setVisible] = useState(false)

	const hideWhenVisible = { display: visible ? 'none' : '' }
	const showWhenVisible = { display: visible ? '' : 'none' }

	const toggleVisibility = () => {
		setVisible(!visible)
	}

	useEffect(() => {
		if(props.isShownOnDefault) {
			setVisible(true)
		}
	},[])

	useImperativeHandle(ref, () => {
		return {
			toggleVisibility
		}
	})

	return (
		<div>
			<div style={hideWhenVisible}>
				<button onClick={toggleVisibility}>{props.buttonLabel}</button>
			</div>
			<div style={showWhenVisible} className='togglableContent'>
				{props.children}
				<button onClick={toggleVisibility}>cancel</button>
			</div>
		</div>
	)
})

Togglable.propTypes = {
	buttonLabel: propTypes.string.isRequired
}

Togglable.displayName = 'Togglable'

export default Togglable