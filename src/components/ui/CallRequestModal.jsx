import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function CallRequestModal({ open, onClose }) {
  const [form, setForm] = useState({ name: '', phone: '', email: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  if (!open) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    if (!form.name.trim() || !form.phone.trim()) {
      setError('Name and phone are required.');
      setLoading(false);
      return;
    }
    // Basic phone validation
    if (!/^\+?[0-9]{7,15}$/.test(form.phone.replace(/\s/g, ''))) {
      setError('Please enter a valid phone number.');
      setLoading(false);
      return;
    }
    // Basic email validation (if provided)
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) {
      setError('Please enter a valid email address.');
      setLoading(false);
      return;
    }
    const { error } = await supabase.from('call_requests').insert([
      { name: form.name, phone: form.phone, email: form.email }
    ]);
    if (error) {
      setError('Failed to submit. Please try again.');
    } else {
      setSuccess(true);
      setForm({ name: '', phone: '', email: '' });
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-2xl p-8 w-full max-w-md z-10">
        <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl" onClick={onClose}>&times;</button>
        <h2 className="text-2xl font-bold mb-4 text-center">Request a Call</h2>
        {success ? (
          <div className="text-green-600 text-center font-semibold py-4">Thank you! We will contact you soon.</div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block font-medium mb-1">Name<span className="text-red-500">*</span></label>
              <input name="name" value={form.name} onChange={handleChange} className="border rounded px-3 py-2 w-full" disabled={loading} required />
            </div>
            <div>
              <label className="block font-medium mb-1">Phone<span className="text-red-500">*</span></label>
              <input name="phone" value={form.phone} onChange={handleChange} className="border rounded px-3 py-2 w-full" disabled={loading} required />
            </div>
            <div>
              <label className="block font-medium mb-1">Email <span className="text-gray-400">(optional)</span></label>
              <input name="email" value={form.email} onChange={handleChange} className="border rounded px-3 py-2 w-full" disabled={loading} type="email" />
            </div>
            {error && <div className="text-red-500 text-sm text-center">{error}</div>}
            <button type="submit" className="bg-accentBlue text-white rounded-full py-2 font-semibold hover:bg-accentBlue/90 transition" disabled={loading}>
              {loading ? 'Submitting...' : 'Request Call'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
} 