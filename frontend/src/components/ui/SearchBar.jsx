import React, { useState } from "react";

const SearchBar = ({ onSearch, placeholder = "Search...", initial = "" }) => {
  const [q, setQ] = useState(initial);
  const submit = (e) => {
    e.preventDefault();
    onSearch(q.trim());
  };
  return (
    <form onSubmit={submit} className="w-full max-w-md">
      <div className="relative">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-full border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 px-4 py-2 pl-10 outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button type="submit" className="absolute left-3 top-2.5 text-gray-500">🔍</button>
      </div>
    </form>
  );
};

export default SearchBar;