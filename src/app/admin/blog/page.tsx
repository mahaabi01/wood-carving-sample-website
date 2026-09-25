"use client";

import { useState, useEffect, useCallback } from "react";
import ImageUpload from "@/components/admin/ImageUpload";
import { Plus, Edit2, Trash2, X, Search } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  coverImage: string | null;
  tags: string[];
  published: boolean;
  createdAt: string;
}

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    coverImage: "",
    tags: "",
    published: false,
  });

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/blog?all=true");
      if (res.ok) {
        setPosts(await res.json());
      }
    } catch {
      console.error("Failed to fetch blog posts");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const filtered = posts.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase())),
  );

  const handleEdit = (post: BlogPost) => {
    setEditId(post.id);
    setForm({
      title: post.title,
      excerpt: post.excerpt || "",
      content: post.content,
      coverImage: post.coverImage || "",
      tags: post.tags.join(", "),
      published: post.published,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this blog post?")) return;
    try {
      const res = await fetch(`/api/blog/${id}`, { method: "DELETE" });
      if (res.ok) {
        setPosts(posts.filter((p) => p.id !== id));
      } else {
        alert("Failed to delete post");
      }
    } catch {
      alert("Failed to delete post");
    }
  };

  const handleSave = async () => {
    const tags = form.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const payload = {
      title: form.title,
      excerpt: form.excerpt,
      content: form.content,
      coverImage: form.coverImage,
      tags,
      published: form.published,
    };

    try {
      const res = await fetch(editId ? `/api/blog/${editId}` : "/api/blog", {
        method: editId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        await fetchPosts();
        setShowForm(false);
        setEditId(null);
        setForm({
          title: "",
          excerpt: "",
          content: "",
          coverImage: "",
          tags: "",
          published: false,
        });
      } else {
        const data = await res.json().catch(() => ({}));
        alert(data.message || "Failed to save post");
      }
    } catch {
      alert("Failed to save post");
    }
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
            setForm({
              title: "",
              excerpt: "",
              content: "",
              coverImage: "",
              tags: "",
              published: false,
            });
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
                    {new Date(post.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-xs font-medium px-2.5 py-1 rounded-full ${post.published ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"}`}
                    >
                      {post.published ? "Published" : "Draft"}
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
        {!loading && filtered.length === 0 && (
          <div className="text-center py-12 text-gray-400 text-sm">
            No posts found.
          </div>
        )}
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
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
                  Excerpt
                </label>
                <textarea
                  value={form.excerpt}
                  onChange={(e) =>
                    setForm({ ...form, excerpt: e.target.value })
                  }
                  rows={2}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-temple-500 outline-none text-sm resize-none"
                />
              </div>
              <ImageUpload
                label="Cover Image"
                value={form.coverImage}
                onChange={(url) => setForm({ ...form, coverImage: url })}
              />
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
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.published}
                  onChange={(e) =>
                    setForm({ ...form, published: e.target.checked })
                  }
                  className="w-4 h-4 rounded border-gray-300 text-temple-500 focus:ring-temple-500"
                />
                <span className="text-sm text-gray-700">
                  Publish immediately
                </span>
              </label>
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
