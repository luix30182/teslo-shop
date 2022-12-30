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

	const addProductToCart = (product: ICartProduct) => {
		const productInCart = state.cart.find(p => p._id === product._id && p.size === product.size);
		if (productInCart) {
			dispatch({
				type: '[Cart] - Add product',
				payload: state.cart.map(p => {
					if (p._id === productInCart._id && p.size === product.size) {
						p.quantity = p.quantity + product.quantity;
					}
					return p;
				})
			});
		} else {
			dispatch({ type: '[Cart] - Add product', payload: [...state.cart, product] });
		}
	};

	return <CartContext.Provider value={{ ...state, addProductToCart }}>{children}</CartContext.Provider>;
};
