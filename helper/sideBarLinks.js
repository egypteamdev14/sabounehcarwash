import { AiFillCar } from "react-icons/ai";
// import { FiUsers } from "react-icons/fi";
// import { HiTemplate } from "react-icons/hi";
import { MdAccountCircle, MdOutlineReviews } from "react-icons/md";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { RiCouponLine } from "react-icons/ri";

export const sideBarLinks = [
	// {
	// 	title: "Home",
	// 	path: "/",
	// 	icon: <HiTemplate className='icon' />
	// },
	{
		title: "Orders",
		path: "/orders",
		icon: <AiOutlineShoppingCart className='icon' />
	},	
	{
		title: "Coupons",
		path: "/coupons",
		icon: <RiCouponLine className='icon' />
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