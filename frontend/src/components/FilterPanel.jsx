import React from "react";

function MultiSelect({ label, options = [], value = [], onChange }) {
  return (
    <div>
      <div className="text-xs text-gray-600 mb-1">{label}</div>
      <div className="flex gap-2 flex-wrap">
        {options.map((option) => {
          const isActive = value.includes(option);
          return (
            <button
              key={option}
              onClick={() => {
                if (isActive) onChange(value.filter((item) => item !== option));
                else onChange([...value, option]);
              }}
              className={`text-sm px-2 py-1 border rounded ${isActive ? "bg-yellow-100 border-yellow-400" : "bg-white"}`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function FilterPanel({
  filters,
  setFilters,
  allOptions = { regions: [], genders: [], categories: [], tags: [], paymentMethods: [] },
}) {
  return (
    <div className="bg-white p-3 rounded shadow-sm">
      <p className="text-xs text-gray-500 mb-2">
        You can select multiple options in each filter and combine filters together.
      </p>
      <div className="grid grid-cols-3 gap-4">
        <MultiSelect
          label="Customer Region"
          options={allOptions.regions}
          value={filters.customerRegion || []}
          onChange={(value) => setFilters({ ...filters, customerRegion: value, page: 1 })}
        />

        <MultiSelect
          label="Gender"
          options={allOptions.genders}
          value={filters.gender || []}
          onChange={(value) => setFilters({ ...filters, gender: value, page: 1 })}
        />

        <div>
          <div className="text-xs text-gray-600 mb-1">Age Range</div>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min"
              value={filters.ageMin ?? ""}
              onChange={(event) =>
                setFilters({
                  ...filters,
                  ageMin: event.target.value ? Number(event.target.value) : null,
                  page: 1,
                })
              }
              className="w-24 border rounded px-2 py-1 text-sm"
            />
            <input
              type="number"
              placeholder="Max"
              value={filters.ageMax ?? ""}
              onChange={(event) =>
                setFilters({
                  ...filters,
                  ageMax: event.target.value ? Number(event.target.value) : null,
                  page: 1,
                })
              }
              className="w-24 border rounded px-2 py-1 text-sm"
            />
          </div>
        </div>

        <MultiSelect
          label="Product Category"
          options={allOptions.categories}
          value={filters.productCategory || []}
          onChange={(value) => setFilters({ ...filters, productCategory: value, page: 1 })}
        />

        <MultiSelect
          label="Tags"
          options={allOptions.tags}
          value={filters.tags || []}
          onChange={(value) => setFilters({ ...filters, tags: value, page: 1 })}
        />

        <div>
          <div className="text-xs text-gray-600 mb-1">Payment Method</div>
          <div className="flex gap-2 flex-wrap">
            {allOptions.paymentMethods.map((method) => {
              const isActive = (filters.paymentMethod || []).includes(method);
              return (
                <button
                  key={method}
                  onClick={() =>
                    setFilters({
                      ...filters,
                      paymentMethod: isActive
                        ? (filters.paymentMethod || []).filter((item) => item !== method)
                        : [...(filters.paymentMethod || []), method],
                      page: 1,
                    })
                  }
                  className={`text-sm px-2 py-1 border rounded ${isActive ? "bg-yellow-100 border-yellow-400" : "bg-white"}`}
                >
                  {method}
                </button>
              );
            })}
          </div>
        </div>

        <div className="col-span-3">
          <div className="flex gap-2 items-center">
            <div className="text-xs text-gray-600 mr-2">Date Range:</div>
            <input
              type="date"
              value={filters.dateFrom || ""}
              onChange={(event) => setFilters({ ...filters, dateFrom: event.target.value || null, page: 1 })}
              className="border rounded px-2 py-1 text-sm"
            />
            <span className="text-sm">to</span>
            <input
              type="date"
              value={filters.dateTo || ""}
              onChange={(event) => setFilters({ ...filters, dateTo: event.target.value || null, page: 1 })}
              className="border rounded px-2 py-1 text-sm"
            />

            <button
              onClick={() =>
                setFilters({
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
                })
              }
              className="ml-auto bg-red-50 text-red-600 px-3 py-1 rounded text-sm border"
            >
              Clear All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
