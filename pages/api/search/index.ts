import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';

type Data = {
	message: string;
};

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	return res.status(400).json({ message: 'Bad request not query specified' });
}
