import { createContext } from 'react';
import { ICartProduct } from '@/interfaces/index';
import { Address } from './CartProvider';

interface ContextProps {
	cart: ICartProduct[];
	numberOfItems: number;
	subTotal: number;
	tax: number;
	total: number;
	isLoaded: boolean;
	shippingAddress?: Address;
	addProductToCart: (product: ICartProduct) => void;
	updateCartQuantity: (product: ICartProduct) => void;
	removeCartProduct: (product: ICartProduct) => void;
	updateAddress: (address: Address) => void;
}

export const CartContext = createContext({} as ContextProps);
