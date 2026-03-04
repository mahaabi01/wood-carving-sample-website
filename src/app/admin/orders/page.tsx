"use client";

import { useState } from "react";
import { Search, Eye, ChevronDown } from "lucide-react";

interface Order {
  id: string;
  customer: string;
  email: string;
  product: string;
  amount: string;
  date: string;
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  paymentStatus: "Paid" | "Unpaid" | "Refunded";
}

const demoOrders: Order[] = [
  {
    id: "ORD-001",
    customer: "Rajesh Kumar",
    email: "rajesh@email.com",
    product: "Carved Main Door",
    amount: "₨ 85,000",
    date: "2025-07-10",
    status: "Processing",
    paymentStatus: "Paid",
  },
  {
    id: "ORD-002",
    customer: "Maya Sharma",
    email: "maya@email.com",
    product: "Temple Window Frame",
    amount: "₨ 45,000",
    date: "2025-07-08",
    status: "Shipped",
    paymentStatus: "Paid",
  },
  {
    id: "ORD-003",
    customer: "John Smith",
    email: "john@email.com",
    product: "Decorative Panel Set",
    amount: "₨ 32,000",
    date: "2025-07-05",
    status: "Delivered",
    paymentStatus: "Paid",
  },
  {
    id: "ORD-004",
    customer: "Anita Paudel",
    email: "anita@email.com",
    product: "Custom Tudal Set",
    amount: "₨ 1,20,000",
    date: "2025-07-12",
    status: "Pending",
    paymentStatus: "Unpaid",
  },
  {
    id: "ORD-005",
    customer: "David Chen",
    email: "david@email.com",
    product: "Carved Chair Pair",
    amount: "₨ 56,000",
    date: "2025-07-11",
    status: "Processing",
    paymentStatus: "Paid",
  },
  {
    id: "ORD-006",
    customer: "Sunita Thapa",
    email: "sunita@email.com",
    product: "Entrance Archway",
    amount: "₨ 1,80,000",
    date: "2025-07-01",
    status: "Delivered",
    paymentStatus: "Paid",
  },
  {
    id: "ORD-007",
    customer: "Michael Brown",
    email: "michael@email.com",
    product: "Wall Sculpture",
    amount: "₨ 22,000",
    date: "2025-06-28",
    status: "Cancelled",
    paymentStatus: "Refunded",
  },
];

const statusColors: Record<string, string> = {
  Pending: "bg-yellow-50 text-yellow-700",
  Processing: "bg-blue-50 text-blue-700",
  Shipped: "bg-purple-50 text-purple-700",
  Delivered: "bg-green-50 text-green-700",
  Cancelled: "bg-red-50 text-red-600",
};

const paymentColors: Record<string, string> = {
  Paid: "text-green-600",
  Unpaid: "text-yellow-600",
  Refunded: "text-red-500",
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>(demoOrders);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("All");

  const filtered = orders.filter((o) => {
    const matchSearch =
      o.customer.toLowerCase().includes(search.toLowerCase()) ||
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.product.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "All" || o.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const updateStatus = (id: string, status: Order["status"]) => {
    setOrders(orders.map((o) => (o.id === id ? { ...o, status } : o)));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search orders..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:border-temple-500 focus:ring-2 focus:ring-temple-500/20 outline-none text-sm"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {[
            "All",
            "Pending",
            "Processing",
            "Shipped",
            "Delivered",
            "Cancelled",
          ].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                filterStatus === status
                  ? "bg-temple-500 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-3">
                  Order
                </th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-3">
                  Customer
                </th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-3">
                  Product
                </th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-3">
                  Amount
                </th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-3">
                  Payment
                </th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-3">
                  Status
                </th>
                <th className="text-right text-xs font-medium text-gray-500 uppercase px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {order.id}
                      </p>
                      <p className="text-xs text-gray-400">{order.date}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm text-gray-900">{order.customer}</p>
                      <p className="text-xs text-gray-400">{order.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {order.product}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {order.amount}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-xs font-medium ${paymentColors[order.paymentStatus]}`}
                    >
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColors[order.status]}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                        title="View details"
                      >
                        <Eye size={16} />
                      </button>
                      <div className="relative group">
                        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                          <ChevronDown size={16} />
                        </button>
                        <div className="absolute right-0 top-full mt-1 w-36 bg-white rounded-lg shadow-lg border border-gray-200 py-1 hidden group-hover:block z-10">
                          {[
                            "Pending",
                            "Processing",
                            "Shipped",
                            "Delivered",
                            "Cancelled",
                          ].map((s) => (
                            <button
                              key={s}
                              onClick={() =>
                                updateStatus(order.id, s as Order["status"])
                              }
                              className="block w-full text-left px-4 py-2 text-xs text-gray-600 hover:bg-gray-50"
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-400 text-sm">
            No orders found.
          </div>
        )}
      </div>
    </div>
  );
}
