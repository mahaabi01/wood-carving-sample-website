"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, X, Search } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  tags: string[];
  date: string;
  status: "Published" | "Draft";
}

const demoPosts: BlogPost[] = [
  {
    id: "1",
    title: "The Ancient History of Wood Carving",
    slug: "history-of-wood-carving",
    tags: ["History", "Culture"],
    date: "2025-08-01",
    status: "Published",
  },
  {
    id: "2",
    title: "Essential Tools Used in Wood Carving",
    slug: "tools-used-in-wood-carving",
    tags: ["Tools", "Techniques"],
    date: "2025-08-05",
    status: "Published",
  },
  {
    id: "3",
    title: "Care and Maintenance of Wooden Art",
    slug: "care-and-maintenance-of-wooden-art",
    tags: ["Care", "Tips"],
    date: "2025-08-10",
    status: "Published",
  },
  {
    id: "4",
    title: "Best Types of Wood for Carving",
    slug: "types-of-wood-for-carving",
    tags: ["Materials", "Guide"],
    date: "2025-08-15",
    status: "Draft",
  },
  {
    id: "5",
    title: "Wood Carving in Cultural Tourism",
    slug: "wood-carving-in-cultural-tourism",
    tags: ["Tourism", "Culture"],
    date: "2025-08-20",
    status: "Published",
  },
  {
    id: "6",
    title: "Starting a Wood Carving Business",
    slug: "starting-a-wood-carving-business",
    tags: ["Business", "Guide"],
    date: "2025-08-25",
    status: "Draft",
  },
];

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>(demoPosts);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: "",
    slug: "",
    tags: "",
    content: "",
  });

  const filtered = posts.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase())),
  );

  const handleEdit = (post: BlogPost) => {
    setEditId(post.id);
    setForm({
      title: post.title,
      slug: post.slug,
      tags: post.tags.join(", "),
      content: "",
    });
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this blog post?")) {
      setPosts(posts.filter((p) => p.id !== id));
    }
  };

  const handleSave = () => {
    const tags = form.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    if (editId) {
      setPosts(
        posts.map((p) =>
          p.id === editId
            ? { ...p, title: form.title, slug: form.slug, tags }
            : p,
        ),
      );
    } else {
      setPosts([
        ...posts,
        {
          id: String(Date.now()),
          title: form.title,
          slug: form.slug || form.title.toLowerCase().replace(/\s+/g, "-"),
          tags,
          date: new Date().toISOString().split("T")[0],
          status: "Draft",
        },
      ]);
    }
    setShowForm(false);
    setEditId(null);
    setForm({ title: "", slug: "", tags: "", content: "" });
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
            placeholder="Search posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:border-temple-500 focus:ring-2 focus:ring-temple-500/20 outline-none text-sm"
          />
        </div>
        <button
          onClick={() => {
            setShowForm(true);
            setEditId(null);
            setForm({ title: "", slug: "", tags: "", content: "" });
          }}
          className="flex items-center gap-2 px-4 py-2.5 bg-temple-500 text-white rounded-lg hover:bg-temple-600 transition-colors text-sm font-medium"
        >
          <Plus size={18} /> New Post
        </button>
      </div>

      {/* Posts Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-3">
                  Title
                </th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-3">
                  Tags
                </th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-3">
                  Date
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
              {filtered.map((post) => (
                <tr
                  key={post.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-gray-900">
                      {post.title}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">/{post.slug}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-1 flex-wrap">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {post.date}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-xs font-medium px-2.5 py-1 rounded-full ${post.status === "Published" ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"}`}
                    >
                      {post.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEdit(post)}
                        className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-400 text-sm">
            No posts found.
          </div>
        )}
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                {editId ? "Edit Post" : "New Blog Post"}
              </h3>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-temple-500 outline-none text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Slug
                </label>
                <input
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-temple-500 outline-none text-sm"
                  placeholder="auto-generated-from-title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tags (comma separated)
                </label>
                <input
                  value={form.tags}
                  onChange={(e) => setForm({ ...form, tags: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-temple-500 outline-none text-sm"
                  placeholder="History, Culture"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Content
                </label>
                <textarea
                  value={form.content}
                  onChange={(e) =>
                    setForm({ ...form, content: e.target.value })
                  }
                  rows={6}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-temple-500 outline-none text-sm resize-none"
                  placeholder="Write your blog post content..."
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowForm(false)}
                className="flex-1 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex-1 py-2.5 bg-temple-500 text-white rounded-lg hover:bg-temple-600 transition-colors text-sm font-medium"
              >
                {editId ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
