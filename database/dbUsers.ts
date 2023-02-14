import { User } from '../models';
import { db } from './';
import bcrypt from 'bcryptjs';

export const checkUserEmailPassword = async (
	email: string,
	password: string
) => {
	await db.connect();
	const user = await User.findOne({ email });
	await db.disconnect();

	if (!user) {
		return null;
	}

	if (!bcrypt.compareSync(password, user.password!)) {
		return null;
	}

	const { _id, role, name } = user;

	return {
		_id,
		id: _id,
		email: email.toLowerCase(),
		role,
		name
	};
};

export const oAuthToDbUser = async (
	oAuthEmail: string,
	oAuthName: string
): Promise<{
	_id: string;
	id: string;
	name: string;
	email: string;
	role: string;
}> => {
	await db.connect();
	const user = await User.findOne({ email: oAuthEmail });

	if (user) {
		await db.disconnect();
		const { _id, name, email, role } = user;
		return { _id, id: _id, name, email, role };
	}

	const newUser = new User({
		email: oAuthEmail,
		name: oAuthName,
		password: '@',
		role: 'client'
	});
	newUser.save();
	await db.disconnect();

	const { _id, name, email, role } = newUser;
	return { _id, id: _id, name, email, role };
};
