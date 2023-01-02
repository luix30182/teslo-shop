import { Grid, Typography } from '@mui/material';
import { useContext } from 'react';
import { CartContext } from '@/context/cart/CartContext';
import { format } from '@/utils/index';

export const OrderSummary = () => {
	const { numberOfItems, subTotal, tax, total } = useContext(CartContext);

	return (
		<Grid container>
			<Grid item xs={6}>
				<Typography>No. Products</Typography>
			</Grid>
			<Grid item xs={6} display="flex" justifyContent="end">
				<Typography>
					{numberOfItems} {numberOfItems > 0 ? 'products' : 'product'}
				</Typography>
			</Grid>
			<Grid item xs={6} display="flex">
				<Typography>Subtotal</Typography>
			</Grid>
			<Grid item xs={6} display="flex" justifyContent="end">
				<Typography>{format(subTotal)}</Typography>
			</Grid>
			<Grid item xs={6} display="flex">
				<Typography>Taxes ({Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100}%)</Typography>
			</Grid>
			<Grid item xs={6} display="flex" justifyContent="end">
				<Typography>{format(tax)}</Typography>
			</Grid>
			<Grid item xs={6} display="flex">
				<Typography variant="subtitle1">Total</Typography>
			</Grid>
			<Grid item xs={6} display="flex" justifyContent="end">
				<Typography>{format(total)}</Typography>
			</Grid>
		</Grid>
	);
};
