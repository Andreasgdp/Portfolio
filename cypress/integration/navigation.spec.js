describe('Site navigation', () => {
	it('Opens the app', () => {
		cy.visit('http://localhost:3000');
	});
	it('Navigates to Home', () => {
		cy.navTo('Home', '/#intro');
		cy.get('h1').contains('Andreas Petersen');
	});
	it('Navigates to Portfolio', () => {
		cy.navTo('Portfolio', '/#portfolio');
		cy.get('h1').contains('Portfolio');
	});
	it('Navigates to Works', () => {
		cy.navTo('Works', '/#works');
		cy.get('span').contains('Projects');
	});
	it('Navigates to Testimonials', () => {
		cy.navTo('Testimonials', '/#testimonials');
		cy.get('h1').contains('Testimonials');
	});
	it('Navigates to Contact', () => {
		cy.navTo('Contact', '/#contact');
		cy.get('h2').contains('Contact');
	});
});
