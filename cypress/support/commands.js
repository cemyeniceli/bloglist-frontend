// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('login', ({username, password}) => { 
    cy.request('POST', 'http://localhost:3003/api/login', {username, password})
        .then(({body}) => {
            cy.request('GET', `http://localhost:3003/api/users/${username}`)
                .then(res => {
                    const userId = res.body.id
                    body.id = userId
                    localStorage.setItem('loggedBlogappUser', JSON.stringify(body))
                    cy.visit('http://localhost:3000')
                })
        })
})

Cypress.Commands.add('createBlog', (blog) => { 
    
    cy.request({
        url: 'http://localhost:3003/api/blogs',
        method: 'POST',
        body: blog,
        headers: { Authorization: `bearer ${JSON.parse(localStorage.getItem('loggedBlogappUser')).token}` }
    }).then((res) => {
            cy.visit('http://localhost:3000')
        })
})