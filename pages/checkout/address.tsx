import { ShopLayout } from '../../components/layouts/ShopLayout';
import {
	Box,
	Button,
	FormControl,
	Grid,
	MenuItem,
	Select,
	TextField,
	Typography
} from '@mui/material';
import { countries } from '@/utils/countries';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { CartContext } from '@/context/cart/CartContext';

type FormData = {
	firstName: string;
	lastName: string;
	address: string;
	address2?: string;
	zip: string;
	city: string;
	country: string;
	phone: string;
};

const getAddressFromCookies = (): FormData => {
	return {
		firstName: Cookies.get('firstName') || '',
		lastName: Cookies.get('lastName') || '',
		address: Cookies.get('address') || '',
		address2: Cookies.get('address2') || '',
		zip: Cookies.get('zip') || '',
		city: Cookies.get('city') || '',
		country: Cookies.get('country') || '',
		phone: Cookies.get('phone') || ''
	};
};

const Address = () => {
	const router = useRouter();
	const { updateAddress } = useContext(CartContext);

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<FormData>({
		defaultValues: getAddressFromCookies()
	});

	const onSubmitAddress = (data: FormData) => {
		updateAddress(data);

		router.push('/checkout/summary');
	};

	return (
		<ShopLayout title="Address" pageDescription="Confirm address order">
			<Typography variant="h1" component="h1">
				Address
			</Typography>

			<form onSubmit={handleSubmit(onSubmitAddress)}>
				<Grid container spacing={2}>
					<Grid item xs={12} sm={6}>
						<TextField
							label="Name"
							variant="filled"
							fullWidth
							{...register('firstName', {
								required: 'Required field'
							})}
							error={!!errors.firstName}
							helperText={errors.firstName?.message}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							label="Lastname"
							variant="filled"
							fullWidth
							{...register('lastName', {
								required: 'Required field'
							})}
							error={!!errors.firstName}
							helperText={errors.lastName?.message}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							label="address"
							variant="filled"
							fullWidth
							{...register('address', {
								required: 'Required field'
							})}
							error={!!errors.address}
							helperText={errors.address?.message}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							label="address2 (optional)"
							variant="filled"
							fullWidth
							{...register('address2')}
							error={!!errors.address2}
							helperText={errors.address2?.message}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							label="zipcode"
							variant="filled"
							fullWidth
							{...register('zip', {
								required: 'Required field'
							})}
							error={!!errors.zip}
							helperText={errors.zip?.message}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							label="City"
							variant="filled"
							fullWidth
							{...register('city', {
								required: 'Required field'
							})}
							error={!!errors.city}
							helperText={errors.city?.message}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<FormControl fullWidth>
							<Select
								defaultValue={countries[0].code}
								variant="filled"
								label="Country"
								{...register('country', {
									required: 'Required field'
								})}
								error={!!errors.country}
							>
								{countries.map(country => (
									<MenuItem key={country.code} value={country.code}>
										{country.name}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							label="Phone"
							variant="filled"
							fullWidth
							{...register('phone', {
								required: 'Required field'
							})}
							error={!!errors.phone}
							helperText={errors.phone?.message}
						/>
					</Grid>
				</Grid>

				<Box sx={{ mt: 5 }} display="flex" justifyContent="center">
					<Button
						type="submit"
						color="secondary"
						className="circulat-btn"
						size="large"
					>
						Review Order
					</Button>
				</Box>
			</form>
		</ShopLayout>
	);
};

export default Address;
