import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/database/index';
import { Product } from '@/models/index';
import { IProduct } from '@/interfaces/products';

type Data =
	| {
			message: string;
	  }
	| IProduct;

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	switch (req.method) {
		case 'GET':
			return getProductBySlug(req, res);

		default:
			return res.status(400).json({ message: 'Bad request' });
	}
}

const getProductBySlug = async (
	req: NextApiRequest,
	res: NextApiResponse<Data>
) => {
	const { slug } = req.query;
	await db.connect();
	const product = await Product.findOne({ slug }).lean();

	await db.disconnect();

	if (!product) {
		return res.status(404).json({ message: 'Bad request' });
	}

	return res.status(200).json(product);
};
