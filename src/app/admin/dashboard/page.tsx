"use client";

import Link from "next/link";
import StatCard from "../components/StatCard";
import {
  Package,
  ShoppingCart,
  Users,
  DollarSign,
  Eye,
  FileText,
  ArrowRight,
  Plus,
} from "lucide-react";

const stats = [
  {
    label: "Total Products",
    value: 24,
    icon: Package,
    trend: "+3 this month",
    trendUp: true,
  },
  {
    label: "Total Orders",
    value: 156,
    icon: ShoppingCart,
    trend: "+12 this week",
    trendUp: true,
  },
  {
    label: "Revenue (NPR)",
    value: "₨ 8,45,000",
    icon: DollarSign,
    trend: "+18%",
    trendUp: true,
  },
  { label: "Team Members", value: 8, icon: Users },
  {
    label: "Site Visitors",
    value: "2.4K",
    icon: Eye,
    trend: "+5% vs last month",
    trendUp: true,
  },
  { label: "Blog Posts", value: 12, icon: FileText },
];

const recentOrders = [
  {
    id: "ORD-001",
    customer: "Rajesh Kumar",
    product: "Carved Main Door",
    amount: "₨ 85,000",
    status: "Processing",
  },
  {
    id: "ORD-002",
    customer: "Maya Sharma",
    product: "Temple Window Frame",
    amount: "₨ 45,000",
    status: "Shipped",
  },
  {
    id: "ORD-003",
    customer: "John Smith",
    product: "Decorative Panel Set",
    amount: "₨ 32,000",
    status: "Delivered",
  },
  {
    id: "ORD-004",
    customer: "Anita Paudel",
    product: "Custom Tudal Set",
    amount: "₨ 1,20,000",
    status: "Pending",
  },
  {
    id: "ORD-005",
    customer: "David Chen",
    product: "Carved Chair Pair",
    amount: "₨ 56,000",
    status: "Processing",
  },
];

const statusColors: Record<string, string> = {
  Pending: "bg-yellow-50 text-yellow-700",
  Processing: "bg-blue-50 text-blue-700",
  Shipped: "bg-purple-50 text-purple-700",
  Delivered: "bg-green-50 text-green-700",
};

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-6 lg:p-8 text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-full opacity-10 text-[200px] leading-none font-bold select-none pointer-events-none">
          ॐ
        </div>
        <h2 className="text-xl lg:text-2xl font-bold">Welcome back, Admin</h2>
        <p className="text-gray-300 text-sm mt-1 max-w-lg">
          Manage your wood carving products, orders, team members, and blog
          posts from this dashboard.
        </p>
        <div className="flex gap-3 mt-5">
          <Link
            href="/admin/products?action=new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm font-medium transition-colors"
          >
            <Plus size={16} />
            Add Product
          </Link>
          <Link
            href="/admin/orders"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-medium transition-colors backdrop-blur-sm"
          >
            View Orders
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-gray-900">
              Recent Orders
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Latest customer orders
            </p>
          </div>
          <Link
            href="/admin/orders"
            className="text-xs font-medium text-amber-600 hover:text-amber-700 inline-flex items-center gap-1"
          >
            View all <ArrowRight size={12} />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">
                  Order ID
                </th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">
                  Customer
                </th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">
                  Product
                </th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">
                  Amount
                </th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentOrders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {order.customer}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {order.product}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {order.amount}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColors[order.status]}`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Add Product",
            description: "List a new wood carving",
            href: "/admin/products?action=new",
            icon: Package,
            color:
              "bg-gradient-to-br from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700",
          },
          {
            label: "Write Blog Post",
            description: "Share your craft stories",
            href: "/admin/blog?action=new",
            icon: FileText,
            color:
              "bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700",
          },
          {
            label: "View Orders",
            description: "Check pending orders",
            href: "/admin/orders",
            icon: ShoppingCart,
            color:
              "bg-gradient-to-br from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700",
          },
          {
            label: "Manage Team",
            description: "Update artisan profiles",
            href: "/admin/team",
            icon: Users,
            color:
              "bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700",
          },
        ].map((action) => (
          <Link
            key={action.label}
            href={action.href}
            className={`${action.color} text-white rounded-xl p-5 transition-all shadow-sm hover:shadow-md group`}
          >
            <action.icon
              size={22}
              className="mb-3 opacity-80 group-hover:opacity-100 transition-opacity"
            />
            <p className="font-semibold text-sm">{action.label}</p>
            <p className="text-xs text-white/70 mt-0.5">{action.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
