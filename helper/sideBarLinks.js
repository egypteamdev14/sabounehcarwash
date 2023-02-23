import { AiFillCar } from "react-icons/ai";
import { FiUsers } from "react-icons/fi";
import { HiTemplate } from "react-icons/hi";
import { MdAccountCircle, MdOutlineReviews } from "react-icons/md";

export const sideBarLinks = [
	{
		title: "Home",
		path: "/",
		icon: <HiTemplate className='icon' />
	},
	{
		title: "Users",
		path: "/users",
		icon: <FiUsers className='icon' />
	},
	{
		title: "Reviews",
		path: "/reviews",
		icon: <MdOutlineReviews className='icon' />
	},
	{
		title: "Subscription",
		path: "/subscription",
		icon: <MdAccountCircle className='icon' />
	},
	{
		title: "Vehicles",
		path: "/vehicles",
		icon: <AiFillCar className='icon' />
	}
]