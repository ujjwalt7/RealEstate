"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";

const PAGE_SIZE = 10;

export default function UserTable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      let query = supabase.from("users").select("id, email, full_name, role, status, created_at", { count: "exact" });
      if (search) {
        query = query.ilike("email", `%${search}%`);
      }
      query = query.order("created_at", { ascending: false })
        .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);
      const { data, error, count } = await query;
      if (error) setError(error.message);
      else {
        setUsers(data);
        setTotal(count || 0);
      }
      setLoading(false);
    };
    fetchUsers();
  }, [page, search]);

  return (
    <div className="bg-white rounded shadow p-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
        <input
          type="text"
          placeholder="Search by email..."
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(1); }}
          className="border rounded px-3 py-2 w-full md:w-64"
        />
        <div className="text-sm text-gray-500">Total: {total}</div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Role</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Created At</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} className="text-center py-8">Loading...</td></tr>
            ) : error ? (
              <tr><td colSpan={6} className="text-center text-red-500 py-8">{error}</td></tr>
            ) : users.length === 0 ? (
              <tr><td colSpan={6} className="text-center py-8">No users found.</td></tr>
            ) : (
              users.map(user => (
                <tr key={user.id} className="border-b">
                  <td className="px-4 py-2">{user.full_name || "-"}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2 capitalize">{user.role}</td>
                  <td className="px-4 py-2 capitalize">{user.status}</td>
                  <td className="px-4 py-2">{new Date(user.created_at).toLocaleDateString()}</td>
                  <td className="px-4 py-2 space-x-2">
                    <Button size="sm" variant="outline" disabled>Edit</Button>
                    <Button size="sm" variant="outline" disabled>{user.status === "active" ? "Deactivate" : "Activate"}</Button>
                    <Button size="sm" variant="destructive" disabled>Delete</Button>
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