export interface DashboardSummary {
	numberOfOrders: number;
	paidOrders: number;
	notPaidOrders: number;
	numberOfClients: number;
	numberOfProducts: number;
	productsWithNoInventory: number;
	lowInventory: number;
}

export const validRoles = ['admin', 'client', 'super-user', 'SEO'];
