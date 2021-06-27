import React from 'react';
import './menu.scss';

export default function Menu({
	menuOpen,
	setMenuOpen,
}: {
	menuOpen: boolean;
	setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	return (
		<div className={'menu ' + (menuOpen && 'active')} id="menu">
			<ul>
				{/* TODO: Create component of listelement so that the setMenuOpen() is only used once. */}
				<li onClick={() => setMenuOpen(false)}>
					<a href="#intro">Home</a>
				</li>
				<li onClick={() => setMenuOpen(false)}>
					<a href="#portfolio">Portfolio</a>
				</li>
				<li onClick={() => setMenuOpen(false)}>
					<a href="#works">Works</a>
				</li>
				<li onClick={() => setMenuOpen(false)}>
					<a href="#testimonials">Testimonials</a>
				</li>
				<li onClick={() => setMenuOpen(false)}>
					<a href="#contact">Contact</a>
				</li>
			</ul>
		</div>
	);
}
