import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import AddBlog from './AddBlog'

describe('<AddBlog />', () => {
    test('checks the received data of add new blog handler', () => {

        const addNewBlog = jest.fn()

        const content = render(
            <AddBlog addNewBlog={addNewBlog} />
        )

        const form = content.container.querySelector('form')
        const titleInput = content.container.querySelector('#title')
        const authorInput = content.container.querySelector('#author')
        const urlInput = content.container.querySelector('#url')

        fireEvent.change(titleInput, {
            target: { value: 'Cem ve REACT' } 
        })
        fireEvent.change(authorInput, {
            target: { value: 'Cem Yeniceli' } 
        })
        fireEvent.change(urlInput, {
            target: { value: 'cem.url' } 
        })
        fireEvent.submit(form)

        expect(addNewBlog.mock.calls).toHaveLength(1)
        expect(addNewBlog.mock.calls[0][0].title).toBe('Cem ve REACT')
        expect(addNewBlog.mock.calls[0][0].author).toBe('Cem Yeniceli')
        expect(addNewBlog.mock.calls[0][0].url).toBe('cem.url')   
    })
})