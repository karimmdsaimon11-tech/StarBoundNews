import React from 'react';
import CategoryDetailPage from '@/app/category/[slug]/page';

export function createCategoryRoute(slug: string) {
  return function CategoryRoute() {
    return <CategoryDetailPage params={{ slug }} />;
  };
}
