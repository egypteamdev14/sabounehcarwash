
import Image from 'next/image';
import { useState } from 'react';


import Button from "../components/Button"
import { signIn } from 'next-auth/react';
// import axios from 'axios';
import { useRouter } from 'next/router';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { toast } from 'react-toastify';





const SignIn = () => {

	const [user, setUser] = useState({
		username: "",
		password: "",
	});

	const { username, password } = user;

	const [show, setShow] = useState(false)

	const [emailError, setEmailError] = useState('')
	const [passwordError, setPasswordError] = useState('')

	// const { data: session, status } = useSession();

	const showPassword = () => setShow((prev) => !prev)


	const router = useRouter()

	// handel input change
	const handelChange = (e) => {
		const { name, value } = e.target;
		setEmailError('')
		setPasswordError('')
		setUser({ ...user, [name]: value });
	};


	// login in with username and password credentials
	const login = async (e) => {
		e.preventDefault();
		if (username && password) {
			signIn("credentials", {
				username,
				password,
				redirect: false,
				callbackUrl: `${window.location.origin}`,
			}).then((res) => {
				router.push('/');
				window.location.origin
			})
				.catch((error) => toast.error(error));

		} else {
			if (username.trim().length === 0) {
				setEmailError("Please Write Your Username")
			} else if (password.trim().length === 0) {
				setPasswordError("Please Write Your Password")
			}
		}

	};


	// return

	return (
		<div className="sign-in">
			<div className='logo'>
				<Image src={'/logo.png'} alt="logo" width={170} height={170} />
			</div>
			{/* form */}
			<div className="form">
				<form onSubmit={login}>
					<div className="email">
						<label htmlFor="text" >Mobile Number</label>
						<input
							type="text"
							name="username"
							id="text"
							placeholder="Enter your username"
							onChange={handelChange}
							value={username}
						/>

						{emailError && <p className="error-message">{emailError}</p>}
					</div>
					<div className="password">
						<label htmlFor="password" >Password</label>
						<input
							type={show ? "text" : "password"}
							name="password"
							id="password"
							placeholder="Enter your password"
							onChange={handelChange}
							value={password}
						/>
						<div className='pass-icon' style={{ position: "absolute", top: "60%", right: "10px", cursor: "pointer" }}>
							<MdOutlineRemoveRedEye fontSize={18} onClick={showPassword} />
						</div>
						{passwordError && <p className="error-message">{passwordError}</p>}
					</div>

					

					<div className="login-btn">
						<Button
							bg={"#05A8F5"}
							color={"#ffffff"}
							width={"180px"}
							height={"45px"}
							radius={"8px"}
							fontSize={"1rem"}
							fontWeight={"bold"}

						>
							 Log In
						</Button>
					</div>
				</form>
			</div>

		</div>
	);
};

export default SignIn;