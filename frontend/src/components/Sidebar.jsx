// src/components/Sidebar.jsx
import React from "react";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r min-h-screen">
      <div className="p-3 flex items-center gap-3 border-b">
        <div className="w-10 h-10 bg-gray-800 rounded text-white flex items-center justify-center font-bold">T</div>
        <div>
          <div className="text-sm text-gray-500">TruEstate</div>
        </div>
      </div>

      <nav className="p-4">
        <ul className="space-y-1 text-sm text-gray-700">
          <li className="py-2 px-3 rounded hover:bg-gray-100 cursor-pointer">Dashboard</li>
          <li className="py-2 px-3 rounded hover:bg-gray-100 cursor-pointer">Nexus</li>
          <li className="py-2 px-3 rounded hover:bg-gray-100 cursor-pointer">Intake</li>
          <li className="py-2 px-3 rounded hover:bg-gray-100 cursor-pointer">Sales</li>
        </ul>
      </nav>
    </aside>
  );
}
