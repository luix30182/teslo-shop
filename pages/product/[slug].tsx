import { Box, Button, Chip, Grid, Typography } from '@mui/material';
import { NextPage } from 'next';
import { ShopLayout } from '@/components/layouts/ShopLayout';
import { ProductSlideshow, SizeSelector } from '@/components/products';
import { ItemCounter } from '@/components/ui';
import { initialData } from '@/database/products';
import { IProduct, ICartProduct, ISize } from '@/interfaces/index';
import { GetStaticPaths } from 'next';
import { dbProducts } from '@/database/index';
import { GetStaticProps } from 'next';
import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { CartContext } from '@/context/cart';

const product = initialData.products[0];

interface Props {
	product: IProduct;
}

const ProductPage: NextPage<Props> = ({ product }) => {
	const router = useRouter();
	const { addProductToCart } = useContext(CartContext);

	const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
		image: product.images[0],
		price: product.price,
		size: undefined,
		slug: product.slug,
		title: product.title,
		gender: product.gender,
		_id: product._id,
		quantity: 2,
		inStock: 10
	});

	const onSelecteedSize = (size: ISize) => {
		setTempCartProduct(currentProduct => ({ ...currentProduct, size }));
	};

	const onUpdatedQuantity = (quantity: number) => {
		setTempCartProduct(currentProduct => ({ ...currentProduct, quantity }));
	};

	const onAddProduct = () => {
		if (!tempCartProduct.size) return;
		addProductToCart(tempCartProduct);
		router.push('/cart');
	};

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
							<ItemCounter
								currentValue={tempCartProduct.quantity || 1}
								updatedQuantity={onUpdatedQuantity}
								maxValue={tempCartProduct.inStock > 5 ? 5 : tempCartProduct.inStock}
							/>
							<SizeSelector
								selectedSize={tempCartProduct.size}
								sizes={product.sizes}
								onSelecteedSize={onSelecteedSize}
							/>
						</Box>

						{product.inStock > 0 ? (
							<Button
								disabled={!tempCartProduct.size}
								color="secondary"
								className="circular-btn"
								onClick={onAddProduct}
							>
								{tempCartProduct.size ? 'Add to cart' : 'Select a size'}
							</Button>
						) : (
							<Chip label="Product not available" color="error" variant="outlined" />
						)}

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
