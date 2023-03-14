import { NextResponse } from 'next/server';
import { withSession } from './middlewares/withSession';
import { withRole } from 'middlewares/withRole';
import { stackMiddlewares } from 'middlewares/stackMiddlewares';

export async function defaultMiddleware() {
	return NextResponse.next();
}

const middlewares = [withRole, withSession];
export default stackMiddlewares(middlewares);
