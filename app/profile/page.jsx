'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';


export default function ProfilePage() {
  const { data: session } = useSession();
  const [image, setImage] = useState('/default-avatar.png');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [lostItems, setLostItems] = useState([]);
  const [foundItems, setFoundItems] = useState([]);

  // Load user info from backend (simulate for now)
  useEffect(() => {
    if (session?.user) {
      setEmail(session.user.email || '');
      // Fetch user info from API
      axios.get(`/api/user?email=${session.user.email}`).then(res => {
        setName(res.data.name || '');
        setPhone(res.data.phone || '');
        if (res.data.image) setImage(res.data.image);
      }).catch(() => {
        setName(session.user.name || '');
      });
      // Fetch lost/found items
      axios.get(`/api/user/items?email=${session.user.email}`).then(res => {
        setLostItems(res.data.lostItems || []);
        setFoundItems(res.data.foundItems || []);
      });
      // Load image from localStorage as fallback
      const savedImage = localStorage.getItem('profileImage');
      if (savedImage) setImage(savedImage);
    }
  }, [session]);

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
      localStorage.setItem('profileImage', reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Save profile changes
  const handleSave = async () => {
    setSaving(true);
    try {
      await axios.post('/api/user', { email, name, phone, image });
      setEditing(false);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* NAVBAR SPACE */}
      <div className="h-24" />

      <div className="max-w-7xl mx-auto px-10 grid grid-cols-3 gap-10">
        
        {/* LEFT PROFILE CARD */}
        <div className="border rounded-2xl p-8">
          <div className="flex justify-center">
            <label className="cursor-pointer">
              <img
                src={image}
                className="w-40 h-40 rounded-full object-cover border"
                alt="Profile"
              />
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageChange}
              />
            </label>
          </div>

          <div className="flex justify-between items-center mt-6">
            <h2 className="font-semibold text-lg">My Profile</h2>
            <span className="text-xs text-gray-400">{email && `Logged in as ${email}`}</span>
          </div>

          <div className="mt-6 space-y-6 text-sm">
            <div className="flex flex-col gap-2 border-b pb-2">
              <label className="font-medium">Name:</label>
              {editing ? (
                <input value={name} onChange={e => setName(e.target.value)} className="border rounded px-2 py-1" />
              ) : (
                <span>{name}</span>
              )}
            </div>
            <div className="flex flex-col gap-2 border-b pb-2">
              <label className="font-medium">Phone:</label>
              {editing ? (
                <input value={phone} onChange={e => setPhone(e.target.value)} className="border rounded px-2 py-1" />
              ) : (
                <span>{phone || <span className="text-gray-400">(not set)</span>}</span>
              )}
            </div>
            <div className="flex flex-col gap-2 border-b pb-2">
              <label className="font-medium">Email:</label>
              <span>{email}</span>
            </div>
            <div className="flex gap-2 mt-4">
              {editing ? (
                <>
                  <button onClick={handleSave} disabled={saving} className="bg-blue-600 text-white px-4 py-1 rounded">
                    {saving ? 'Saving...' : 'Save'}
                  </button>
                  <button onClick={() => setEditing(false)} className="bg-gray-300 px-4 py-1 rounded">Cancel</button>
                </>
              ) : (
                <button onClick={() => setEditing(true)} className="bg-blue-600 text-white px-4 py-1 rounded">Edit</button>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="col-span-2 space-y-10">
          
          {/* MY LOST ITEM */}
          <div className="border rounded-2xl p-6 h-64 overflow-y-auto">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="font-semibold">My Lost item</h3>
              <span>🔍</span>
            </div>
            <div className="mt-2 space-y-2">
              {lostItems.length === 0 ? (
                <div className="text-gray-400">No lost items reported.</div>
              ) : (
                lostItems.map(item => (
                  <div key={item._id} className="border rounded p-2 flex gap-4 items-center">
                    <img src={item.imageUrl || '/watch.png'} alt="item" className="w-12 h-12 object-contain rounded" />
                    <div>
                      <div className="font-medium">{item.title}</div>
                      <div className="text-xs text-gray-500">{item.category}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* MY FOUND ITEM */}
          <div className="border rounded-2xl p-6 h-64 overflow-y-auto">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="font-semibold">My Found item</h3>
              <span>🔍</span>
            </div>
            <div className="mt-2 space-y-2">
              {foundItems.length === 0 ? (
                <div className="text-gray-400">No found items requested.</div>
              ) : (
                foundItems.map(item => (
                  <div key={item._id} className="border rounded p-2 flex gap-4 items-center">
                    <img src={item.imageUrl || '/watch.png'} alt="item" className="w-12 h-12 object-contain rounded" />
                    <div>
                      <div className="font-medium">{item.title}</div>
                      <div className="text-xs text-gray-500">{item.category}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
