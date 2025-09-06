import * as React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-[60vh] grid place-items-center p-8">
      <div className="text-center">
        <p className="text-sm font-semibold text-sky-600">404</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Page not found
        </h1>
        <p className="mt-4 text-gray-600 dark:text-gray-300">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center rounded-xl bg-sky-600 px-4 py-2 text-white hover:bg-sky-700 transition"
        >
          Go back home
        </Link>
      </div>
    </main>
  );
}
