import { Suspense } from 'react';
import PortfolioEditClient from './PortfolioEditClient';

export default function PortfolioEditPage({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={<div className="p-8 flex justify-center items-center h-64"><div className="admin-spinner"></div></div>}>
      <PortfolioEditClient portfolioId={params.id} />
    </Suspense>
  );
} 