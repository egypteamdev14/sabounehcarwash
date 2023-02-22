import React, { useEffect, useState } from 'react';
import Header from './Header';
import SideBar from './SideBar';



const MainLayout = ({ children }) => {

	const [toggle, setToggle] = useState(false)



	return (
		<>
			<div className='grid grid-cols-6'>
				{toggle ? (<div >

					<SideBar setToggle={setToggle} />
				</div>) : null}


				<div className={`${!toggle ? 'col-span-full' : 'col-span-5'}`}>
					<Header setToggle={setToggle} />
					{children}
				</div>


			</div>
		</>
	);
}

export default MainLayout;