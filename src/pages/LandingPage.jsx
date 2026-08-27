import React from 'react';

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-brand-light-bg text-brand-light-text p-6">
      <h1 className="text-4xl font-heading font-bold mb-4">StackFolio</h1>
      <p className="text-lg text-brand-light-muted mb-8 max-w-md text-center">
        Turn your static resume into an interactive, shareable portfolio in minutes.
      </p>
      <a href="/dashboard" className="px-6 py-3 bg-brand-light-primary text-white rounded-lg font-medium hover:bg-opacity-90 transition-all">
        Go to Dashboard
      </a>
    </div>
  );
}
