import React, { useEffect, useState } from 'react';
import NextLink from 'next/link';
import {
	Typography,
	Grid,
	Card,
	CardContent,
	Divider,
	Box,
	Button,
	Link,
	Chip
} from '@mui/material';
import { CartList, OrderSummary } from '@/components/cart';
import { ShopLayout } from '@/components/layouts';
import { useContext } from 'react';
import { CartContext } from '@/context/cart/CartContext';
import { countries } from '@/utils/countries';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

const SummaryPage = () => {
	const router = useRouter();
	const { shippingAddress, numberOfItems, createOrder } =
		useContext(CartContext);

	const [isPosting, setIsPosting] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	useEffect(() => {
		if (!Cookies.get('firstName')) {
			router.push('/checkout/address');
		}
	}, [router]);

	const onCreateOrder = async () => {
		setIsPosting(true);
		const { hasError, message } = await createOrder();

		if (hasError) {
			setIsPosting(false);
			setErrorMessage(message);
			return;
		}

		router.replace(`/orders/${message}`);
	};

	return (
		<ShopLayout title="Review order" pageDescription="Review order">
			<Typography variant="h1" component="h1">
				Review Order
			</Typography>

			<Grid container>
				<Grid item xs={12} sm={7}>
					<CartList />
				</Grid>
				<Grid item xs={12} sm={5}>
					<Card className="summary-card">
						<CardContent>
							<Typography variant="h2">
								Summary ({numberOfItems}{' '}
								{numberOfItems === 1 ? 'product' : 'products'})
							</Typography>
							<Divider sx={{ my: 1 }} />

							<Box display="flex" justifyContent="space-between">
								<Typography variant="subtitle1">Delivery address</Typography>
								<NextLink href="/checkout/address" passHref>
									<Link underline="always">Edit</Link>
								</NextLink>
							</Box>

							<Typography>
								{shippingAddress?.firstName} {shippingAddress?.lastName}
							</Typography>
							<Typography>
								{shippingAddress?.address}{' '}
								{shippingAddress?.address2 ? shippingAddress?.address2 : ''}
							</Typography>
							<Typography>
								{shippingAddress?.city}, {shippingAddress?.zip}
							</Typography>
							<Typography>
								{countries.find(c => c.code === shippingAddress?.country)?.name}
							</Typography>
							<Typography>{shippingAddress?.phone}</Typography>
							<Divider sx={{ my: 1 }} />

							<Box display="flex" justifyContent="end">
								<NextLink href="/cart" passHref>
									<Link underline="always">Edit</Link>
								</NextLink>
							</Box>

							<OrderSummary />
							<Box sx={{ mt: 3 }} display="flex" flexDirection="column">
								<Button
									color="secondary"
									className="circular-btn"
									fullWidth
									disabled={isPosting}
									onClick={onCreateOrder}
								>
									Place order
								</Button>
								<Chip
									color="error"
									label={errorMessage}
									sx={{ display: errorMessage ? 'flex' : 'none', mt: 2 }}
								/>
							</Box>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</ShopLayout>
	);
};

export default SummaryPage;
