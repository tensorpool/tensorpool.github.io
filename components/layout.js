import {ChakraProvider, extendTheme, Box} from '@chakra-ui/react';
import Head from 'next/head';
import Script from 'next/script';
import {GoogleAnalytics} from 'nextjs-google-analytics';
import Header from './header.js';
import Footer from './footer.js';
import '@fontsource/space-grotesk/600.css';
import '@fontsource/red-hat-display/500.css';

const theme = extendTheme({
	fonts: {
		heading: '\'Space Grotesk\', sans-serif',
		body: '\'Red Hat Display\', sans-serif',
	},
	colors: {
		rpblue: '#123456',
		rpmblue: '#5689DB',
		rpgrey: '#52565A',
	},
	components: {
		Button: {
			baseStyle: {
				borderRadius: 100,
			},
		},
	},
});

const title = 'TensorPool — Access GPUs in two lines of code';
const description
  = 'Save money, time, and the environment by finding someone to split a rideshare with on Ridepool.';
const ogImage = 'https://ridepoolapp.com/images/meta-preview.png';

const Layout = ({children}) => (
	<ChakraProvider theme={theme}>

		<Head>
			{/* Primary Meta Tags */}
			<title>TensorPool — Access GPUs in two lines of code</title>
			<meta name='title' content={title} />
			<meta name='description' content={description} />
			<meta name='viewport' content='initial-scale=1.0, width=device-width' />

			{/* Open Graph / Facebook */}
			<meta property='og:type' content='website' />
			<meta property='og:url' content='https://ridepoolapp.com/' />
			<meta property='og:title' content={title} />
			<meta property='og:description' content={description} />
			<meta property='og:image' content={ogImage} />

			{/* Twitter */}
			<meta property='twitter:card' content='summary_large_image' />
			<meta property='twitter:url' content='https://ridepoolapp.com/' />
			<meta property='twitter:title' content={title} />
			<meta property='twitter:description' content={description} />
			<meta property='twitter:image' content={ogImage} />

			{/* Google Analytics Adsense */}
			<Script
				async
				src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3060901036251860'
				crossorigin='anonymous'
			/>

		</Head>

		<Header />

		<Box py={[2, 5]} bg='rpblue' color='white'>
			{children}
		</Box>

		<Footer />

	</ChakraProvider>
);

export default Layout;
