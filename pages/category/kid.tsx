import { Typography } from '@mui/material';
import type { NextPage } from 'next';
import { ShopLayout } from '../../components/layouts';
import { ProductList } from '../../components/products';
import { FullScreenLoading } from '../../components/ui';
import { useProducts } from '../../hooks';

const KidPage: NextPage = () => {
	const { products, isLoading } = useProducts('/products?gender=kid');

	return (
		<ShopLayout title={'Teslo-shop - Kids'} pageDescription={'Find the best products for kids'}>
			<Typography variant="h1" component="h1">
				Kids Store
			</Typography>
			<Typography variant="h2" component="h2">
				Kids products
			</Typography>

			{isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
		</ShopLayout>
	);
};

export default KidPage;
