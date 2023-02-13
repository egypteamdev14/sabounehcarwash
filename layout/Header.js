/* eslint-disable @next/next/no-img-element */
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { AiOutlineMenu } from 'react-icons/ai';
import { CgLogOut } from 'react-icons/cg';
import { MdKeyboardArrowDown } from 'react-icons/md'


const Header = ({ setToggle }) => {
	const [logOut, setLogOut] = useState(false)

	const router = useRouter()

	const { data: session, loading } = useSession();
	// console.log(session);


	return (
		<div className='header relative'>
			<div className='toggle-box' onClick={() => setToggle((prev) => !prev)}>
				<AiOutlineMenu color={'#000'} />
			</div>
			<div className='userInfo'>
				<div className='info-header-text'>
					<h5>{session ? session?.user?.name : 'Ahmed'}</h5>
					<p>Admin user</p>
				</div>
				<div className='info-header-image' onClick={() => setLogOut((prev) => !prev)}>
					<img src={session?.user?.image || '/user.png'} alt='user' width={40} height={40} />
					<MdKeyboardArrowDown />
				</div>
				{
					logOut && (
						<div className='box-logout logout absolute bottom-[-45px] md:bottom-[-45px] right-8 ' style={{ width: "120px", backgroundColor: "#0C162B" }}>
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
					)
				}
			</div>
		</div>
	);
}

export default Header;