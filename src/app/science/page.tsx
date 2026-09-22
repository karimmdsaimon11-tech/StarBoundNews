import CategoryDetailPage from '../category/[slug]/page';

export default function SciencePage() {
  return <CategoryDetailPage params={{ slug: 'science' }} />;
}
