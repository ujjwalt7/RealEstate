"use client"
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function SettingsPage() {
  // Placeholder state for each section
  const [profile, setProfile] = useState({ name: '', email: '', avatar: '' });
  const [site, setSite] = useState({ siteName: '', contactEmail: '', address: '', logo: '' });
  const [notifications, setNotifications] = useState({ email: true, sms: false });
  const [theme, setTheme] = useState('light');
  const [security, setSecurity] = useState({ twoFA: false, password: '' });
  const [features, setFeatures] = useState({ analytics: true, newPropertyTypes: true });

  // Placeholder handlers
  const handleProfileSave = () => alert('Profile saved!');
  const handleSiteSave = () => alert('Site settings saved!');
  const handleNotificationsSave = () => alert('Notification preferences saved!');
  const handleThemeToggle = () => setTheme(theme === 'light' ? 'dark' : 'light');
  const handleSecuritySave = () => alert('Security settings saved!');
  const handleFeaturesSave = () => alert('Feature toggles saved!');
  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This cannot be undone.')) {
      alert('Account deleted!');
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-12">
      <h1 className="text-2xl font-bold mb-4">Admin Settings</h1>
      {/* Profile */}
      <div className="bg-white rounded-xl shadow p-6 space-y-4">
        <h2 className="text-lg font-semibold mb-2">Profile</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input className="border rounded px-3 py-2 w-full" value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} placeholder="Name" />
          <input className="border rounded px-3 py-2 w-full" value={profile.email} onChange={e => setProfile({ ...profile, email: e.target.value })} placeholder="Email" />
        </div>
        {/* Avatar upload placeholder */}
        <div className="flex items-center gap-4 mt-2">
          <img src={profile.avatar || '/assets/img/mascot.svg'} alt="Avatar" className="w-12 h-12 rounded-full object-cover border" />
          <Button variant="outline" size="sm">Change Avatar</Button>
        </div>
        <Button className="mt-4" onClick={handleProfileSave}>Save Profile</Button>
      </div>
      {/* Site Settings */}
      <div className="bg-white rounded-xl shadow p-6 space-y-4">
        <h2 className="text-lg font-semibold mb-2">Site Settings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input className="border rounded px-3 py-2 w-full" value={site.siteName} onChange={e => setSite({ ...site, siteName: e.target.value })} placeholder="Site Name" />
          <input className="border rounded px-3 py-2 w-full" value={site.contactEmail} onChange={e => setSite({ ...site, contactEmail: e.target.value })} placeholder="Contact Email" />
          <input className="border rounded px-3 py-2 w-full md:col-span-2" value={site.address} onChange={e => setSite({ ...site, address: e.target.value })} placeholder="Address" />
        </div>
        {/* Logo upload placeholder */}
        <div className="flex items-center gap-4 mt-2">
          <img src={site.logo || '/assets/img/logo.svg'} alt="Logo" className="w-16 h-16 rounded object-cover border" />
          <Button variant="outline" size="sm">Change Logo</Button>
        </div>
        <Button className="mt-4" onClick={handleSiteSave}>Save Site Settings</Button>
      </div>
      {/* Notification Preferences */}
      <div className="bg-white rounded-xl shadow p-6 space-y-4">
        <h2 className="text-lg font-semibold mb-2">Notification Preferences</h2>
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={notifications.email} onChange={e => setNotifications({ ...notifications, email: e.target.checked })} />
            Email Notifications
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={notifications.sms} onChange={e => setNotifications({ ...notifications, sms: e.target.checked })} />
            SMS Notifications
          </label>
        </div>
        <Button className="mt-4" onClick={handleNotificationsSave}>Save Preferences</Button>
      </div>
      {/* Theme */}
      <div className="bg-white rounded-xl shadow p-6 space-y-4">
        <h2 className="text-lg font-semibold mb-2">Theme</h2>
        <div className="flex items-center gap-4">
          <span>Current: <b className="capitalize">{theme}</b></span>
          <Button variant="outline" onClick={handleThemeToggle}>Toggle Theme</Button>
        </div>
      </div>
      {/* Security */}
      <div className="bg-white rounded-xl shadow p-6 space-y-4">
        <h2 className="text-lg font-semibold mb-2">Security</h2>
        <div className="flex flex-col gap-2 md:flex-row md:gap-4">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={security.twoFA} onChange={e => setSecurity({ ...security, twoFA: e.target.checked })} />
            Enable Two-Factor Authentication (2FA)
          </label>
          <input className="border rounded px-3 py-2 w-full md:w-64" type="password" value={security.password} onChange={e => setSecurity({ ...security, password: e.target.value })} placeholder="New Password" />
        </div>
        <Button className="mt-4" onClick={handleSecuritySave}>Save Security Settings</Button>
      </div>
      {/* Feature Toggles */}
      <div className="bg-white rounded-xl shadow p-6 space-y-4">
        <h2 className="text-lg font-semibold mb-2">Feature Toggles</h2>
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={features.analytics} onChange={e => setFeatures({ ...features, analytics: e.target.checked })} />
            Enable Analytics
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={features.newPropertyTypes} onChange={e => setFeatures({ ...features, newPropertyTypes: e.target.checked })} />
            Enable New Property Types
          </label>
        </div>
        <Button className="mt-4" onClick={handleFeaturesSave}>Save Feature Toggles</Button>
      </div>
      {/* Danger Zone */}
      <div className="bg-white rounded-xl shadow p-6 space-y-4 border border-red-200">
        <h2 className="text-lg font-semibold mb-2 text-red-600">Danger Zone</h2>
        <p className="text-red-500">Delete your account and all associated data. This action cannot be undone.</p>
        <Button variant="destructive" onClick={handleDeleteAccount}>Delete Account</Button>
      </div>
    </div>
  );
} 