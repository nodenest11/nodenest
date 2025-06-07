import React, { Suspense } from 'react';
import BlogEditClient from './BlogEditClient';

// The correct way to handle params in Next.js 15
export default function BlogEditPage({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={<div className="p-8 flex justify-center items-center h-64"><div className="admin-spinner"></div></div>}>
      <BlogEditClient postId={params.id} />
    </Suspense>
  );
} 