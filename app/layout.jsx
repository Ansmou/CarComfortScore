import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  metadataBase: new URL('https://carcomfortscore.com'),
  title: { default: 'CarComfortScore — Pakistan Car Ride Quality Rankings', template: '%s | CarComfortScore' },
  description: 'Engineering-based ride quality scores for Pakistan\'s car market. Based on ISO 2631-1 whole-body vibration standards. Compare Honda Civic vs Corolla, Fortuner vs others, and more.',
  keywords: ['car comfort Pakistan', 'ride quality Pakistan', 'Honda Civic suspension', 'Toyota Corolla suspension', 'best car Pakistan ride quality', 'ISO 2631 car comfort'],
  openGraph: {
    type: 'website',
    siteName: 'CarComfortScore',
    title: 'CarComfortScore — Pakistan Car Ride Quality Rankings',
    description: 'Engineering-based ride quality scores for Pakistan\'s car market.',
    url: 'https://carcomfortscore.com',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}
