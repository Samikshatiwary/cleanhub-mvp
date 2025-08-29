import React from "react";
import { useRouteError, Link } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError?.() || {};
  return (
    <div className="min-h-[60vh] grid place-items-center">
      <div className="max-w-lg text-center space-y-3">
        <h1 className="text-3xl font-bold">Something went wrong</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {error?.statusText || error?.message || "Unexpected error occurred."}
        </p>
        <Link to="/" className="inline-block px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">
          Go Home
        </Link>
      </div>
    </div>
  );
}