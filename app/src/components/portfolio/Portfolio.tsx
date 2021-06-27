import React, { useState } from 'react';
import PortfolioList from '../portfolioList/PortfolioList';
import "./portfolio.scss"

export default function Portfolio() {
	const [selected, setSelected] = useState("featured");

	const list = [
		{
			id: "featured",
			title: "Featured",
		},
		{
			id: "web",
			title: "Web App",
		},
		{
			id: "mobile",
			title: "Mobile App",
		},
		{
			id: "design",
			title: "Design",
		},
		{
			id: "content",
			title: "Content",
		},
	];
	
	return (
		<div className="portfolio" id="portfolio">
			<h1>Portfolio</h1>
			<ul>
				{list.map((item) => (
					<PortfolioList title={item.title} active={selected === item.id} setSelected={setSelected} id={item.id}/>
				))}
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
