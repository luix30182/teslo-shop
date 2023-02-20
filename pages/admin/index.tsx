import React from 'react';
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
import { Grid } from '@mui/material';
import { SummaryTile } from '@/components/admin';

const DashboardPage = () => {
	return (
		<AdminLayout
			title="Dashboard"
			subTitle="Statistics"
			icon={<DashboardOutlined />}
		>
			<Grid container spacing={2}>
				<SummaryTile
					title={1}
					subTitle="Total orders"
					icon={<CreditCardOutlined color="secondary" sx={{ fontSize: 40 }} />}
				/>
				<SummaryTile
					title={2}
					subTitle="Payed orders"
					icon={<AttachMoneyOutlined color="success" sx={{ fontSize: 40 }} />}
				/>
				<SummaryTile
					title={3}
					subTitle="Pending orders"
					icon={<CreditCardOffOutlined color="error" sx={{ fontSize: 40 }} />}
				/>
				<SummaryTile
					title={4}
					subTitle="Clients"
					icon={<GroupOutlined color="primary" sx={{ fontSize: 40 }} />}
				/>
				<SummaryTile
					title={5}
					subTitle="Products"
					icon={<CategoryOutlined color="warning" sx={{ fontSize: 40 }} />}
				/>
				<SummaryTile
					title={6}
					subTitle="No stock"
					icon={
						<CancelPresentationOutlined color="error" sx={{ fontSize: 40 }} />
					}
				/>
				<SummaryTile
					title={7}
					subTitle="Low stock"
					icon={
						<ProductionQuantityLimitsOutlined
							color="warning"
							sx={{ fontSize: 40 }}
						/>
					}
				/>
				<SummaryTile
					title={8}
					subTitle="Updating in: "
					icon={<AccessTimeOutlined color="secondary" sx={{ fontSize: 40 }} />}
				/>
			</Grid>
		</AdminLayout>
	);
};

export default DashboardPage;
