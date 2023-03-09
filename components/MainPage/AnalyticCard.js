import React from 'react'
import { MdOutlineMoreHoriz } from 'react-icons/md'

const AnalyticCard = ({item }) => {
	return (
		<div className='analytic-card'>
			<div className='first-child'>
				<div className='title'>
					<h5>{item.title}</h5>
					<p>Today</p>
				</div>
				<MdOutlineMoreHoriz />
			</div>
			<div className='second-child'>
				<div className='icon'>
					{item.icon}
				</div>

				<div className='numbers'>
					<p>145</p>
					<p className='text-muted'>
						<span className='me-2' style={{ color: "#12B249" }}>12%</span>
						increase
					</p>
				</div>
			</div>
		</div>
	)
}

export default AnalyticCard