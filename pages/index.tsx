import { Typography } from '@mui/material';
import type { NextPage } from 'next';
import { ShopLayout } from '../components/layouts';
import { initialData } from '../database/products';
import { ProductList } from '../components/products/ProductList';
import { useProducts } from '../hooks';

const Home: NextPage = () => {
	const { products, isLoading, isError } = useProducts('/products');

	return (
		<ShopLayout title={'Teslo-shop - Home'} pageDescription={'Find the best products'}>
			<Typography variant="h1" component="h1">
				Store
			</Typography>
			<Typography variant="h2" component="h2">
				All products
			</Typography>

			{isLoading ? <h1>Loading...</h1> : <ProductList products={products} />}
		</ShopLayout>
	);
};

export default Home;
