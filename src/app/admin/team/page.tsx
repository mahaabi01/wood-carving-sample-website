"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import ImageUpload from "@/components/admin/ImageUpload";
import { Plus, Edit2, Trash2, X } from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  experience: string;
  imageUrl: string;
  bio: string | null;
}

export default function AdminTeamPage() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    role: "",
    experience: "",
    bio: "",
    imageUrl: "",
  });

  const fetchTeam = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/team");
      if (res.ok) {
        setTeam(await res.json());
      }
    } catch {
      console.error("Failed to fetch team");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTeam();
  }, [fetchTeam]);

  const handleEdit = (member: TeamMember) => {
    setEditId(member.id);
    setForm({
      name: member.name,
      role: member.role,
      experience: member.experience,
      bio: member.bio || "",
      imageUrl: member.imageUrl,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Remove this team member?")) return;
    try {
      const res = await fetch(`/api/team/${id}`, { method: "DELETE" });
      if (res.ok) {
        setTeam(team.filter((m) => m.id !== id));
      } else {
        alert("Failed to delete team member");
      }
    } catch {
      alert("Failed to delete team member");
    }
  };

  const handleSave = async () => {
    const payload = {
      name: form.name,
      role: form.role,
      experience: form.experience,
      bio: form.bio,
      imageUrl: form.imageUrl,
    };

    try {
      const res = await fetch(editId ? `/api/team/${editId}` : "/api/team", {
        method: editId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        await fetchTeam();
        setShowForm(false);
        setEditId(null);
        setForm({ name: "", role: "", experience: "", bio: "", imageUrl: "" });
      } else {
        const data = await res.json().catch(() => ({}));
        alert(data.message || "Failed to save team member");
      }
    } catch {
      alert("Failed to save team member");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{team.length} team members</p>
        <button
          onClick={() => {
            setShowForm(true);
            setEditId(null);
            setForm({
              name: "",
              role: "",
              experience: "",
              bio: "",
              imageUrl: "",
            });
          }}
          className="flex items-center gap-2 px-4 py-2.5 bg-temple-500 text-white rounded-lg hover:bg-temple-600 transition-colors text-sm font-medium"
        >
          <Plus size={18} /> Add Member
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {team.map((member) => (
          <div
            key={member.id}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="relative aspect-square">
              <Image
                src={member.imageUrl}
                alt={member.name}
                fill
                className="object-cover"
                sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900">{member.name}</h3>
              <p className="text-sm text-temple-500">{member.role}</p>
              <p className="text-xs text-gray-400 mt-1">
                {member.experience}
              </p>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => handleEdit(member)}
                  className="flex-1 py-1.5 text-xs border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-1"
                >
                  <Edit2 size={12} /> Edit
                </button>
                <button
                  onClick={() => handleDelete(member.id)}
                  className="py-1.5 px-3 text-xs border border-red-100 text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {!loading && team.length === 0 && (
        <div className="text-center py-12 text-gray-400 text-sm">
          No team members yet.
        </div>
      )}

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                {editId ? "Edit Member" : "Add Member"}
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
                  Full Name
                </label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-temple-500 outline-none text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <input
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-temple-500 outline-none text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Experience
                </label>
                <input
                  value={form.experience}
                  onChange={(e) =>
                    setForm({ ...form, experience: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-temple-500 outline-none text-sm"
                  placeholder="e.g. 20+ years"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bio
                </label>
                <textarea
                  value={form.bio}
                  onChange={(e) => setForm({ ...form, bio: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-temple-500 outline-none text-sm resize-none"
                />
              </div>
              <ImageUpload
                label="Image"
                value={form.imageUrl}
                onChange={(url) => setForm({ ...form, imageUrl: url })}
              />
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
                {editId ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
