import CategoryDetailPage from '../category/[slug]/page';

export default function NationalPage() {
  return <CategoryDetailPage params={{ slug: 'national' }} />;
}
