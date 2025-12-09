import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import FilterPanel from "../components/FilterPanel";
import SummaryCards from "../components/SummaryCards";
import TransactionsTable from "../components/TransactionsTable";
import Pagination from "../components/Pagination";
import useTransactions from "../hooks/useTransactions";
import api from "../services/api";

export default function Sales() {
  const [filters, setFilters] = useState({
    q: "",
    customerRegion: [],
    gender: [],
    ageMin: null,
    ageMax: null,
    productCategory: [],
    tags: [],
    paymentMethod: [],
    dateFrom: null,
    dateTo: null,
    sortBy: "date",
    sortDir: "desc",
    page: 1,
    limit: 10,
  });

  const [options, setOptions] = useState({
    regions: [],
    genders: [],
    categories: [],
    tags: [],
    paymentMethods: [],
  });

  useEffect(() => {
    async function fetchOptions() {
      try {
        const response = await api.get("/transactions/options");
        setOptions({
          regions: response.data.regions || [],
          genders: response.data.genders || [],
          categories: response.data.categories || [],
          tags: response.data.tags || [],
          paymentMethods: response.data.paymentMethods || [],
        });
      } catch (error) {
        setOptions({
          regions: ["South", "East", "West", "North"],
          genders: ["Male", "Female", "Other"],
          categories: ["Clothing", "Beauty", "Electronics"],
          tags: ["organic", "skincare", "sale"],
          paymentMethods: ["UPI", "Cash", "Card"],
        });
      }
    }

    fetchOptions();
  }, []);

  const { data, meta, loading, error } = useTransactions(filters);

  const totals = {
    units: data.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0),
    amount: data.reduce((sum, item) => sum + (Number(item.totalAmount) || 0), 0),
    discount: data.reduce((sum, item) => sum + (Number(item.discountPercentage) || 0), 0),
  };

  const handleSearch = (query) => {
    setFilters((prev) => ({ ...prev, q: query, page: 1 }));
  };

  const handlePageChange = (newPage) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  return (
    <div>
      <div className="mb-4">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <SearchBar initial={filters.q} onSearch={handleSearch} />
          </div>
          <div className="flex items-center gap-2">
            <select
              value={`${filters.sortBy}|${filters.sortDir}`}
              onChange={(event) => {
                const [sortBy, sortDir] = event.target.value.split("|");
                setFilters((prev) => ({ ...prev, sortBy, sortDir, page: 1 }));
              }}
              className="border rounded px-2 py-1 text-sm"
            >
              <option value="date|desc">Date (Newest First)</option>
              <option value="date|asc">Date (Oldest First)</option>
              <option value="quantity|desc">Quantity (High-Low)</option>
              <option value="quantity|asc">Quantity (Low-High)</option>
              <option value="customerName|asc">Customer Name (A–Z)</option>
              <option value="customerName|desc">Customer Name (Z–A)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <FilterPanel filters={filters} setFilters={setFilters} allOptions={options} />
      </div>

      <SummaryCards totals={totals} />

      <div className="mb-4">
        {loading ? (
          <div className="bg-white p-6 rounded text-center">Loading...</div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 p-6 rounded text-red-700">
            <p className="font-semibold">Error loading transactions</p>
            <p className="text-sm mt-1">{error.message || "Please check your connection and try again."}</p>
          </div>
        ) : (
          <TransactionsTable items={data} />
        )}
      </div>

      <Pagination page={meta.page} pages={meta.pages} onPageChange={handlePageChange} />
    </div>
  );
}
