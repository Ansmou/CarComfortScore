import { SITE_NAME, SITE_DESCRIPTION } from '../data/cars';
import HomeClient from '../components/HomeClient';

export const metadata = {
  title: 'CarComfortScore — Pakistan Car Ride Quality Rankings 2024–25',
  description: SITE_DESCRIPTION,
};

export default function HomePage() {
  return <HomeClient />;
}
