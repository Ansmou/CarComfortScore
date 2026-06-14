import { ARTICLES } from '../../../data/cars';
import ArticleClient from '../../../components/ArticleClient';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return ARTICLES.map(a => ({ slug: a.slug }));
}

export async function generateMetadata({ params }) {
  const article = ARTICLES.find(a => a.slug === params.slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.summary,
    openGraph: {
      title: article.title,
      description: article.summary,
      type: 'article',
    },
  };
}

export default function ArticlePage({ params }) {
  const article = ARTICLES.find(a => a.slug === params.slug);
  if (!article) notFound();
  return <ArticleClient article={article} />;
}
