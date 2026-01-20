import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
	title:
		'PCBricks — Affordable PC & Laptop Rentals | Custom PC Building Services',
	description:
		'PCBricks provides affordable PC and laptop rentals for businesses, students, and professionals. We also offer expert custom PC building services with flexible plans and reliable support.',
	generator: 'PCBricks',
	keywords: [
		'PC rentals',
		'laptop rentals',
		'computer rental service',
		'gaming PC rental',
		'workstation rental',
		'custom PC build',
		'build your own PC',
		'rent a laptop for business',
		'rent gaming laptop',
		'custom gaming PC',
		'PC rental for events',
		'PCBricks',
	],
	openGraph: {
		title:
			'PCBricks — Affordable PC & Laptop Rentals | Custom PC Building Services',
		description:
			'Affordable and flexible PC & laptop rentals. Expert custom PC building solutions.',
		url: 'https://pcbricks.com',
		siteName: 'PCBricks',
		type: 'website',
		locale: 'en_US',
		images: [
			{
				url: '/favicon/android-chrome-512x512.png',
				width: 512,
				height: 512,
				alt: 'PCBricks Logo',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title:
			'PCBricks — Affordable PC & Laptop Rentals | Custom PC Building Services',
		description:
			'Affordable PC & laptop rentals and custom PC building services.',
		images: ['/favicon/android-chrome-512x512.png'],
	},
	icons: {
		icon: [
			{ url: '/favicon/favicon.ico', sizes: 'any' },
			{ url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
			{ url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
		],
		apple: [
			{ url: '/favicon/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
		],
		shortcut: '/favicon/favicon.ico',
		other: [
			{ rel: 'manifest', url: '/favicon/site.webmanifest' },
			{ rel: 'mask-icon', url: '/favicon/safari-pinned-tab.svg', color: '#5bbad5' },
		],
	},
	manifest: '/favicon/site.webmanifest',
	themeColor: '#ffffff',
	other: {
		'msapplication-TileColor': '#2b5797',
		'msapplication-TileImage': '/favicon/mstile-144x144.png',
		'author': 'PCBricks Team',
		'publisher': 'PCBricks',
		'viewport': 'width=device-width, initial-scale=1',
		'robots': 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
		'canonical': 'https://pcbricks.com',
		'google-site-verification': 'YOUR_GOOGLE_SITE_VERIFICATION',
		'bing-site-verification': 'YOUR_BING_SITE_VERIFICATION',
		'yandex-verification': 'YOUR_YANDEX_SITE_VERIFICATION',
	},
	// Structured data for Organization (JSON-LD)
	metadataBase: new URL('https://pcbricks.com'),
	alternates: {
		canonical: 'https://pcbricks.com',
		languages: {
			'en': 'https://pcbricks.com',
			'hi': 'https://pcbricks.com/hi',
		},
	},
};

// Add JSON-LD structured data for Organization
export function StructuredData() {
	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{
				__html: JSON.stringify({
					'@context': 'https://schema.org',
					'@type': 'Organization',
					name: 'PCBricks',
					url: 'https://pcbricks.com',
					logo: 'https://pcbricks.com/logo.png',
					sameAs: [
						'https://facebook.com',
						'https://x.com',
						'https://instagram.com',
					],
					description:
						'PCBricks provides affordable PC and laptop rentals for businesses, students, and professionals. We also offer expert custom PC building services with flexible plans and reliable support.',
					contactPoint: [
						{
							'@type': 'ContactPoint',
							telephone: '+91-7975506175',
							contactType: 'customer support',
							areaServed: 'IN',
							availableLanguage: ['English', 'Hindi'],
						},
					],
				}),
			}}
		/>
	);
}


export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body>{children}</body>
		</html>
	);
}
