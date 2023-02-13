
import Image from 'next/image';
import { useState } from 'react';


import Button from "../components/Button"
import { signIn, useSession } from 'next-auth/react';
import axios from 'axios';
import { useRouter } from 'next/router';





const SignIn = () => {

	const [user, setUser] = useState({
		username: "",
		password: "",
	});

	const { username, password } = user;

	const [emailError, setEmailError] = useState('')
	const [passwordError, setPasswordError] = useState('')

	const { data: session, status } = useSession();



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
				.catch((error) => console.log("error: ", error));

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

			{/* form */}
			<div className="form">
				<form onSubmit={login}>
					<div className="email">
						<label htmlFor="text">Username</label>
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
						<label htmlFor="password">Password</label>
						<input
							type="password"
							name="password"
							id="password"
							placeholder="Enter your password"
							onChange={handelChange}
							value={password}
						/>

						{passwordError && <p className="error-message">{passwordError}</p>}
					</div>

					<div className="remember">
						<div>
							<input
								type="checkbox"
								id="remember"
								name="remember"
								value="remember me"

							/>
							<label htmlFor="remember"> Remember me</label>
						</div>
						<p>Forget Password ?</p>
					</div>

					<div className="login-btn">
						<Button
							bg={"#138DA4"}
							color={"#ffffff"}
							width={"150px"}
							height={"45px"}
							radius={"8px"}
							fontSize={"1.5rem"}
							fontWeight={"bold"}
						>
							Login
						</Button>
					</div>
				</form>
			</div>

		</div>
	);
};

export default SignIn;