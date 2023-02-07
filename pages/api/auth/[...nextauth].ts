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
	callbacks: {
		async jwt({ token, account, user }) {
			if (account) {
				token.accessToken = account.access_token;
				switch (account.type) {
					case 'oauth':
						break;
					case 'credentials':
						token.user = user;
						break;
				}
			}
			return token;
		},
		async session({ session, token, user }) {
			session.accessToken = token.accessToken;
			session.user = token.user as any;
			return session;
		}
	}
});
