import { FC, useReducer } from 'react';
import { ICartProduct } from '@/interfaces/cart';
import { CartContext } from './CartContext';
import { cartReducer } from './cartReducer';

export interface CartState {
	cart: ICartProduct[];
}

const CART_INITIAL_STATE = {
	cart: []
};

interface Props {
	children: React.ReactNode;
}

export const CartProvider: FC<Props> = ({ children }) => {
	const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

	return <CartContext.Provider value={{ ...state }}>{children}</CartContext.Provider>;
};
