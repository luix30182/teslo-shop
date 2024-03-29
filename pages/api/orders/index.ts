import type { NextApiRequest, NextApiResponse } from 'next';
import { IOrder } from '@/interfaces/index';
import { getSession } from 'next-auth/react';
import Product from '@/models/Product';
import Order from '@/models/Order';
import { db } from '@/database/index';

type Data =
	| {
			message: string;
	  }
	| IOrder;

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	switch (req.method) {
		case 'POST':
			return createOrder(req, res);

		default:
			return res.status(400).json({ message: 'Bad request' });
	}
}

const createOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	const { orderItems, total } = req.body as IOrder;

	const session: any = await getSession({ req });
	if (!session) {
		return res.status(401).json({ message: 'User not authenticated' });
	}

	const productsIds = orderItems.map(p => p._id);

	await db.connect();

	const dbProducts = await Product.find({ _id: { $in: productsIds } });

	try {
		const subTotal = orderItems.reduce((prev, current) => {
			const currentPrice = dbProducts.find(
				prod => prod.id === current._id
			)!.price;
			if (!currentPrice) {
				throw new Error('Verify products in cart');
			}
			return currentPrice * current.quantity + prev;
		}, 0);
		const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);
		const backendTotal = subTotal * (taxRate + 1);

		if (backendTotal !== total) {
			throw new Error('Data mismatch');
		}

		const userId = session.user._id;
		const newOrder = new Order({ ...req.body, isPaid: false, user: userId });
		newOrder.total = Math.round(newOrder.total * 100) / 100;
		await newOrder.save();
		return res.status(201).json(newOrder);
	} catch (error: any) {
		console.error(error);
		await db.disconnect();
		return res.status(400).json({ message: error.message || 'Check logs' });
	}
};
