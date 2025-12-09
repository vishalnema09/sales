import React, { useEffect, useState } from "react";

export default function SearchBar({ initial = "", onSearch }) {
  const [query, setQuery] = useState(initial);

  useEffect(() => {
    const timer = setTimeout(() => onSearch(query), 300);
    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="flex items-center gap-3">
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        className="w-full border rounded px-3 py-2 text-sm"
        placeholder="Name, Phone no."
      />
    </div>
  );
}
