import CategoryDetailPage from '../category/[slug]/page';

export default function BusinessPage() {
  return <CategoryDetailPage params={{ slug: 'business' }} />;
}
