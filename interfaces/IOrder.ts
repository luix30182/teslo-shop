import { IUser } from './user';

export interface IOrder {
	_id?: string;
	user?: IUser | string;
	orderItems: IOrderItem[];
	shippingAddress: Address;
	paymentResult: string;
	numberOfItems: number;
	subTotal: number;
	tax: number;
	total: number;
	isPaid: boolean;
	paidAt?: string;
}

export interface Address {
	firstName: string;
	lastName: string;
	address: string;
	address2?: string;
	zip: string;
	city: string;
	country: string;
	phone: string;
}

export interface IOrderItem {
	_id: string;
	title: string;
	size: string;
	quantity: string;
	slug: string;
	image: string;
	price: number;
}
