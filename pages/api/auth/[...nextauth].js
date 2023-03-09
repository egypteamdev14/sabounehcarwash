import NextAuth from "next-auth"


import CredentialsProvider from "next-auth/providers/credentials"




export const authOptions = {
	// Configure one or more authentication providers
	providers: [
		CredentialsProvider({

			name: "Credentials",
			type: "credentials",
			async authorize(credentials, req) {
				// Add logic here to look up the user from the credentials supplied
				const payload = {
					phoneNumber: credentials.username,
					password: credentials.password
				}

				const res = await fetch("http://192.168.0.108:3030/api/users/dashboard/login", {
					method: "POST",
					body: JSON.stringify(payload),
					headers: {
						"Content-Type": "application/json",
					},
				})


				const data = await res.json();
				// Returning token to set in session
				if (res.status === 200) {
					
					return {
						token: data,
					};
				} else {
					throw new Error(res.statusText)
				}

			}
		}),


	],
	secret: process.env.SECRET,

	jwt: {
		encryption: true,
	},
	callbacks: {
		async signIn({ user, account, profile, email, credentials }) {
			return true
		},
		async session({ session, user, token }) {
			session.user = token.user;
			return session
		},
		async jwt({ token, user, account, profile, isNewUser }) {
			 user && (token.user = user);
			return token;
		}

	},
	pages: {
		signIn: "/signin",
		signOut: "/signin"
	}


}

export default NextAuth(authOptions);