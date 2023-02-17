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
import {
	CreditCardOffOutlined,
	CreditScoreOutlined
} from '@mui/icons-material';
import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { dbOrders } from '@/database/index';
import { IOrder } from '@/interfaces/IOrder';
import { CartList, OrderSummary } from '@/components/cart';
import { ShopLayout } from '@/components/layouts';

interface Props {
	order: IOrder;
}

const OrderPage: NextPage<Props> = ({ order }) => {
	const { shippingAddress } = order;
	return (
		<ShopLayout title="Order Summary 12313" pageDescription="Order Summary">
			<Typography variant="h1" component="h1">
				Review Order {order._id}
			</Typography>

			{order.isPaid ? (
				<Chip
					sx={{ my: 2 }}
					label="Payed"
					variant="outlined"
					color="success"
					icon={<CreditScoreOutlined />}
				/>
			) : (
				<Chip
					sx={{ my: 2 }}
					label="Pending payment"
					variant="outlined"
					color="error"
					icon={<CreditCardOffOutlined />}
				/>
			)}

			<Grid container>
				<Grid item xs={12} sm={7}>
					<CartList products={order.orderItems} />
				</Grid>
				<Grid item xs={12} sm={5}>
					<Card className="summary-card">
						<CardContent>
							<Typography variant="h2">
								Summary ({order.numberOfItems}{' '}
								{order.numberOfItems > 1 ? 'products' : 'product'})
							</Typography>
							<Divider sx={{ my: 1 }} />

							<Box display="flex" justifyContent="space-between">
								<Typography variant="subtitle1">Delivery address</Typography>
							</Box>

							<Typography>
								{shippingAddress.firstName} {shippingAddress.lastName}
							</Typography>
							<Typography>{shippingAddress.address}</Typography>
							{shippingAddress.address2 &&
								shippingAddress.address2?.length > 0 && (
									<Typography>{shippingAddress.address2}</Typography>
								)}
							<Typography>
								{shippingAddress.city}, {shippingAddress.zip}
							</Typography>
							<Typography>{shippingAddress.country}</Typography>
							<Divider sx={{ my: 1 }} />
							<OrderSummary orderValues={order} />
							<Box sx={{ mt: 3 }}>
								{order.isPaid ? (
									<Chip
										sx={{ my: 2 }}
										label="Payed"
										variant="outlined"
										color="success"
										icon={<CreditScoreOutlined />}
									/>
								) : (
									<h3>Pay</h3>
								)}
							</Box>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</ShopLayout>
	);
};

export const getServerSideProps: GetServerSideProps = async ({
	req,
	query
}) => {
	const { id = '' } = query as any;
	const session: any = await getSession({ req });

	if (!session) {
		return {
			redirect: {
				destination: `/auth/login?p=/orders/${id}`,
				permanent: false
			}
		};
	}

	const order = await dbOrders.getOrderById(id);

	if (!order) {
		return {
			redirect: {
				destination: `/orders/history`,
				permanent: false
			}
		};
	}

	if (order.user !== session.user._id) {
		return {
			redirect: {
				destination: `/orders/history`,
				permanent: false
			}
		};
	}

	return {
		props: {
			order
		}
	};
};

export default OrderPage;
