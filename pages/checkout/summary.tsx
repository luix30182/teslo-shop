import { Typography, Grid, Card, CardContent, Divider, Box, Button, Link } from '@mui/material';
import React from 'react';
import { CartList, OrderSummary } from '@/components/cart';
import { ShopLayout } from '@/components/layouts';
import NextLink from 'next/link';

const SummaryPage = () => {
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
							<Typography variant="h2">Summary (3 products)</Typography>
							<Divider sx={{ my: 1 }} />

							<Box display="flex" justifyContent="space-between">
								<Typography variant="subtitle1">Delivery address</Typography>
								<NextLink href="/checkout/address" passHref>
									<Link underline="always">Edit</Link>
								</NextLink>
							</Box>

							<Typography>Mario Martinez</Typography>
							<Typography>Some street 1515</Typography>
							<Typography>Queretaro, qro 12312</Typography>
							<Typography>Mexico</Typography>
							<Divider sx={{ my: 1 }} />

							<Box display="flex" justifyContent="end">
								<NextLink href="/cart" passHref>
									<Link underline="always">Edit</Link>
								</NextLink>
							</Box>

							<OrderSummary />
							<Box sx={{ mt: 3 }}>
								<Button color="secondary" className="circular-btn" fullWidth>
									Place order
								</Button>
							</Box>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</ShopLayout>
	);
};

export default SummaryPage;
