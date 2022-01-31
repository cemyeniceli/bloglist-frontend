describe('Bloglist app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Cem Yeniceli',
      username: 'cemyeniceli',
      password: 'madrex'  
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })  
  
  it('Login form is shown', function() {
    cy.get('.loginForm').parent().should('have.css', 'display', 'block')
    })

  describe('Login', function() {
    it('succeeds with correct creds', function() {
      cy.get('#username').type('cemyeniceli')
      cy.get('#password').type('madrex')
      cy.get('#login-button').click()
      
      cy.contains('Cem Yeniceli logged-in')
    })
    it('fails with wrong cred and red color message',function() {
      cy.get('#username').type('cemyeniceli')
      cy.get('#password').type('maddrex')
      cy.get('#login-button').click()
      
      cy.get('html').should('not.contain', 'Cem Yeniceli logged-in')
      cy.contains('Wrong credentials').should('have.css', 'color', 'rgb(255, 0, 0)')  
    })
  })

  describe('When logged in', function() {
    beforeEach(function(){
      cy.login({username:'cemyeniceli', password:'madrex'})
    })
    it('A blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('Cem ve React')
      cy.get('#url').type('cemy.io')
      cy.get('#author').type('Cem Yeniceli')
      cy.get('#save-blog').click()
      cy.contains('Cem ve React Cem Yeniceli')
      cy.contains('a new blog Cem ve React by Cem Yeniceli added')
    })
    describe('When there are notes', function() {
      beforeEach(function() {
        const blog_1 = {
          title: 'Cem Yeniceli ve JS',
          url: 'cemyeniceli.io',
          author: 'Cemy'  
        }
        const blog_2 = {
          title: 'Cem Yeniceli ve React',
          url: 'cemyeniceli.io',
          author: 'Cemy'  
        }
        const blog_3 = {
          title: 'Cem Yeniceli ve Node',
          url: 'cemyeniceli.io',
          author: 'Cemy'  
        }
        cy.createBlog(blog_1)
        cy.createBlog(blog_2)
        cy.createBlog(blog_3)
      })
      it('User can like a blog', function() {
        cy.contains('Cem Yeniceli ve JS').parent().as('selectedBlog')
        cy.get('@selectedBlog').contains('view').click()
        cy.get('@selectedBlog').contains('like').click()
        cy.get('@selectedBlog').contains('likes 1')
      })
      it('User can delete a blog', function() {
        cy.contains('Cem Yeniceli ve JS').parent().as('selectedBlog')
        cy.get('@selectedBlog').contains('view').click()
        cy.get('@selectedBlog').contains('remove').click()
        cy.get('html').should('not.contain', 'Cem Yeniceli ve Cem')
      })
      it('Other user can not delete it', function() {
        cy.contains('logout').click()
        const user = {
          name: 'Cem Yeniceli2',
          username: 'cemyeniceli2',
          password: 'madrex2'  
        }
        cy.request('POST', 'http://localhost:3003/api/users', user)
        cy.visit('http://localhost:3000')
        cy.login({username:'cemyeniceli2', password:'madrex2'})
        cy.contains('Cem Yeniceli ve JS').parent().as('selectedBlog')
        cy.get('@selectedBlog').contains('view').click()
        cy.get('@selectedBlog').find('.removeButton').should('have.css', 'display', 'none')
        cy.get('@selectedBlog').contains('hide').click()
      })
      it.only('The blogs are ordered according to likes', function () {
        cy.contains('Cem Yeniceli ve Node').parent().as('mostLiked')
        cy.get('@mostLiked').contains('view').click()
        cy.wait(100)
        cy.get('@mostLiked').contains('like').click()
        cy.wait(100)
        cy.get('@mostLiked').contains('like').click()
        cy.wait(100)
        cy.get('@mostLiked').contains('like').click()
        cy.wait(100)
        cy.contains('Cem Yeniceli ve React').parent().as('secondLiked')
        cy.get('@secondLiked').contains('view').click()
        cy.wait(100)
        cy.get('@secondLiked').contains('like').click()
        cy.wait(100)
        cy.get('@secondLiked').contains('like').click()
        cy.wait(100)
        cy.contains('Cem Yeniceli ve JS').parent().as('thirdLike')
        cy.get('@thirdLike').contains('view').click()
        cy.wait(100)
        cy.get('@thirdLike').contains('like').click()
        cy.wait(100)
        cy.get('.blog')
          .then(blogs => {
            let likes = []
            const numberOfblogs = blogs.length
            console.log(numberOfblogs) 
            blogs.map((i,el) => {  
              cy.wrap(el)
                  .find('.numberOfLikes')
                  .invoke('text')
                  .then(s => {
                    likes.push(parseInt(s))
                    if (likes.length === numberOfblogs) {
                      let likesCopy = [...likes]
                      console.log(likesCopy.sort((a,b) => b - a))
                      console.log(likes)
                      expect(JSON.stringify(likes)).equal(JSON.stringify(likesCopy))
                    } 
              })    
            }) 
        })
      })
    })
  })
})
