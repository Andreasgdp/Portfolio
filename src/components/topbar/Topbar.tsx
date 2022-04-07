import React from 'react';
import { Person, Mail } from '@material-ui/icons';
import './topbar.scss';

export default function Topbar({
	menuOpen,
	setMenuOpen,
}: {
	menuOpen: boolean;
	setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	return (
		<div className={'topbar ' + (menuOpen && 'active')}>
			<div className="wrapper">
				<div className="left">
					<a href="#intro" className="logo">
						logo.
					</a>
					<div className="itemContainer">
						<Person className="icon" />
						<span>+45 93 60 62 42</span>
					</div>
					<div className="itemContainer">
						<Mail className="icon" />
						<span>andreasgdp@gmail.com</span>
					</div>
				</div>
				<div className="right">
					<div
						className="hamburger"
						onClick={() => setMenuOpen(!menuOpen)}
					>
						<span className="line1"></span>
						<span className="line2"></span>
						<span className="line3"></span>
					</div>
				</div>
			</div>
		</div>
	);
}
