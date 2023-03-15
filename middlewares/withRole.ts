// middleware/withLogging.ts
import { getToken } from 'next-auth/jwt';
import {
	NextFetchEvent,
	NextMiddleware,
	NextRequest,
	NextResponse
} from 'next/server';
import { MiddlewareFactory } from './types';

export const withRole: MiddlewareFactory = (next: NextMiddleware) => {
	return async (req: NextRequest, _next: NextFetchEvent) => {
		const session: any = await getToken({
			req,
			secret: process.env.NEXTAUTH_SECRET
		})!;
		const validRoles = ['admin', 'super-user', 'SEO'];

		if (req.nextUrl.pathname.startsWith('/admin')) {
			if (!validRoles.includes(session.user.role)) {
				const url = req.nextUrl.clone();
				url.pathname = ``;
				return NextResponse.redirect(url);
			}
		}

		return next(req, _next);
	};
};
