import React from 'react';
import { AdminLayout } from '@/components/layouts/AdminLayout';
import { DashboardOutlined } from '@mui/icons-material';

const DashboardPage = () => {
	return (
		<AdminLayout
			title="Dashboard"
			subTitle="Statistics"
			icon={<DashboardOutlined />}
		></AdminLayout>
	);
};

export default DashboardPage;
