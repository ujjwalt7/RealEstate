"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import PropertyForm from "@/components/Admin/PropertyForm";

const PAGE_SIZE = 10;
const STATUS_OPTIONS = ["active", "inactive", "deleted"];

export default function PropertyTable() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formInitial, setFormInitial] = useState(null);
  const [viewProperty, setViewProperty] = useState(null);
  const router = useRouter();

  const fetchProperties = async () => {
    setLoading(true);
    setError(null);
    let query = supabase.from("properties").select("id, title, type, status, price, location, created_at", { count: "exact" });
    if (search) {
      query = query.ilike("title", `%${search}%`);
    }
    if (status) {
      query = query.eq("status", status);
    }
    query = query.order("created_at", { ascending: false })
      .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);
    const { data, error, count } = await query;
    if (error) setError(error.message);
    else {
      setProperties(data);
      setTotal(count || 0);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProperties();
    // eslint-disable-next-line
  }, [page, search, status]);

  const handleAdd = () => {
    setFormInitial(null);
    setShowForm(true);
  };

  const handleFormSubmit = async (values) => {
    // Insert property
    const { error } = await supabase.from("properties").insert([
      { ...values }
    ]);
    if (!error) {
      setShowForm(false);
      fetchProperties();
    } else {
      alert(error.message);
    }
  };

  // Deactivate/Activate
  const handleToggleStatus = async (property) => {
    const newStatus = property.status === "active" ? "inactive" : "active";
    if (!window.confirm(`Are you sure you want to set this property as ${newStatus}?`)) return;
    const { error } = await supabase.from("properties").update({ status: newStatus }).eq("id", property.id);
    if (!error) fetchProperties();
    else alert(error.message);
  };

  // Delete
  const handleDelete = async (property) => {
    if (!window.confirm("Are you sure you want to delete this property? This cannot be undone.")) return;
    const { error } = await supabase.from("properties").delete().eq("id", property.id);
    if (!error) fetchProperties();
    else alert(error.message);
  };

  // View Modal
  const PropertyViewModal = ({ property, onClose }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 relative">
        <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-700" onClick={onClose}>×</button>
        <h2 className="text-xl font-bold mb-4">{property.title}</h2>
        <div className="mb-2 text-sm text-gray-500">Type: {property.type} | Status: {property.status}</div>
        <div className="mb-2">Price: ₹{property.price?.amount?.toLocaleString() || property.price || '-'}</div>
        <div className="mb-2">Location: {property.location?.address || property.location || '-'}</div>
        <div className="mb-2">Created: {new Date(property.created_at).toLocaleDateString()}</div>
        {/* Add more details as needed */}
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded shadow p-4">
      {viewProperty && <PropertyViewModal property={viewProperty} onClose={() => setViewProperty(null)} />}
      <PropertyForm
        open={showForm}
        onClose={() => setShowForm(false)}
        onSubmit={handleFormSubmit}
        initialData={formInitial}
      />
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
        <div className="flex gap-2 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search by title..."
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
            className="border rounded px-3 py-2 w-full md:w-64"
          />
          <select
            value={status}
            onChange={e => { setStatus(e.target.value); setPage(1); }}
            className="border rounded px-3 py-2"
          >
            <option value="">All Status</option>
            {STATUS_OPTIONS.map(opt => (
              <option key={opt} value={opt}>{opt.charAt(0).toUpperCase() + opt.slice(1)}</option>
            ))}
          </select>
        </div>
        <Link href="/admin/properties/add">
          <Button size="sm" className="mt-2 md:mt-0">Add Property</Button>
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Type</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Price</th>
              <th className="px-4 py-2 text-left">Location</th>
              <th className="px-4 py-2 text-left">Created At</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={7} className="text-center py-8">Loading...</td></tr>
            ) : error ? (
              <tr><td colSpan={7} className="text-center text-red-500 py-8">{error}</td></tr>
            ) : properties.length === 0 ? (
              <tr><td colSpan={7} className="text-center py-8">No properties found.</td></tr>
            ) : (
              properties.map(property => (
                <tr key={property.id} className="border-b">
                  <td className="px-4 py-2">{property.title}</td>
                  <td className="px-4 py-2 capitalize">{property.type}</td>
                  <td className="px-4 py-2 capitalize">{property.status}</td>
                  <td className="px-4 py-2">₹{property.price?.amount?.toLocaleString() || property.price || '-'}</td>
                  <td className="px-4 py-2">{
                    property.location
                      ? (typeof property.location === 'object' && property.location !== null
                        ? [
                            property.location.locality,
                            property.location.city,
                            property.location.state,
                            property.location.pincode
                          ].filter(Boolean).join(", ")
                        : property.location)
                      : '-'
                  }</td>
                  <td className="px-4 py-2">{new Date(property.created_at).toLocaleDateString()}</td>
                  <td className="px-4 py-2 space-x-2">
                    <Link href={`/property/${property.id}`}><Button size="sm" variant="outline">View</Button></Link>
                    <Link href={`/admin/properties/edit/${property.id}`}><Button size="sm" variant="outline">Edit</Button></Link>
                    <Button size="sm" variant="outline" onClick={() => handleToggleStatus(property)}>{property.status === "active" ? "Deactivate" : "Activate"}</Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(property)}>Delete</Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <Button size="sm" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>Previous</Button>
        <span className="text-sm">Page {page} of {Math.max(1, Math.ceil(total / PAGE_SIZE))}</span>
        <Button size="sm" onClick={() => setPage(p => p + 1)} disabled={page * PAGE_SIZE >= total}>Next</Button>
      </div>
    </div>
  );
} 