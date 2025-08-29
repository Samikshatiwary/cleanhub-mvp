import React from "react";
import { Link } from "react-router-dom";

export default function PublicFooter() {
  return (
    <footer className="w-full bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-800 mt-10">
      <div className="max-w-7xl mx-auto px-4 py-8 grid gap-6 md:grid-cols-3">
        
        <div>
          <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
            About CleanHub
          </h3>
          <p className="text-xs">
            CleanHub is your eco-friendly marketplace, curating sustainable products and 
            empowering greener choices for everyone.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
            Quick Links
          </h3>
          <ul className="space-y-1 text-xs">
            <li><Link to="/" className="hover:text-blue-600">Home</Link></li>
            <li><Link to="/login" className="hover:text-blue-600">Login</Link></li>
            <li><Link to="/signup" className="hover:text-blue-600">Sign Up</Link></li>
            <li><a href="#features" className="hover:text-blue-600">Features</a></li>
          </ul>
        </div>

        
        <div>
          <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
            Contact
          </h3>
          <ul className="space-y-1 text-xs">
            <li>Email: support@cleanhub.com</li>
            <li>Phone: +91 98765 43210</li>
            <li>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-blue-600">
                Twitter
              </a>{" "}
              |{" "}
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-blue-600">
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>

    
      <div className="border-t border-gray-200 dark:border-gray-800 py-3 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} CleanHub. All rights reserved.
      </div>
    </footer>
  );
}