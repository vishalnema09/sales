// src/components/SummaryCards.jsx
import React from "react";

export default function SummaryCards({ totals = {} }) {
  return (
    <div className="grid grid-cols-3 gap-4 my-4">
      <div className="bg-white p-4 rounded shadow-sm">
        <div className="text-sm text-gray-500">Total units sold</div>
        <div className="text-lg font-semibold">{totals.units ?? "—"}</div>
      </div>
      <div className="bg-white p-4 rounded shadow-sm">
        <div className="text-sm text-gray-500">Total Amount</div>
        <div className="text-lg font-semibold">₹{totals.amount ?? "—"}</div>
      </div>
      <div className="bg-white p-4 rounded shadow-sm">
        <div className="text-sm text-gray-500">Total Discount</div>
        <div className="text-lg font-semibold">₹{totals.discount ?? "—"}</div>
      </div>
    </div>
  );
}
