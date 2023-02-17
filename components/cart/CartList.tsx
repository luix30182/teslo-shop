import {
	Box,
	Button,
	CardActionArea,
	CardMedia,
	Grid,
	Link,
	Typography
} from '@mui/material';
import NextLink from 'next/link';
import { ItemCounter } from '../ui/ItemCounter';
import { FC, useContext } from 'react';
import { CartContext } from '@/context/cart';
import { ICartProduct, IOrderItem } from '@/interfaces/index';

interface Props {
	editable?: boolean;
	products?: IOrderItem[];
}

export const CartList: FC<Props> = ({ editable = false, products }) => {
	const { cart, updateCartQuantity, removeCartProduct } =
		useContext(CartContext);

	const onUpdatedQuantity = (
		product: IOrderItem | ICartProduct,
		quantity: number
	) => {
		product.quantity = quantity;
		updateCartQuantity(product as ICartProduct);
	};

	const removeProduct = (product: IOrderItem | ICartProduct) => {
		removeCartProduct(product as ICartProduct);
	};

	const productsToShow = products ? products : cart;

	return (
		<>
			{productsToShow.map(product => (
				<Grid
					container
					spacing={2}
					sx={{ mb: 1 }}
					key={product.slug + product.size}
				>
					<Grid item xs={3}>
						<NextLink href={`/product/${product.slug}`} passHref>
							<Link>
								<CardActionArea>
									<CardMedia
										image={`/products/${product.image}`}
										component="img"
										sx={{ borderRadius: '5px' }}
									/>
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
									currentValue={product.quantity || 1}
									updatedQuantity={value => onUpdatedQuantity(product, value)}
									maxValue={product?.inStock! > 5 ? 5 : product.inStock!}
								/>
							) : (
								<Typography>{product.quantity} Items</Typography>
							)}
						</Box>
					</Grid>
					<Grid
						item
						xs={2}
						display="flex"
						alignItems="center"
						flexDirection="column"
					>
						<Typography variant="subtitle1">${product.price}</Typography>
						{editable && (
							<Button
								variant="text"
								color="secondary"
								onClick={() => removeProduct(product)}
							>
								Remove
							</Button>
						)}
					</Grid>
				</Grid>
			))}
		</>
	);
};
