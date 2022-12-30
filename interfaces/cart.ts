import { ISize } from './';

export interface ICartProduct {
	image: string;
	price: number;
	size?: ISize;
	slug: string;
	title: string;
	gender: 'men' | 'women' | 'kid' | 'unisex';
	_id: string;
	quantity: number;
}
