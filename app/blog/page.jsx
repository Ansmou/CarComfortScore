import { ARTICLES } from '../../data/cars';
import BlogClient from '../../components/BlogClient';

export const metadata = {
  title: 'Articles & Analysis — CarComfortScore',
  description: 'Deep-dive articles on Pakistan car suspension, ride quality comparisons, and the engineering behind CarComfortScore ratings.',
};

export default function BlogPage() {
  return <BlogClient articles={ARTICLES} />;
}
