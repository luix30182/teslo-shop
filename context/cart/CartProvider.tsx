import { FC, useEffect, useReducer } from 'react';
import { ICartProduct } from '@/interfaces/cart';
import { CartContext } from './CartContext';
import { cartReducer } from './cartReducer';
import Cookie from 'js-cookie';

export interface CartState {
	cart: ICartProduct[];
	numberOfItems: number;
	subTotal: number;
	tax: number;
	total: number;
}

const CART_INITIAL_STATE = {
	cart: [],
	numberOfItems: 0,
	subTotal: 0,
	tax: 0,
	total: 0
};

interface Props {
	children: React.ReactNode;
}

export const CartProvider: FC<Props> = ({ children }) => {
	const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

	useEffect(() => {
		try {
			const cartInCookies = Cookie.get('cart') ? JSON.parse(Cookie.get('cart')!) : [];
			dispatch({ type: '[Cart] - LoadCart from cookies | storage', payload: cartInCookies });
		} catch (err) {
			dispatch({ type: '[Cart] - LoadCart from cookies | storage', payload: [] });
		}
	}, []);

	useEffect(() => {
		Cookie.set('cart', JSON.stringify(state.cart));
	}, [state.cart]);

	useEffect(() => {
		const numberOfItems = state.cart.reduce((prev, curr) => curr.quantity + prev, 0);
		const subTotal = state.cart.reduce((prev, curr) => curr.price * curr.quantity + prev, 0);
		const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);

		const orderSummary = {
			numberOfItems,
			subTotal,
			tax: subTotal * taxRate,
			total: subTotal * (taxRate + 1)
		};

		dispatch({ type: '[Cart] - Update order summary', payload: orderSummary });
	}, [state.cart]);

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

	const updateCartQuantity = (product: ICartProduct) => {
		dispatch({ type: '[Cart] - Change product quantity', payload: product });
	};

	const removeCartProduct = (product: ICartProduct) => {
		dispatch({ type: '[Cart] - Remove product in cart', payload: product });
	};

	return (
		<CartContext.Provider value={{ ...state, addProductToCart, updateCartQuantity, removeCartProduct }}>
			{children}
		</CartContext.Provider>
	);
};
