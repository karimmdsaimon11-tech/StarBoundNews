import CategoryDetailPage from '../category/[slug]/page';

export default function SportsPage() {
  return <CategoryDetailPage params={{ slug: 'sports' }} />;
}
