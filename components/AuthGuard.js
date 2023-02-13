import React, { useEffect } from "react";
import { SessionProvider, useSession } from "next-auth/react";
import Router, { useRouter } from "next/router";

import MainLayout from "../layout/MainLayout";
import { useDispatch } from "react-redux";


import { getUser } from "@/store/slices/getuser";
import SignIn from "@/pages/signin";
import { Loader } from "./Loader";

const AuthGuard = ({ children }) => {
	const { data: session, status: loading } = useSession();

	const hasUser = !!session?.user;


	const router = useRouter();
	const dispatch = useDispatch();

	useEffect(() => {
		if (loading === "unauthenticated" && loading === "loading") {
			Router.push("/signin");
		}

		// if(session?)
		return () => {
			dispatch(getUser(session?.user));
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