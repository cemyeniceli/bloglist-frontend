import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Togglable from './Togglable'

describe('<Togglable />', () => {
    
    let content

    beforeEach(() => {
        content = render(
            <Togglable buttonLabel="show...">
                <div className='testDiv'></div>
            </Togglable>
        )
    })

    test('renders its children', () => {
    
        expect(content.container.querySelector('.testDiv')).not.toBe(null)
    })

    test('at start the children are not displayed', () => {
    
        const div = content.container.querySelector('.togglableContent')
        expect(div).toHaveStyle('display: none')
    })

    test('after clicking the button, children are displayed', () => {

        const showButton = content.getByText('show...')
        fireEvent.click(showButton)
        const div = content.container.querySelector('.togglableContent')
        expect(div).not.toHaveStyle('display: none')
    }) 
})









