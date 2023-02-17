import { ShopLayout } from '../../components/layouts/ShopLayout';
import { Chip, Grid, Link, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import NextLink from 'next/link';
import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { dbOrders } from '@/database/index';
import { IOrder } from '@/interfaces/IOrder';

const columns: GridColDef[] = [
	{ field: 'id', headerName: 'ID', width: 100 },
	{ field: 'fullname', headerName: 'Full name', width: 300 },
	{
		field: 'paid',
		headerName: 'Paid',
		description: 'Shows if order already paid',
		width: 200,
		renderCell: (params: GridRenderCellParams<any, any, any>) => {
			return params.row.paid ? (
				<Chip color="success" label="Paid" variant="outlined" />
			) : (
				<Chip color="error" label="Pending" variant="outlined" />
			);
		}
	},
	{
		field: 'order',
		headerName: 'Order',
		description: 'Go to order',
		width: 200,
		sortable: false,
		renderCell: (params: GridRenderCellParams<any, any, any>) => {
			return (
				<NextLink href={`/orders/${params.row.orderId}`} passHref>
					<Link>See order</Link>
				</NextLink>
			);
		}
	}
];

interface Props {
	orders: IOrder[];
}

const History: NextPage<Props> = ({ orders }) => {
	const rows = orders.map((order, i) => ({
		id: i + 1,
		fullname: `${order.shippingAddress.firstName} ${order.shippingAddress.lastName}`,
		paid: order.isPaid,
		orderId: order._id
	}));

	return (
		<ShopLayout title="Orders history" pageDescription="Client order history">
			<Typography variant="h1" component="h1">
				Orders History
			</Typography>

			<Grid container>
				<Grid item xs={12} sx={{ height: 650, width: '100%' }}>
					<DataGrid
						rows={rows}
						columns={columns}
						pageSize={10}
						rowsPerPageOptions={[10]}
					/>
				</Grid>
			</Grid>
		</ShopLayout>
	);
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	const session: any = await getSession({ req });
	if (!session) {
		return {
			redirect: {
				destination: '/auth/login?p=/orders/history',
				permanent: false
			}
		};
	}

	const orders = await dbOrders.getOrdersByUser(session.user._id);

	return {
		props: {
			orders
		}
	};
};

export default History;
