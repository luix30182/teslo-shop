import { db } from '@/database/index';
import { IUser } from '@/interfaces/user';
import User from '@/models/User';
import type { NextApiRequest, NextApiResponse } from 'next';
import { isValidObjectId } from 'mongoose';
import { validRoles } from '@/interfaces/dashboard';

type Data =
	| {
			message: string;
	  }
	| IUser[];

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	switch (req.method) {
		case 'GET':
			return getUsers(req, res);
		case 'PUT':
			return updateUser(req, res);

		default:
			return res.status(400).json({ message: 'bad request' });
	}
}

const updateUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	const { userId = '', role = '' } = req.body;

	if (!isValidObjectId(userId)) {
		return res.status(400).json({ message: 'User does not exist' });
	}

	if (!validRoles.includes(role)) {
		return res.status(400).json({ message: 'Invalid role' });
	}

	await db.disconnect();
	const user = await User.findById(userId);
	if (!user) {
		await db.disconnect();
		return res.status(400).json({ message: 'User not found' });
	}

	user.role = role;
	await user.save();
	await db.disconnect();
};

const getUsers = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	await db.connect();
	const users = await User.find().select('-password').lean();
	await db.disconnect();

	return res.status(200).json(users);
};
