import { Typography } from '@mui/material';
import type { NextPage } from 'next';
import { ShopLayout } from '../components/layouts';

const Home: NextPage = () => {
  return (
    <ShopLayout
      title={'Teslo-shop - Home'}
      pageDescription={'Find the best products'}
    >
      <Typography variant="h1" component="h1">
        Store
      </Typography>
      <Typography variant="h2" component="h2">
        All products
      </Typography>
    </ShopLayout>
  );
};

export default Home;
