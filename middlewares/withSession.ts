import { getToken } from 'next-auth/jwt';
import {
	NextFetchEvent,
	NextMiddleware,
	NextRequest,
	NextResponse
} from 'next/server';
import { MiddlewareFactory } from './types';

export const withSession: MiddlewareFactory = (next: NextMiddleware) => {
	return async (req: NextRequest, _next: NextFetchEvent) => {
		const session: any = await getToken({
			req,
			secret: process.env.NEXTAUTH_SECRET
		})!;
		const sessionProtected = ['/checkout', '/admin'];
		const isSessionProtected =
			sessionProtected
				.map(page => req.nextUrl.pathname.startsWith(page))
				.filter(itm => itm).length > 0;

		if (!session && isSessionProtected) {
			const requestedPage = req.nextUrl.pathname;
			const url = req.nextUrl.clone();
			url.pathname = `/auth/login`;
			url.search = `p${requestedPage}`;

			return NextResponse.redirect(url);
		}
		return next(req, _next);
	};
};
