import React, { useEffect } from "react";
import { SessionProvider, useSession } from "next-auth/react";
import Router, { useRouter } from "next/router";

import MainLayout from "../layout/MainLayout";
import { useDispatch } from "react-redux";



import { getUser } from "@/store/slices/getuser";
import SignIn from "@/pages/signin";
import { Loader } from "./Loader";
import axios from "axios";
import config from "@/config/config";

const AuthGuard = ({ children }) => {
	const { data: session, status: loading } = useSession();

	console.log(session?.user?.token.token)

	const hasUser = !!session?.user;


	const router = useRouter();
	const dispatch = useDispatch();

	useEffect(() => {
		if (loading === "unauthenticated" && loading === "loading") {
			Router.push("/signin");
			delete axios.defaults.headers.common.Authorization;
		}

		// if(session?)
		return () => {
			dispatch(getUser(session?.user.user));
			axios.defaults.headers.common.Authorization = `Bearer ${session?.user?.token.token}`;
			axios.defaults.baseURL = "http://192.168.0.108:3030";
		};
	}, [loading, hasUser, dispatch, session]);

	if (loading === "loading" && router.pathname !== "/signin") {
		return <Loader />
	}

	return (
		<SessionProvider
			options={{
				clientMaxAge: 0,
				keepAlive: 0,
			}}
			session={session}
		>
			{loading === "authenticated" && hasUser && router.pathname !== "/signin" ? (
				<MainLayout>{children}</MainLayout>
			) : (
				<SignIn />
			)}
		</SessionProvider>
	);
};
export default AuthGuard;