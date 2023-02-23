import React from 'react';
import { HiTemplate } from 'react-icons/hi'
import { FiUsers } from 'react-icons/fi'
import { MdAccountCircle, MdPayment } from 'react-icons/md'
import { AiOutlineClose } from 'react-icons/ai'
import { CgLogOut } from 'react-icons/cg'
import Image from 'next/image';
import Button from '@/components/Button';
import Link from 'next/link';
import { Router, useRouter } from 'next/router';
import { useSession, signIn, signOut } from 'next-auth/react';

import { sideBarLinks } from '@/helper/sideBarLinks';

const SideBar = ({ sidebar, toggle, setToggle }) => {

	const { locale, pathname, query, asPath, locales, push } = useRouter();

	const router = useRouter();



	return (
		<>

			<div div className='sidebar relative '  >
				<div className='logo'>
					<Image src="/logo.png" alt="logo" width={180} height={40} />
				</div>
				<div className='block md:hidden absolute top-4 right-4 cursor-pointer' onClick={() => setToggle((prev) => !prev)}>
					<AiOutlineClose />
				</div>
				<div className='menu-items'>
					<ul>
						{sideBarLinks.map((link, index) => (
							<li
								key={index}
								className={pathname === link.path ? 'active' : ''}
								onClick={() => setToggle((prev) => !prev)}>
								<Link href={link.path}>
									<span>{link.icon}</span>
									<span>{link.title}</span>
								</Link>
							</li>
						))}
					</ul>
				</div>
				<div className='logout'>
					<Button
						width={"220px"}
						height={"45px"}
						border={"none"}
						bg={"#189FBE14"}
						color={"#fff"}
						radius={"8px"}
						fontSize={"16px"}
						fontWeight={"bold"}
						cursor={"pointer"}
						onClick={() => {
							signOut({ redirect: false, callbackUrl: `${window.location.origin}/signin` })
							router.push("/signin");
						}
						}
					>
						<CgLogOut />	Log out
					</Button>
				</div>
			</div >
		</>
	);
}

export default SideBar;
