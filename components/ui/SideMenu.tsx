import { useContext, useState } from 'react';

import {
	Box,
	Divider,
	Drawer,
	IconButton,
	Input,
	InputAdornment,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	ListSubheader
} from '@mui/material';
import {
	AccountCircleOutlined,
	AdminPanelSettings,
	CategoryOutlined,
	ConfirmationNumberOutlined,
	EscalatorWarningOutlined,
	FemaleOutlined,
	LoginOutlined,
	MaleOutlined,
	SearchOutlined,
	VpnKeyOutlined
} from '@mui/icons-material';

import { useRouter } from 'next/router';
import { UiContext } from 'context';
import { AuthContext } from '../../context/auth/AuthContext';
import { DashboardOutlined } from '@mui/icons-material';

export const SideMenu = () => {
	const { user, isLoggedIn, logout } = useContext(AuthContext);

	const router = useRouter();
	const { isMenuOpen, toggleSideMenu } = useContext(UiContext);

	const [searchTerm, setSearchTerm] = useState('');

	const onSearchTerm = () => {
		if (searchTerm.trim().length === 0) return;
		navigateTo(`/search/${searchTerm}`);
	};

	const navigateTo = (url: string) => {
		toggleSideMenu();
		router.push(url);
	};

	const onLoggout = () => {
		logout();
	};

	return (
		<Drawer
			open={isMenuOpen}
			anchor="right"
			sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
			onClose={toggleSideMenu}
		>
			<Box sx={{ width: 250, paddingTop: 5 }}>
				<List>
					<ListItem sx={{ display: { xs: 'flex', sm: 'none' } }}>
						<Input
							autoFocus
							value={searchTerm}
							onChange={e => setSearchTerm(e.target.value)}
							onKeyPress={e => (e.key === 'Enter' ? onSearchTerm() : null)}
							type="text"
							placeholder="Buscar..."
							endAdornment={
								<InputAdornment position="end">
									<IconButton onClick={onSearchTerm}>
										<SearchOutlined />
									</IconButton>
								</InputAdornment>
							}
						/>
					</ListItem>

					{isLoggedIn && (
						<>
							<ListItem button>
								<ListItemIcon>
									<AccountCircleOutlined />
								</ListItemIcon>
								<ListItemText primary={'Perfil'} />
							</ListItem>

							<ListItem button onClick={() => navigateTo('/orders/history')}>
								<ListItemIcon>
									<ConfirmationNumberOutlined />
								</ListItemIcon>
								<ListItemText primary={'Mis Ordenes'} />
							</ListItem>
						</>
					)}

					<ListItem
						button
						sx={{ display: { xs: '', sm: 'none' } }}
						onClick={() => navigateTo('/category/men')}
					>
						<ListItemIcon>
							<MaleOutlined />
						</ListItemIcon>
						<ListItemText primary={'Hombres'} />
					</ListItem>

					<ListItem
						button
						sx={{ display: { xs: '', sm: 'none' } }}
						onClick={() => navigateTo('/category/women')}
					>
						<ListItemIcon>
							<FemaleOutlined />
						</ListItemIcon>
						<ListItemText primary={'Mujeres'} />
					</ListItem>

					<ListItem
						button
						sx={{ display: { xs: '', sm: 'none' } }}
						onClick={() => navigateTo('/category/kid')}
					>
						<ListItemIcon>
							<EscalatorWarningOutlined />
						</ListItemIcon>
						<ListItemText primary={'Niños'} />
					</ListItem>

					{!isLoggedIn && (
						<ListItem
							button
							onClick={() => navigateTo(`/auth/login?p=${router.asPath}`)}
						>
							<ListItemIcon>
								<VpnKeyOutlined />
							</ListItemIcon>
							<ListItemText primary={'Ingresar'} />
						</ListItem>
					)}

					{isLoggedIn && (
						<>
							<ListItem button onClick={onLoggout}>
								<ListItemIcon>
									<LoginOutlined />
								</ListItemIcon>
								<ListItemText primary={'Salir'} />
							</ListItem>
						</>
					)}

					{/* Admin */}

					{isLoggedIn && user?.role === 'admin' && (
						<>
							<Divider />
							<ListSubheader>Admin Panel</ListSubheader>

							<ListItem button onClick={() => navigateTo('/admin/')}>
								<ListItemIcon>
									<DashboardOutlined />
								</ListItemIcon>
								<ListItemText primary={'Dashboard'} />
							</ListItem>
							<ListItem button>
								<ListItemIcon>
									<ConfirmationNumberOutlined />
								</ListItemIcon>
								<ListItemText primary={'Ordenes'} />
							</ListItem>

							<ListItem button>
								<ListItemIcon>
									<AdminPanelSettings />
								</ListItemIcon>
								<ListItemText primary={'Usuarios'} />
							</ListItem>
						</>
					)}
				</List>
			</Box>
		</Drawer>
	);
};
