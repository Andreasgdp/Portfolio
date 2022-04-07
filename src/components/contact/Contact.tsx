import React, { useState } from 'react';
import './contact.scss';

export default function Contact() {
	const [message, setMessage] = useState(false);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setMessage(true);
	};
	const handleFocus = () => {
		setMessage(false);
	};

	return (
		<div className="contact" id="contact">
			<div className="left">
				<img src="assets/shake.svg" alt="" />
			</div>
			<div className="right">
				<h2>Contact</h2>
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						placeholder="Email"
						onFocus={handleFocus}
					/>
					<textarea
						placeholder="Message"
						onFocus={handleFocus}
					></textarea>
					<button type="submit">Send</button>
					{message && (
						<span id="recieved-message">
							Thanks, I'll reply ASAP :)
						</span>
					)}
				</form>
			</div>
		</div>
	);
}
