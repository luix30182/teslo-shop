import { Box, Button, CardActionArea, CardMedia, Grid, Link, Typography } from '@mui/material';
import NextLink from 'next/link';
import { ItemCounter } from '../ui/ItemCounter';
import { FC, useContext } from 'react';
import { CartContext } from '@/context/cart';

interface Props {
	editable?: boolean;
}

export const CartList: FC<Props> = ({ editable = false }) => {
	const { cart } = useContext(CartContext);

	return (
		<>
			{cart.map(product => (
				<Grid container spacing={2} sx={{ mb: 1 }} key={product.slug + product.size}>
					<Grid item xs={3}>
						<NextLink href={`/product/${product.slug}`} passHref>
							<Link>
								<CardActionArea>
									<CardMedia image={`/products/${product.image}`} component="img" sx={{ borderRadius: '5px' }} />
								</CardActionArea>
							</Link>
						</NextLink>
					</Grid>
					<Grid item xs={7}>
						<Box display="flex" flexDirection="column">
							<Typography variant="body1">{product.title}</Typography>
							<Typography variant="body1">
								Size: <strong>{product.size}</strong>
							</Typography>

							{editable ? (
								<ItemCounter
									currentValue={product.quantity}
									updatedQuantity={onUpdatedQuantity}
									maxValue={tempCartProduct.inStock > 5 ? 5 : tempCartProduct.inStock}
								/>
							) : (
								<Typography>{product.quantity} Items</Typography>
							)}
						</Box>
					</Grid>
					<Grid item xs={2} display="flex" alignItems="center" flexDirection="column">
						<Typography variant="subtitle1">${product.price}</Typography>
						{editable && (
							<Button variant="text" color="secondary">
								Remove
							</Button>
						)}
					</Grid>
				</Grid>
			))}
		</>
	);
};
