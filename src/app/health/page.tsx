import CategoryDetailPage from '../category/[slug]/page';

export default function HealthPage() {
  return <CategoryDetailPage params={{ slug: 'health' }} />;
}
