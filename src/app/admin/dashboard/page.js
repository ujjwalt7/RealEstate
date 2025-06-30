"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const [propertyViews, setPropertyViews] = useState([]);
  const [userActivity, setUserActivity] = useState([]);
  const [topProperties, setTopProperties] = useState([]);
  const [funnel, setFunnel] = useState([]);
  const [recentEvents, setRecentEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dateRange, setDateRange] = useState({
    start: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().slice(0, 10),
    end: new Date().toISOString().slice(0, 10)
  });

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      setError(null);
      try {
        // Property Views Over Time
        const { data: viewsData } = await supabase.rpc('property_views_over_time');
        setPropertyViews((viewsData || []).filter(row => row.date >= dateRange.start && row.date <= dateRange.end));
        // User Activity Over Time
        const { data: userData } = await supabase.rpc('user_activity_over_time');
        setUserActivity((userData || []).filter(row => row.date >= dateRange.start && row.date <= dateRange.end));
        // Top Properties by Views
        const { data: topProps } = await supabase.rpc('top_properties_by_views');
        setTopProperties(topProps || []);
        // Conversion Funnel
        const { data: funnelData } = await supabase.rpc('conversion_funnel');
        setFunnel(funnelData || []);
        // Recent Events
        const { data: events } = await supabase
          .from('analytics_events')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(10);
        setRecentEvents(events || []);
      } catch (err) {
        setError("Failed to load analytics data.");
      }
      setLoading(false);
    };
    fetchAnalytics();
  }, [dateRange]);

  const handleExport = () => {
    // Combine all analytics data into one array or multiple CSVs as needed
    const csv = convertToCSV(recentEvents); // or propertyViews, etc.
    downloadCSV(csv, 'analytics_events.csv');
  };

  function convertToCSV(data) {
    if (!data.length) return '';
    const headers = Object.keys(data[0]);
    const rows = data.map(row => headers.map(h => JSON.stringify(row[h] ?? '')).join(','));
    return [headers.join(','), ...rows].join('\\n');
  }

  function downloadCSV(csv, filename) {
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 space-y-8">
      <h1 className="text-3xl font-bold mb-6">Analytics Dashboard</h1>
      <Button onClick={handleExport}>Export CSV</Button>
      {/* Date Range Filter */}
      <div className="flex gap-4 items-center mb-4">
        <label className="font-medium">Date Range:</label>
        <input
          type="date"
          value={dateRange.start}
          onChange={e => setDateRange(r => ({ ...r, start: e.target.value }))}
          className="border rounded px-2 py-1"
        />
        <span>-</span>
        <input
          type="date"
          value={dateRange.end}
          onChange={e => setDateRange(r => ({ ...r, end: e.target.value }))}
          className="border rounded px-2 py-1"
        />
      </div>
      {loading ? (
        <div className="text-center py-20 text-lg text-gray-500">Loading analytics...</div>
      ) : error ? (
        <div className="text-center py-20 text-lg text-red-500">{error}</div>
      ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Property Views Over Time */}
        <Card>
          <CardHeader>
            <CardTitle>Property Views Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={propertyViews}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="views" stroke="#facc15" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        {/* User Activity Over Time */}
        <Card>
          <CardHeader>
            <CardTitle>User Activity Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={userActivity}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="activity" fill="#38bdf8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        {/* Top Properties by Views */}
        <Card>
          <CardHeader>
            <CardTitle>Top Properties by Views</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={topProperties} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="title" type="category" width={120} />
                <Tooltip />
                <Bar dataKey="views" fill="#f472b6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        {/* Conversion Funnel */}
        <Card className="col-span-1 md:col-span-2 xl:col-span-1">
          <CardHeader>
            <CardTitle>Conversion Funnel</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={funnel}
                  dataKey="count"
                  nameKey="stage"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#facc15"
                  label
                >
                  {funnel.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={["#facc15", "#38bdf8", "#f472b6", "#a3e635"][index % 4]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        {/* Recent Events Table */}
        <Card className="col-span-1 md:col-span-2 xl:col-span-3">
          <CardHeader>
            <CardTitle>Recent Analytics Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 text-left">Event</th>
                    <th className="px-4 py-2 text-left">User</th>
                    <th className="px-4 py-2 text-left">Property</th>
                    <th className="px-4 py-2 text-left">Page</th>
                    <th className="px-4 py-2 text-left">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {recentEvents.map((event) => (
                    <tr key={event.id} className="border-b">
                      <td className="px-4 py-2">{event.event_type}</td>
                      <td className="px-4 py-2">{event.user_id || '-'}</td>
                      <td className="px-4 py-2">{event.property_id || '-'}</td>
                      <td className="px-4 py-2">{event.page || '-'}</td>
                      <td className="px-4 py-2">{new Date(event.created_at).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
      )}
    </div>
  );
} 