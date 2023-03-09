import { AiOutlineDollar } from "react-icons/ai";
import { MdGroups, MdOutlineSpeakerNotes, MdPersonPin } from "react-icons/md";

export const mainPageCard = [
	{
		title: "Orders",
		icon: <MdOutlineSpeakerNotes className='icon' />
	},	
	{
		title: "Revenue ",
	  icon: <AiOutlineDollar className='icon' />
	},
	{
		title: "Costumers",
		icon: <MdGroups className='icon' />
	},
	{
		title: "Washers",
		icon: <MdPersonPin className='icon' />
	}
]