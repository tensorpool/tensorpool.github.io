import {useEffect} from 'react';
import Script from 'next/script';

const ad = () => {
	useEffect(() => {
		try {
			(window.adsbygoogle = window.adsbygoogle || []).push({});
		} catch (error) {
			console.error(error);
		}
	}, []);

	return (
		<div>
			<Script
				id='Adsense-id'
				async
				onError={e => {
					console.error('Script failed to load', e);
				}}
				strategy='afterInteractive'
				src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3060901036251860'
				crossorigin='anonymous'
			/>

			<ins
				className='adsbygoogle'
				style={{display: 'block'}}
				data-ad-client='ca-pub-3060901036251860'
				data-ad-slot='8892081722'
				data-ad-format='auto'
				data-full-width-responsive='true'
				// Data-adtest="on"
			></ins>

		</div>
	);
};

export default ad;
