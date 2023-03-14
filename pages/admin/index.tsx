import React, { useState } from 'react';
import { AdminLayout } from '@/components/layouts/AdminLayout';
import {
	DashboardOutlined,
	CreditCardOffOutlined,
	AttachMoneyOutlined,
	CreditCardOutlined,
	GroupOutlined,
	CategoryOutlined,
	CancelPresentationOutlined,
	ProductionQuantityLimitsOutlined,
	AccessTimeOutlined
} from '@mui/icons-material';
import { Grid, Typography } from '@mui/material';
import { SummaryTile } from '@/components/admin';
import useSWR from 'swr';
import { DashboardSummary } from '@/interfaces/index';
import { useEffect } from 'react';

const DashboardPage = () => {
	const { data, error } = useSWR<DashboardSummary>('/api/admin/dashboard', {
		refreshInterval: 30 * 1000
	});

	const [refreshIn, setRefreshIn] = useState(30);

	useEffect(() => {
		const interval = setInterval(() => {
			setRefreshIn(refreshIn => (refreshIn > 0 ? refreshIn - 1 : 30));
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	if (!error && !data) {
		return <></>;
	}

	if (error) {
		console.error(error);
		return <Typography>Error while loading the data</Typography>;
	}

	const {
		numberOfOrders,
		paidOrders,
		notPaidOrders,
		numberOfClients,
		numberOfProducts,
		productsWithNoInventory,
		lowInventory
	} = data!;

	return (
		<AdminLayout
			title="Dashboard"
			subTitle="Statistics"
			icon={<DashboardOutlined />}
		>
			<Grid container spacing={2}>
				<SummaryTile
					title={numberOfOrders}
					subTitle="Total orders"
					icon={<CreditCardOutlined color="secondary" sx={{ fontSize: 40 }} />}
				/>
				<SummaryTile
					title={paidOrders}
					subTitle="Payed orders"
					icon={<AttachMoneyOutlined color="success" sx={{ fontSize: 40 }} />}
				/>
				<SummaryTile
					title={notPaidOrders}
					subTitle="Pending orders"
					icon={<CreditCardOffOutlined color="error" sx={{ fontSize: 40 }} />}
				/>
				<SummaryTile
					title={numberOfClients}
					subTitle="Clients"
					icon={<GroupOutlined color="primary" sx={{ fontSize: 40 }} />}
				/>
				<SummaryTile
					title={numberOfProducts}
					subTitle="Products"
					icon={<CategoryOutlined color="warning" sx={{ fontSize: 40 }} />}
				/>
				<SummaryTile
					title={productsWithNoInventory}
					subTitle="No stock"
					icon={
						<CancelPresentationOutlined color="error" sx={{ fontSize: 40 }} />
					}
				/>
				<SummaryTile
					title={lowInventory}
					subTitle="Low stock"
					icon={
						<ProductionQuantityLimitsOutlined
							color="warning"
							sx={{ fontSize: 40 }}
						/>
					}
				/>
				<SummaryTile
					title={refreshIn}
					subTitle="Updating in: "
					icon={<AccessTimeOutlined color="secondary" sx={{ fontSize: 40 }} />}
				/>
			</Grid>
		</AdminLayout>
	);
};

export default DashboardPage;
