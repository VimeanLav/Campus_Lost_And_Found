'use client';

import { useState, useEffect } from 'react';

export default function ProfilePage() {
  const [image, setImage] = useState('/default-avatar.png');

  // LOAD image from localStorage when page loads
  useEffect(() => {
    const savedImage = localStorage.getItem('profileImage');
    if (savedImage) {
      setImage(savedImage);
    }
  }, []);

  // HANDLE image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageURL = URL.createObjectURL(file);
    setImage(imageURL);
    localStorage.setItem('profileImage', imageURL);
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
            <span className="text-xs text-gray-400">
              Last online 2 hours ago
            </span>
          </div>

          <div className="mt-6 space-y-6 text-sm">
            <div className="flex justify-between border-b pb-2">
              <span>Name: Lav Vimean</span>
              <span>Phone: 098269152</span>
            </div>

            <div className="border-b pb-2">
              Email: lav.vimean25@kit.edu.kh
            </div>

            <div className="border-b pb-2" />
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="col-span-2 space-y-10">
          
          {/* MY LOST ITEM */}
          <div className="border rounded-2xl p-6 h-64">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="font-semibold">My Lost item</h3>
              <span>🔍</span>
            </div>
          </div>

          {/* MY FOUND ITEM */}
          <div className="border rounded-2xl p-6 h-64">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="font-semibold">My Found item</h3>
              <span>🔍</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
