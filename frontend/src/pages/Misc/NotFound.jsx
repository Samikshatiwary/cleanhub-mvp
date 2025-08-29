import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] grid place-items-center">
      <div className="max-w-lg text-center space-y-3">
        <h1 className="text-4xl font-bold">404</h1>
        <p className="text-gray-600 dark:text-gray-400">We couldn't find that page.</p>
        <Link to="/" className="inline-block px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">
          Go Home
        </Link>
      </div>
    </div>
  );
}