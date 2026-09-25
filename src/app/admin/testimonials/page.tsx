"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import ImageUpload from "@/components/admin/ImageUpload";
import {
  Plus,
  Pencil,
  Trash2,
  Star,
  Eye,
  EyeOff,
  Award,
  X,
  Search,
} from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  location: string | null;
  role: string | null;
  avatarUrl: string | null;
  rating: number;
  review: string;
  projectType: string | null;
  imageUrl: string | null;
  featured: boolean;
  published: boolean;
  createdAt: string;
}

const emptyForm = {
  name: "",
  location: "",
  role: "",
  avatarUrl: "",
  rating: 5,
  review: "",
  projectType: "",
  imageUrl: "",
  featured: false,
  published: false,
};

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");

  const fetchTestimonials = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/testimonials?all=true");
    const data = await res.json();
    setTestimonials(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (t: Testimonial) => {
    setEditing(t);
    setForm({
      name: t.name,
      location: t.location || "",
      role: t.role || "",
      avatarUrl: t.avatarUrl || "",
      rating: t.rating,
      review: t.review,
      projectType: t.projectType || "",
      imageUrl: t.imageUrl || "",
      featured: t.featured,
      published: t.published,
    });
    setModalOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const url = editing
        ? `/api/testimonials/${editing.id}`
        : "/api/testimonials";
      const method = editing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setModalOpen(false);
        fetchTestimonials();
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this testimonial?")) return;
    await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
    fetchTestimonials();
  };

  const togglePublish = async (t: Testimonial) => {
    await fetch(`/api/testimonials/${t.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...t, published: !t.published }),
    });
    fetchTestimonials();
  };

  const toggleFeatured = async (t: Testimonial) => {
    await fetch(`/api/testimonials/${t.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...t, featured: !t.featured }),
    });
    fetchTestimonials();
  };

  const filtered = testimonials.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      (t.review && t.review.toLowerCase().includes(search.toLowerCase())),
  );

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Testimonials</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage customer reviews and testimonials ({testimonials.length}{" "}
            total)
          </p>
        </div>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-amber-600 text-white text-sm font-medium rounded-lg hover:bg-amber-700 transition-colors shadow-sm"
        >
          <Plus size={16} /> Add Testimonial
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6 max-w-md">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          placeholder="Search testimonials..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none"
        />
      </div>

      {/* List */}
      {loading ? (
        <div className="text-center py-12 text-gray-400">Loading...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
          <Star size={40} className="mx-auto text-gray-300 mb-3" />
          <p className="text-gray-500">No testimonials found</p>
          <button
            onClick={openCreate}
            className="mt-3 text-sm text-amber-600 hover:underline"
          >
            Add the first testimonial
          </button>
        </div>
      ) : (
        <div className="grid gap-4">
          {filtered.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-xl border border-gray-200 p-5 flex flex-col sm:flex-row gap-4 hover:shadow-md transition-shadow"
            >
              {/* Avatar / Image */}
              <div className="flex-shrink-0">
                {t.avatarUrl ? (
                  <Image
                    src={t.avatarUrl}
                    alt={t.name}
                    width={56}
                    height={56}
                    className="w-14 h-14 rounded-full object-cover border-2 border-gray-100"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-bold text-lg">
                    {t.name.charAt(0)}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h3 className="font-semibold text-gray-900">{t.name}</h3>
                  {t.role && (
                    <span className="text-xs text-gray-400">• {t.role}</span>
                  )}
                  {t.location && (
                    <span className="text-xs text-gray-400">
                      • {t.location}
                    </span>
                  )}
                </div>

                {/* Stars */}
                <div className="flex gap-0.5 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={
                        i < t.rating
                          ? "text-amber-400 fill-amber-400"
                          : "text-gray-200"
                      }
                    />
                  ))}
                  {t.projectType && (
                    <span className="ml-2 text-xs px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full">
                      {t.projectType}
                    </span>
                  )}
                </div>

                <p className="text-sm text-gray-600 line-clamp-2">
                  &ldquo;{t.review}&rdquo;
                </p>

                {/* Status badges */}
                <div className="flex flex-wrap items-center gap-2 mt-3">
                  <span
                    className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full ${
                      t.published
                        ? "bg-green-50 text-green-700"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {t.published ? <Eye size={12} /> : <EyeOff size={12} />}
                    {t.published ? "Published" : "Draft"}
                  </span>
                  {t.featured && (
                    <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-amber-50 text-amber-700">
                      <Award size={12} /> Featured
                    </span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex sm:flex-col gap-2 flex-shrink-0">
                <button
                  onClick={() => togglePublish(t)}
                  className={`p-2 rounded-lg text-sm transition-colors ${
                    t.published
                      ? "text-green-600 hover:bg-green-50"
                      : "text-gray-400 hover:bg-gray-50"
                  }`}
                  title={t.published ? "Unpublish" : "Publish"}
                >
                  {t.published ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <button
                  onClick={() => toggleFeatured(t)}
                  className={`p-2 rounded-lg text-sm transition-colors ${
                    t.featured
                      ? "text-amber-600 hover:bg-amber-50"
                      : "text-gray-400 hover:bg-gray-50"
                  }`}
                  title={t.featured ? "Remove from featured" : "Feature"}
                >
                  <Award size={16} />
                </button>
                <button
                  onClick={() => openEdit(t)}
                  className="p-2 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                  title="Edit"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => handleDelete(t.id)}
                  className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                  title="Delete"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-lg font-bold text-gray-900">
                {editing ? "Edit Testimonial" : "Add Testimonial"}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 text-gray-400 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-amber-500 outline-none"
                    placeholder="John Smith"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={form.location}
                    onChange={(e) =>
                      setForm({ ...form, location: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-amber-500 outline-none"
                    placeholder="Kathmandu, Nepal"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Role / Title
                  </label>
                  <input
                    type="text"
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-amber-500 outline-none"
                    placeholder="Interior Designer"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Project Type
                  </label>
                  <input
                    type="text"
                    value={form.projectType}
                    onChange={(e) =>
                      setForm({ ...form, projectType: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-amber-500 outline-none"
                    placeholder="Temple Door"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Rating
                </label>
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setForm({ ...form, rating: i + 1 })}
                      className="p-1"
                    >
                      <Star
                        size={20}
                        className={
                          i < form.rating
                            ? "text-amber-400 fill-amber-400"
                            : "text-gray-200"
                        }
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Review *
                </label>
                <textarea
                  value={form.review}
                  onChange={(e) => setForm({ ...form, review: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-amber-500 outline-none resize-none"
                  placeholder="What did the customer say about their experience?"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <ImageUpload
                  label="Avatar"
                  value={form.avatarUrl}
                  onChange={(url) => setForm({ ...form, avatarUrl: url })}
                />
                <ImageUpload
                  label="Project Image"
                  value={form.imageUrl}
                  onChange={(url) => setForm({ ...form, imageUrl: url })}
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.published}
                    onChange={(e) =>
                      setForm({ ...form, published: e.target.checked })
                    }
                    className="w-4 h-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500 accent-amber-600"
                  />
                  <span className="text-sm text-gray-700">Published</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.featured}
                    onChange={(e) =>
                      setForm({ ...form, featured: e.target.checked })
                    }
                    className="w-4 h-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500 accent-amber-600"
                  />
                  <span className="text-sm text-gray-700">Featured</span>
                </label>
              </div>
            </div>

            <div className="border-t border-gray-100 px-6 py-4 flex justify-end gap-3">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving || !form.name || !form.review}
                className="px-6 py-2 bg-amber-600 text-white text-sm font-medium rounded-lg hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {saving ? "Saving..." : editing ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
