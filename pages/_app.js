import {GoogleAnalytics} from 'nextjs-google-analytics';

const App = ({Component, pageProps}) => (
	<>
		<GoogleAnalytics trackPageViews />
		<Component {...pageProps} />
	</>
);

export default App;
