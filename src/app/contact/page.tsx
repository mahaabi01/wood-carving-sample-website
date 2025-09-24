// contact.tsx
"use client"
import React, { useState } from "react";

const Contact: React.FC = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name] : value
    })
    // setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setStatus("Sending...");

  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      setStatus("Message sent! Thank you.");
      setForm({ name: "", email: "", message: "" });
    } else {
      setStatus(`Error: ${data.message}`);
    }
  } catch (error) {
    setStatus("Failed to send message. Please try again later.");
  }
};

    // setTimeout(() => {
    //   setStatus("Message sent! Thank you.");
    //   setForm({ name: "", email: "", message: "" });
    // }, 1500);

  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block font-semibold mb-1">
            Name
          </label>
          <input
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="email" className="block font-semibold mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="message" className="block font-semibold mb-1">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={form.message}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onSubmit={handleSubmit}
          type="submit"
          className="bg-blue-600 text-white font-semibold px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Send Message
        </button>

        {status && <p className="mt-4 text-green-600">{status}</p>}
      </form>

      <section className="mt-12 border-t pt-6 text-gray-700">
        <h2 className="text-xl font-semibold mb-2">Contact Information</h2>
        <p>Address: Om Wood Carving, Bungamati, Lalitpur, Nepal</p>
        <p>Phone: +977 1 2345678</p>
        <p>Email: info@omwoodcarving.com</p>
      </section>
    </main>
  );
};


export default Contact;
