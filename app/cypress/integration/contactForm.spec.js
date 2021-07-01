describe('Test contact form', () => {
	it('Opens the app', () => {
		cy.visit('http://localhost:3000');
	});
	it('Navigates to Contact', () => {
		cy.navTo('Contact', '/#contact');
		cy.get('h2').contains('Contact');
	});
	it('Expect recieve message to not exist', () => {
		cy.get('#recieved-message').should('not.exist');
	});
	it('Fill form correctly', () => {
		cy.get('input').type('test@domain.com');
		cy.get('textarea').type('This is a message for contacting');
		cy.get('button').click();
	});
	it('Expect recieve message to exist', () => {
		cy.get('#recieved-message').should('exist');
	});
	it('Click input and expect recieve message not to exist', () => {
		cy.get('input').click();
		cy.get('#recieved-message').should('not.exist');
	});
	it('Submit empty form', () => {
		cy.get('input').clear();
		cy.get('textarea').clear();
		cy.get('button').click();
		cy.get('#recieved-message').should('not.exist');
		// TODO add check of existance of error message for missing input and textarea values
	});
	it('Use invalid email', () => {
		cy.get('input').clear();
		cy.get('input').type('notAnEmail');
		cy.get('textarea').clear();
		cy.get('textarea').type('This is a message for contacting');
		cy.get('button').click();
		cy.get('#recieved-message').should('not.exist');
		// TODO add check of existance of error message for invalid email
	});
});
