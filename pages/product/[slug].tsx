import { Box, Button, Chip, Grid, Typography } from '@mui/material';
import { NextPage } from 'next';
import { ShopLayout } from '@/components/layouts/ShopLayout';
import { ProductSlideshow, SizeSelector } from '@/components/products';
import { ItemCounter } from '@/components/ui';
import { initialData } from '@/database/products';
import { IProduct } from '@/interfaces/products';
import { GetStaticPaths } from 'next';
import { dbProducts } from '@/database/index';
import { GetStaticProps } from 'next';

const product = initialData.products[0];

interface Props {
	product: IProduct;
}

const ProductPage: NextPage<Props> = ({ product }) => {
	return (
		<ShopLayout title={product.title} pageDescription={product.description}>
			<Grid container spacing={3}>
				<Grid item xs={12} sm={7}>
					<ProductSlideshow images={product.images} />
				</Grid>

				<Grid item xs={12} sm={5}>
					<Box display="flex" flexDirection="column">
						<Typography variant="h1" component="h1">
							{product.title}
						</Typography>
						<Typography variant="subtitle1" component="h2">
							${product.price}
						</Typography>

						<Box sx={{ my: 2 }}>
							<Typography variant="subtitle2">Quantity</Typography>
							<ItemCounter />
							<SizeSelector selectedSize={product.sizes[3]} sizes={product.sizes} />
						</Box>

						<Button color="secondary" className="circular-btn">
							Add to cart
						</Button>

						{/* <Chip
              label="Product not available"
              color="error"
              variant="outlined"
            /> */}

						<Box sx={{ mt: 3 }}>
							<Typography variant="subtitle2">Description</Typography>
							<Typography variant="body2">{product.description}</Typography>
						</Box>
					</Box>
				</Grid>
			</Grid>
		</ShopLayout>
	);
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

// export const getServerSideProps: GetServerSideProps = async ({ params }) => {
// 	const { slug } = params as { slug: string };
// 	const product = await dbProducts.getProductsBySlug(slug);

// 	if (!product) {
// 		return {
// 			redirect: {
// 				destination: '/',
// 				permanent: false
// 			}
// 		};
// 	}

// 	return {
// 		props: { product }
// 	};
// };

export const getStaticPaths: GetStaticPaths = async ctx => {
	const productSlugs = await dbProducts.getAllProductSlugs();

	return {
		paths: productSlugs.map(({ slug }) => ({
			params: {
				slug
			}
		})),
		fallback: 'blocking'
	};
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { slug = '' } = (await params) as { slug: string };

	const product = await dbProducts.getProductsBySlug(slug);

	if (!product) {
		return {
			redirect: {
				destination: '/',
				permanent: false
			}
		};
	}

	return {
		props: { product },
		revalidate: 60 * 60 * 24
	};
};

export default ProductPage;
