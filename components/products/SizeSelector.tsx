import { Box, Button } from '@mui/material';
import { FC } from 'react';
import { ISize } from '../../interfaces/products';

interface Props {
	selectedSize?: ISize;
	sizes: ISize[];
	onSelecteedSize: (size: ISize) => void;
}

export const SizeSelector: FC<Props> = ({ selectedSize, sizes, onSelecteedSize }) => {
	return (
		<Box>
			{sizes.map(size => (
				<Button
					key={size}
					size="small"
					color={selectedSize === size ? 'primary' : 'info'}
					onClick={() => onSelecteedSize(size)}
				>
					{size}
				</Button>
			))}
		</Box>
	);
};
