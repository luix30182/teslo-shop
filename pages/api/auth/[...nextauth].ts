import { dbUsers } from '@/database/index';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';

export default NextAuth({
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID!,
			clientSecret: process.env.GITHUB_SECRET!
		}),
		Credentials({
			name: 'Custom login',
			credentials: {
				email: {
					label: 'Email',
					type: 'email',
					placeholder: 'something@email.com'
				},
				password: {
					label: 'Password',
					type: 'password',
					placeholder: 'Password'
				}
			},
			async authorize(credentials) {
				return await dbUsers.checkUserEmailPassword(
					credentials!.email,
					credentials!.password
				);
			}
		})
	],
	pages: {
		signIn: '/auth/login',
		newUser: '/auth/register'
	},
	session: {
		maxAge: 2592000,
		strategy: 'jwt',
		updateAge: 86400
	},
	callbacks: {
		async jwt({ token, account, user }) {
			if (account) {
				token.accessToken = account.access_token;
				switch (account.type) {
					case 'oauth':
						token.user = await dbUsers.oAuthToDbUser(user?.email!, user?.name!);
						break;
					case 'credentials':
						token.user = user;
						break;
				}
			}
			return token;
		},
		async session({
			session,
			token,
			user
		}: {
			session: any;
			token: any;
			user: any;
		}) {
			session.accessToken = token.accessToken;
			session.user = token.user as any;
			return session;
		}
	}
});
