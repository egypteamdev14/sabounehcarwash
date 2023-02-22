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


const SideBar = ({ sidebar, toggle, setToggle }) => {

	const { locale, pathname, query, asPath, locales, push } = useRouter();

	const router = useRouter();




	// console.log(`${window.location.origin}/signin`);

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
						<li
							className={pathname === '/' ? 'active' : ''}
							onClick={() => setToggle((prev) => !prev)}>
							<Link href='/'>
								<span><HiTemplate className='icon' /></span>
								<span>Home</span>
							</Link>
						</li>
						<li
							className={pathname === '/subscription' ? 'active' : ''}
							onClick={() => setToggle((prev) => !prev)}>
							<Link href='/subscription'>
								<span><MdAccountCircle className='icon' /></span>
								<span>subscription</span>
							</Link>
						</li>
						<li
							className={pathname === '/users' ? 'active' : ''}
							onClick={() => setToggle((prev) => !prev)}>
							<Link href='users'>
								<span><FiUsers className='icon' /></span>
								<span>Users</span>
							</Link>
						</li>
						<li
							className={pathname === '/payments' ? 'active' : ''}
							onClick={() => setToggle((prev) => !prev)}>
							<Link href='/payments'>
								<span><MdPayment className='icon' /></span>
								<span>Payments</span>
							</Link>
						</li>
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
