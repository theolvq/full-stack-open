describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const user = {
      name: 'Theo',
      username: 'daawa',
      password: 'whistler',
    };
    cy.request({
      url: 'http://localhost:3003/api/users',
      method: 'POST',
      body: user,
    });
    cy.visit('http://localhost:3000');
  });
  it('login form can be opened', function () {
    cy.contains('Log in').click();
  });
  describe('can login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('Login').click();
      cy.get('#username').type('daawa');
      cy.get('#password').type('whistler');
      cy.get('#login-btn').click();
      cy.contains('Theo is logged in');
    });
    it('fails with invalid credentials', function () {
      cy.contains('Login').click();
      cy.get('#username').type('daawa');
      cy.get('#password').type('vancouver');
      cy.get('#login-btn').click();

      cy.get('html').should('not.contain', 'Theo is logged in');

      cy.get('.notification')
        .should('contain', 'Error')
        .and('have.css', 'color', 'rgb(252, 209, 226)');
    });
  });
  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'daawa', password: 'whistler' });
    });
    it('a blog can be created', function () {
      cy.contains('Create New Blog').click();
      cy.get('#title').type('Cypress is great');
      cy.get('#author').type('Cypress Hill');
      cy.get('#url').type('https://www.cypress.io/');
      cy.get('#submit-btn').click();

      cy.get('.notification')
        .should('contain', 'was added')
        .and('have.css', 'color', 'rgb(210, 252, 209)');
      cy.get('.bloglist').should('contain', 'Cypress is great');
    });
    it('a blog can be liked', function () {
      cy.createBlog({
        title: 'Cypress is actually awesome',
        author: 'Scott Tolinski',
        url: 'syntax.fm',
      });
      cy.get('.details').click();
      cy.get('.like').click();
      cy.get('.like').parent().contains('1');
      cy.get('.like').click();
      cy.get('.like').click();
      cy.get('.like').parent().contains('3');
    });
    it('a blog can be deleted', function () {
      cy.createBlog({
        title: 'Cypress kicks asses!',
        author: 'Yours truly',
        url: 'cypress.io',
      });
      cy.get('.details').click();
      cy.get('.delete').click();
      cy.get('.notification').should(
        'contain',
        'The blog Cypress kicks asses! was deleted'
      );
    });
    it.only('fails when another user try to delete a blog', function () {
      cy.createBlog({
        title: 'please fail',
        author: 'McLovin',
        url: 'mclovin.com',
      });
      cy.get('#logout-btn').click();
      const anotherUser = {
        name: 'Lily',
        username: 'flower',
        password: 'squamish',
      };
      cy.request({
        url: 'http://localhost:3003/api/users',
        method: 'POST',
        body: anotherUser,
      });
      cy.visit('http://localhost:3000');
      cy.login({ username: 'flower', password: 'squamish' });
      cy.get('.details').click();
      cy.get('.delete').click();
      cy.get('.notification').should('contain', '401');
    });
  });
  describe('when there are multiple blogs', () => {
    beforeEach(function () {
      cy.login({ username: 'daawa', password: 'whistler' });
      cy.createBlog({
        title: 'Cypress is actually awesome',
        author: 'Scott Tolinski',
        url: 'syntax.fm',
      });
      cy.createBlog({
        title: 'Cypress is just the best',
        author: 'Wes Bos',
        url: 'syntax.fm',
      });
      cy.createBlog({
        title: 'Cypress is pretty neat',
        author: 'Brian Holt',
        url: 'frontendmasters.com',
      });
      cy.createBlog({
        title: 'Cypress is very useful',
        author: 'Theo Leveque',
        url: 'fullstackopen.com',
      });
    });
    it('blogs are ordered per like', function () {});
  });
});
