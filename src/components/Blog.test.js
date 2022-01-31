import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
    
    let content

    const blog = {
        title: 'Cemo vs REACT',
        author: 'Cem Yeniceli',
        url: 'cemyeniceli.io',
        likes: 9,
        id: 'dsds4343'
    }

    const handleLike = jest.fn()
    const handleDelete = jest.fn()

    beforeEach(() => {
        content = render(
            <Blog blog={blog} handleLike={handleLike} handleDelete={handleDelete} ownedByUser={false}/>
        )
    })

    test('renders title and author but not url and likes in default', () => {
    
        const defaultView = content.container.querySelector('.defaultView')
        
        expect(defaultView).toHaveTextContent(`${blog.title} ${blog.author}`)
        expect(defaultView).not.toHaveTextContent('likes')
        expect(defaultView).not.toHaveTextContent(`${blog.url}`)
    })

    test('renders blog details when view button clicked', () => {
    
        const viewButton = content.getByText('view')
        fireEvent.click(viewButton)
    
        const detailView = content.container.querySelector('.detailView')
        expect(detailView).not.toHaveStyle('display: none')
    })

    test('the event handler the component received as props is called twice', () => {

        const likeButton = content.getByText('like')
        fireEvent.click(likeButton)
        fireEvent.click(likeButton)
    
        expect(handleLike.mock.calls).toHaveLength(2)
    
    })

    test('Remove button only not showed when user does not created the blog', () => {
        const removeButton = content.container.querySelector('.removeButton')

        expect(removeButton).toHaveStyle('display: none')
    })

    test('Remove button showed when user created the blog', () => {
        
        content.rerender(<Blog blog={blog} handleLike={handleLike} handleDelete={handleDelete} ownedByUser={true}/>)
    
        const removeButtonContainer = content.container.querySelector('.removeButton')
        const removeButton = content.getByText('remove')

        expect(removeButtonContainer).not.toHaveStyle('display: none')
        fireEvent.click(removeButton)
        expect(handleDelete.mock.calls).toHaveLength(1)

    })
})









