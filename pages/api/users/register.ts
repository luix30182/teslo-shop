import { db } from '@/database/index';
import User from '@/models/User';
import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { jwt, validations } from '@/utils/index';

type Data =
	| {
			message: string;
	  }
	| { token: string; user: { email: string; name: string; role: string } };

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	switch (req.method) {
		case 'POST':
			return registerUser(req, res);
		default:
			res.status(400).json({ message: 'Bad request' });
	}
}

const registerUser = async (
	req: NextApiRequest,
	res: NextApiResponse<Data>
) => {
	const {
		email = '',
		password = '',
		name = ''
	} = req.body as { email: string; password: string; name: string };

	if (password.length < 6) {
		return res
			.status(400)
			.json({ message: 'Password must have at least six characters' });
	}

	if (name.length < 2) {
		return res.status(400).json({ message: 'Name at least two characters' });
	}

	if (!validations.isValidEmail(email)) {
		return res.status(400).json({ message: 'Nos a valid email' });
	}

	await db.connect();
	const user = await User.findOne({ email });

	if (user) {
		await db.disconnect();
		return res.status(400).json({ message: 'Email already registered' });
	}

	const newUser = new User({
		email: email.toLowerCase(),
		password: bcrypt.hashSync(password),
		role: 'client',
		name
	});

	try {
		await newUser.save({ validateBeforeSave: true });
		await db.connect();
	} catch (error) {
		return res.status(500).json({ message: 'server error' });
	}

	const { _id } = newUser;

	const token = jwt.signToken(_id, email);

	return res.status(200).json({
		token,
		user: {
			email,
			role: 'client',
			name
		}
	});
};
