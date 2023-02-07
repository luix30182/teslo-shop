import type { AppProps } from 'next/app';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { lightTheme } from '../themes';
import { SWRConfig } from 'swr';
import { UiProvider } from '@/context/ui/uiProvider';
import { CartProvider } from '@/context/cart/CartProvider';
import { AuthProvider } from '../context/auth/AuthProvider';
import { SessionProvider } from 'next-auth/react';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<SessionProvider>
			<SWRConfig
				value={{
					fetcher: (resource, init) =>
						fetch(resource, init).then(res => res.json())
				}}
			>
				<AuthProvider>
					<CartProvider>
						<UiProvider>
							<ThemeProvider theme={lightTheme}>
								<CssBaseline />
								<Component {...pageProps} />
							</ThemeProvider>
						</UiProvider>
					</CartProvider>
				</AuthProvider>
			</SWRConfig>
		</SessionProvider>
	);
}

export default MyApp;
