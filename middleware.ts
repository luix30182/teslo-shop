import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
// import { jwt } from './utils';

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
	const { token = '' } = req.cookies;

	try {
		console.log(token);
		// await jwt.isValidToken(token);
		return NextResponse.next();
	} catch (error) {
		const requestedPage = req.page.name;

		return NextResponse.redirect(`/auth/login?p=${requestedPage}`);
	}
}

export const config = {
	matcher: '/checkout/:path*'
};
