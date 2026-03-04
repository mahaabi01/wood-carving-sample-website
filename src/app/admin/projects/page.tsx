"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  Award,
  X,
  Search,
  FolderKanban,
  MapPin,
  Calendar,
  Clock,
} from "lucide-react";

interface ProjectImage {
  id: string;
  url: string;
  caption: string | null;
  sortOrder: number;
}

interface Project {
  id: string;
  slug: string;
  title: string;
  client: string | null;
  location: string | null;
  description: string;
  challenge: string | null;
  solution: string | null;
  result: string | null;
  coverImage: string;
  images: ProjectImage[];
  category: string | null;
  materials: string | null;
  duration: string | null;
  year: string | null;
  featured: boolean;
  published: boolean;
  createdAt: string;
}

const emptyForm = {
  title: "",
  client: "",
  location: "",
  description: "",
  challenge: "",
  solution: "",
  result: "",
  coverImage: "",
  category: "",
  materials: "",
  duration: "",
  year: "",
  featured: false,
  published: false,
};

const projectCategories = [
  "Temple Restoration",
  "Residential",
  "Commercial",
  "Heritage Conservation",
  "Custom Commission",
  "Export",
];

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/projects?all=true");
    const data = await res.json();
    setProjects(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (p: Project) => {
    setEditing(p);
    setForm({
      title: p.title,
      client: p.client || "",
      location: p.location || "",
      description: p.description,
      challenge: p.challenge || "",
      solution: p.solution || "",
      result: p.result || "",
      coverImage: p.coverImage,
      category: p.category || "",
      materials: p.materials || "",
      duration: p.duration || "",
      year: p.year || "",
      featured: p.featured,
      published: p.published,
    });
    setModalOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const url = editing ? `/api/projects/${editing.id}` : "/api/projects";
      const method = editing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setModalOpen(false);
        fetchProjects();
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (
      !confirm(
        "Delete this project? All associated images will also be removed.",
      )
    )
      return;
    await fetch(`/api/projects/${id}`, { method: "DELETE" });
    fetchProjects();
  };

  const togglePublish = async (p: Project) => {
    await fetch(`/api/projects/${p.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published: !p.published }),
    });
    fetchProjects();
  };

  const toggleFeatured = async (p: Project) => {
    await fetch(`/api/projects/${p.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ featured: !p.featured }),
    });
    fetchProjects();
  };

  const filtered = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      (p.client && p.client.toLowerCase().includes(search.toLowerCase())) ||
      (p.category && p.category.toLowerCase().includes(search.toLowerCase())),
  );

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Project Showcases
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage completed projects and case studies ({projects.length} total)
          </p>
        </div>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-amber-600 text-white text-sm font-medium rounded-lg hover:bg-amber-700 transition-colors shadow-sm"
        >
          <Plus size={16} /> Add Project
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
          placeholder="Search projects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none"
        />
      </div>

      {/* Project Cards */}
      {loading ? (
        <div className="text-center py-12 text-gray-400">Loading...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
          <FolderKanban size={40} className="mx-auto text-gray-300 mb-3" />
          <p className="text-gray-500">No projects found</p>
          <button
            onClick={openCreate}
            className="mt-3 text-sm text-amber-600 hover:underline"
          >
            Add your first project showcase
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-5">
          {filtered.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Cover Image */}
              <div className="relative h-44 bg-gray-100">
                <img
                  src={p.coverImage}
                  alt={p.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 flex gap-2">
                  <span
                    className={`text-xs px-2 py-1 rounded-full backdrop-blur-md ${
                      p.published
                        ? "bg-green-500/90 text-white"
                        : "bg-gray-800/70 text-gray-200"
                    }`}
                  >
                    {p.published ? "Published" : "Draft"}
                  </span>
                  {p.featured && (
                    <span className="text-xs px-2 py-1 rounded-full bg-amber-500/90 text-white backdrop-blur-md">
                      Featured
                    </span>
                  )}
                </div>
                {p.category && (
                  <span className="absolute bottom-3 left-3 text-xs px-2.5 py-1 rounded-full bg-white/90 text-gray-700 backdrop-blur-md font-medium">
                    {p.category}
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="p-5">
                <h3 className="font-bold text-gray-900 text-lg mb-1">
                  {p.title}
                </h3>
                {p.client && (
                  <p className="text-sm text-gray-500 mb-2">
                    Client: {p.client}
                  </p>
                )}

                <div className="flex flex-wrap gap-3 text-xs text-gray-400 mb-3">
                  {p.location && (
                    <span className="flex items-center gap-1">
                      <MapPin size={12} /> {p.location}
                    </span>
                  )}
                  {p.year && (
                    <span className="flex items-center gap-1">
                      <Calendar size={12} /> {p.year}
                    </span>
                  )}
                  {p.duration && (
                    <span className="flex items-center gap-1">
                      <Clock size={12} /> {p.duration}
                    </span>
                  )}
                </div>

                <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                  {p.description}
                </p>

                {/* Actions */}
                <div className="flex items-center gap-2 border-t border-gray-100 pt-3">
                  <button
                    onClick={() => togglePublish(p)}
                    className={`p-2 rounded-lg text-sm transition-colors ${
                      p.published
                        ? "text-green-600 hover:bg-green-50"
                        : "text-gray-400 hover:bg-gray-50"
                    }`}
                    title={p.published ? "Unpublish" : "Publish"}
                  >
                    {p.published ? <Eye size={16} /> : <EyeOff size={16} />}
                  </button>
                  <button
                    onClick={() => toggleFeatured(p)}
                    className={`p-2 rounded-lg text-sm transition-colors ${
                      p.featured
                        ? "text-amber-600 hover:bg-amber-50"
                        : "text-gray-400 hover:bg-gray-50"
                    }`}
                    title={p.featured ? "Remove featured" : "Feature"}
                  >
                    <Award size={16} />
                  </button>
                  <div className="flex-1" />
                  <button
                    onClick={() => openEdit(p)}
                    className="p-2 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                    title="Edit"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
              <h2 className="text-lg font-bold text-gray-900">
                {editing ? "Edit Project" : "Add Project"}
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
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-amber-500 outline-none"
                    placeholder="Pashupatinath Temple Door"
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Client
                  </label>
                  <input
                    type="text"
                    value={form.client}
                    onChange={(e) =>
                      setForm({ ...form, client: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-amber-500 outline-none"
                    placeholder="Temple Trust"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
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
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Category
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) =>
                      setForm({ ...form, category: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-amber-500 outline-none"
                  >
                    <option value="">Select category</option>
                    {projectCategories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Materials
                  </label>
                  <input
                    type="text"
                    value={form.materials}
                    onChange={(e) =>
                      setForm({ ...form, materials: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-amber-500 outline-none"
                    placeholder="Sal Wood, Teak"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={form.duration}
                    onChange={(e) =>
                      setForm({ ...form, duration: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-amber-500 outline-none"
                    placeholder="3 months"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Year
                  </label>
                  <input
                    type="text"
                    value={form.year}
                    onChange={(e) => setForm({ ...form, year: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-amber-500 outline-none"
                    placeholder="2025"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Cover Image URL *
                </label>
                <input
                  type="text"
                  value={form.coverImage}
                  onChange={(e) =>
                    setForm({ ...form, coverImage: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-amber-500 outline-none"
                  placeholder="/images/project-cover.jpg"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Description *
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-amber-500 outline-none resize-none"
                  placeholder="Overview of the project..."
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Challenge / Requirement
                </label>
                <textarea
                  value={form.challenge}
                  onChange={(e) =>
                    setForm({ ...form, challenge: e.target.value })
                  }
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-amber-500 outline-none resize-none"
                  placeholder="What was the challenge or requirement?"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Our Solution
                </label>
                <textarea
                  value={form.solution}
                  onChange={(e) =>
                    setForm({ ...form, solution: e.target.value })
                  }
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-amber-500 outline-none resize-none"
                  placeholder="How did we approach and solve it?"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Result / Outcome
                </label>
                <textarea
                  value={form.result}
                  onChange={(e) => setForm({ ...form, result: e.target.value })}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-amber-500 outline-none resize-none"
                  placeholder="What was the final outcome?"
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
                disabled={
                  saving || !form.title || !form.description || !form.coverImage
                }
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
