import { createContext } from 'react';
import { ICartProduct } from '@/interfaces/index';

interface ContextProps {
	cart: ICartProduct[];
}

export const CartContext = createContext({} as ContextProps);
