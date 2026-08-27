import React from 'react';
import { useParams } from 'react-router-dom';

export default function PublicPortfolioPage() {
  const { public_slug } = useParams();
  return (
    <div className="min-h-screen bg-brand-dark-bg text-brand-dark-text p-8 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-heading font-bold mb-4">Public Portfolio</h1>
      <p className="text-brand-dark-primary font-mono">Slug: {public_slug}</p>
    </div>
  );
}
