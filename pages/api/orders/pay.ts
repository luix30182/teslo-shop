import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { PaypalOrderStatusResponse } from '@/interfaces/paypal';
import db from '@/database/index';
import Order from '@/models/Order';

type Data = {
	message: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	switch (req.method) {
		case 'POST':
			return payOrder(req, res);

		default:
			return res.status(400).json({ message: 'Bad request' });
	}
}

const getPayPalBearerToken = async (): Promise<string | null> => {
	const PAYPAL_CLIENT = process.env.NEXT_PUBLIC_PAYPAL_CLIENT;
	const PAYPAL_SECRET = process.env.PAYPAL_SECRET;

	const base64Token = Buffer.from(
		`${PAYPAL_CLIENT}:${PAYPAL_SECRET}`,
		'utf-8'
	).toString('base64');

	const body = new URLSearchParams('grant_type=client_credentials');

	try {
		const { data } = await axios.post(
			process.env.PAYPAL_OAUTH_URL || '',
			body,
			{
				headers: {
					Authorization: `Basic ${base64Token}`,
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			}
		);
		return data.access_token;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.error(error.response?.data);
		} else {
			console.error(error);
		}
		return null;
	}
};

const payOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	const paypalBearerToken = await getPayPalBearerToken();
	if (!paypalBearerToken) {
		return res.status(400).json({ message: 'Cant confirm token' });
	}

	const { transactionId = '', orderId = '' } = req.body;

	const { data } = await axios.get<PaypalOrderStatusResponse>(
		`${process.env.PAYPAL_ORDERS_URL}/${transactionId}`,
		{
			headers: {
				Authorization: `Bearer ${paypalBearerToken}`
			}
		}
	);

	await db.connect();
	const dbOrder = await Order.findById(orderId);

	if (!dbOrder) {
		await db.disconnect();

		return res.status(400).json({ message: 'Order not in the database' });
	}

	if (dbOrder.total !== Number(data.purchase_units[0].amount.value)) {
		await db.disconnect();

		return res.status(400).json({ message: 'Information mismatch' });
	}

	dbOrder.transactionId = transactionId;
	dbOrder.isPaid = true;

	await db.disconnect();

	return res.status(200).json({ message: 'Order payed' });
};
