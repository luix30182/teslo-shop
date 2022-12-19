import { Typography } from '@mui/material';
import type { NextPage } from 'next';
import { ShopLayout } from '../../components/layouts';
import { ProductList } from '../../components/products';
import { FullScreenLoading } from '../../components/ui';
import { useProducts } from '../../hooks';

const WomenPage: NextPage = () => {
	const { products, isLoading } = useProducts('/products?gender=women');

	return (
		<ShopLayout title={'Teslo-shop - Men'} pageDescription={'Find the best products for kids'}>
			<Typography variant="h1" component="h1">
				Store
			</Typography>
			<Typography variant="h2" component="h2">
				WomenPage products
			</Typography>

			{isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
		</ShopLayout>
	);
};

export default WomenPage;
