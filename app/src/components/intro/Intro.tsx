import React, { useEffect, useRef } from 'react';
import { init } from 'ityped';
import "./intro.scss";

export default function Intro() {

	const textRef = useRef(null);

	// useEffect(() => {
	// 	init(textRef.current, { 
	// 		showCursor: false, 
	// 		strings: ['Web developer', 'Logo designer'] 
	// 	})
	// }, [])
	return (
		<div className="intro" id="intro">
			<div className="left">
				<div className="imgContainer">
					<img src="assets/man.png" alt="" />
				</div>
			</div>
			<div className="right">
				<div className="wrapper">
					<h2>Hi there, I'm</h2>
					<h1>Andreas Petersen</h1>
					<h3>A <span ref={textRef}></span> </h3>
				</div>
				<a href="#portfolio">
					<img src="assets/down.png" alt="" />
				</a>
			</div>
		</div>
	)
}
