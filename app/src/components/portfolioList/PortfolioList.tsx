import React from 'react'
import "./portfolioList.scss"

export default function PortfolioList({id, title, active, setSelected}: {id: string, title: string, active: boolean, setSelected: React.Dispatch<React.SetStateAction<string>>}) {
	return (
		<li className={"portfolioList " + (active ? 'active' : '')} onClick={() => setSelected(id)}>
			{title}
		</li>
	)
}
