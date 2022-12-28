import { Typography } from '@mui/material';
import type { NextPage } from 'next';
import { ShopLayout } from '@/components/layouts';
import { ProductList } from '@/components/products/ProductList';
import { useProducts } from '../hooks';
import { FullScreenLoading } from '@/components/ui';

const Home: NextPage = () => {
	const { products, isLoading } = useProducts('/products');

	return (
		<ShopLayout title={'Teslo-shop - Home'} pageDescription={'Find the best products'}>
			<Typography variant="h1" component="h1">
				Store
			</Typography>
			<Typography variant="h2" component="h2">
				All products
			</Typography>

			{isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
		</ShopLayout>
	);
};

export default Home;
