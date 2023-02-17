import { Grid, Typography } from '@mui/material';
import { FC, useContext } from 'react';
import { CartContext } from '@/context/cart/CartContext';
import { format } from '@/utils/index';

interface Props {
	orderValues?: {
		numberOfItems: number;
		subTotal: number;
		total: number;
		tax: number;
	};
}

export const OrderSummary: FC<Props> = ({ orderValues }) => {
	const { numberOfItems, subTotal, tax, total } = useContext(CartContext);

	const summaryValues = orderValues
		? orderValues
		: { numberOfItems, subTotal, tax, total };

	console.log(orderValues);

	return (
		<Grid container>
			<Grid item xs={6}>
				<Typography>No. Products</Typography>
			</Grid>
			<Grid item xs={6} display="flex" justifyContent="end">
				<Typography>
					{summaryValues.numberOfItems}{' '}
					{summaryValues.numberOfItems > 0 ? 'products' : 'product'}
				</Typography>
			</Grid>
			<Grid item xs={6} display="flex">
				<Typography>Subtotal</Typography>
			</Grid>
			<Grid item xs={6} display="flex" justifyContent="end">
				<Typography>{format(summaryValues.subTotal)}</Typography>
			</Grid>
			<Grid item xs={6} display="flex">
				<Typography>
					Taxes ({Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100}%)
				</Typography>
			</Grid>
			<Grid item xs={6} display="flex" justifyContent="end">
				<Typography>{format(summaryValues.tax)}</Typography>
			</Grid>
			<Grid item xs={6} display="flex">
				<Typography variant="subtitle1">Total</Typography>
			</Grid>
			<Grid item xs={6} display="flex" justifyContent="end">
				<Typography>{format(summaryValues.total)}</Typography>
			</Grid>
		</Grid>
	);
};
