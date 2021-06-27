import React from 'react';
import "./portfolio.scss"

export default function Portfolio() {
	return (
		<div className="portfolio" id="portfolio">
			<h1>Portfolio</h1>
			<ul>
				<li className="active">Featured</li>
				<li>Web App</li>
				<li>Mobile App</li>
				<li>Design</li>
				<li>Branding</li>
			</ul>
			<div className="container">
				<div className="item">
					<img src="https://99designs-blog.imgix.net/blog/wp-content/uploads/2018/10/attachment_100040756-e1538485934255.jpeg" alt="" />
					<h3>Banking App</h3>
				</div>
				<div className="item">
					<img src="https://i.pinimg.com/originals/e9/c9/2f/e9c92f7869d682a6fa5a97fb8a298f30.jpg" alt="" />
					<h3>Banking App</h3>
				</div>
				<div className="item">
					<img src="https://ichef.bbci.co.uk/news/976/cpsprodpb/37B5/production/_89716241_thinkstockphotos-523060154.jpg" alt="" />
					<h3>Banking App</h3>
				</div>
				<div className="item">
					<img src="https://ichef.bbci.co.uk/news/976/cpsprodpb/37B5/production/_89716241_thinkstockphotos-523060154.jpg" alt="" />
					<h3>Banking App</h3>
				</div>
				<div className="item">
					<img src="https://ichef.bbci.co.uk/news/976/cpsprodpb/37B5/production/_89716241_thinkstockphotos-523060154.jpg" alt="" />
					<h3>Banking App</h3>
				</div>
				<div className="item">
					<img src="https://ichef.bbci.co.uk/news/976/cpsprodpb/37B5/production/_89716241_thinkstockphotos-523060154.jpg" alt="" />
					<h3>Banking App</h3>
				</div>
			</div>
		</div>
	)
}
