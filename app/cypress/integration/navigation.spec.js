describe('Site navigation', () => {
	it('opens the app', () => {
		cy.visit('http://localhost:3000');
	});
	it('Navigates to Home', () => {
		cy.wait(2000);
		cy.navTo('Home', '/#intro');
	});
	it('Navigates to Portfolio', () => {
		cy.wait(2000);
		cy.navTo('Portfolio', '/#portfolio');
	});
	it('Navigates to Works', () => {
		
		cy.wait(2000);
		cy.navTo('Works', '/#works');
	});
	it('Navigates to Testimonials', () => {
		cy.wait(2000);
		cy.navTo('Testimonials', '/#testimonials');
	});
	it('Navigates to Contact', () => {
		cy.wait(2000);
		cy.navTo('Contact', '/#contact');
	});
});
