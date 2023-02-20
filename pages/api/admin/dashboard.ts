import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/database/index';
import { Order, User, Product } from '@/models/index';

type Data = {
	numberOfOrders: number;
	paidOrders: number;
	notPaidOrders: number;
	numberOfClients: number;
	numberOfProducts: number;
	productsWithNoInventory: number;
	lowInventory: number;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data | { message: string }>
) {
	try {
		await db.connect();

		const [
			numberOfOrders,
			paidOrders,
			notPaidOrders,
			numberOfClients,
			numberOfProducts,
			productsWithNoInventory,
			lowInventory
		] = await Promise.all([
			Order.count(),
			Order.find({ isPaid: true }).count(),
			Order.find({ isPaid: false }).count(),
			User.find({ role: 'client' }).count(),
			Product.find().where('inStock').lte(10).count(),
			Product.find({
				inStock: { $eq: 0 }
			}).count(),
			Product.find().where('inStock').lte(10).count()
		]);

		await db.disconnect();
		return res.status(200).json({
			numberOfOrders,
			paidOrders,
			notPaidOrders,
			numberOfClients,
			numberOfProducts,
			productsWithNoInventory,
			lowInventory
		});
	} catch (error) {
		await db.disconnect();
		console.error(error);
		return res.status(200).json({ message: 'error' });
	}
}
