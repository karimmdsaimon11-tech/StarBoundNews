import CategoryDetailPage from '../category/[slug]/page';

export default function JobsPage() {
  return <CategoryDetailPage params={{ slug: 'jobs' }} />;
}
