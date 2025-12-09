import React from "react";

function TableHeader() {
  return (
    <thead className="bg-gray-50 text-gray-600 text-sm">
      <tr>
        <th className="p-3 text-left">Transaction ID</th>
        <th className="p-3 text-left">Date</th>
        <th className="p-3 text-left">Customer ID</th>
        <th className="p-3 text-left">Customer name</th>
        <th className="p-3 text-left">Phone Number</th>
        <th className="p-3 text-left">Gender</th>
        <th className="p-3 text-left">Age</th>
        <th className="p-3 text-left">Product Category</th>
        <th className="p-3 text-left">Quantity</th>
        <th className="p-3 text-left">Total Amount</th>
        <th className="p-3 text-left">Customer region</th>
        <th className="p-3 text-left">Product ID</th>
        <th className="p-3 text-left">Employee name</th>
      </tr>
    </thead>
  );
}

export default function TransactionsTable({ items = [] }) {
  if (!items.length) {
    return <div className="bg-white p-6 rounded text-center">No transactions found.</div>;
  }

  return (
    <div className="bg-white rounded shadow-sm overflow-auto">
      <table className="min-w-full">
        <TableHeader />
        <tbody>
          {items.map((transaction) => (
            <tr key={transaction._id || `${transaction.transactionId}-${Math.random()}`} className="border-t text-sm text-gray-700">
              <td className="p-3">{transaction.transactionId}</td>
              <td className="p-3">{transaction.date ? new Date(transaction.date).toLocaleDateString() : "-"}</td>
              <td className="p-3">{transaction.customerId}</td>
              <td className="p-3">{transaction.customerName}</td>
              <td className="p-3">{transaction.phoneNumber}</td>
              <td className="p-3">{transaction.gender}</td>
              <td className="p-3">{transaction.age}</td>
              <td className="p-3">{transaction.productCategory}</td>
              <td className="p-3">{transaction.quantity}</td>
              <td className="p-3">₹{transaction.totalAmount?.toLocaleString()}</td>
              <td className="p-3">{transaction.customerRegion}</td>
              <td className="p-3">{transaction.productId}</td>
              <td className="p-3">{transaction.employeeName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
