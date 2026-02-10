'use client';

import Image from "next/image";
import { useEffect, useState } from "react";

export default function ReportFound() {
  const [item, setItem] = useState(null);
  const [requested, setRequested] = useState(false);

  // Load selected item
  useEffect(() => {
    const storedItem = JSON.parse(localStorage.getItem("selectedItem"));
    if (storedItem) {
      setItem(storedItem);
    }
  }, []);

  // Handle request
  const handleRequest = (e) => {
    e.preventDefault();

    alert("✅ Request has been sent successfully!");

    // Remove item so it can't be requested again
    localStorage.removeItem("selectedItem");

    setRequested(true);
  };

  // Hide page if already requested
  if (!item || requested) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500 text-lg">
          This item has already been requested.
        </p>
      </div>
    );
  }

  // Split description
  const parts = item.description?.split(" - ") || [];
  const itemName = parts[0] || "";
  const rest = parts[1] || "";
  const dateMatch = rest.match(/\((.*?)\)/);
  const date = dateMatch ? dateMatch[1] : "";
  const details = rest.replace(/\(.*?\)/, "").trim();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="bg-white border rounded-xl shadow-sm w-full max-w-5xl p-10">
        
        <h1 className="text-3xl font-bold text-center mb-10">
          Request Found Item
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          
          {/* IMAGE */}
          <div className="flex justify-center">
            <Image
              src={item.image}
              alt="Found Item"
              width={320}
              height={320}
              className="object-contain"
            />
          </div>

          {/* FORM */}
          <form className="space-y-5" onSubmit={handleRequest}>
            
            <div>
              <label className="block mb-1 font-medium">Item Name</label>
              <input
                type="text"
                value={itemName}
                readOnly
                className="w-full border rounded-md p-3 bg-gray-100"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Lost-Date</label>
              <input
                type="date"
                value={date}
                readOnly
                className="w-full border rounded-md p-3 bg-gray-100"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Details</label>
              <textarea
                rows="3"
                value={details}
                readOnly
                className="w-full border rounded-md p-3 bg-gray-100"
              />
            </div>

            <button
              type="submit"
              className="w-40 bg-black text-white py-3 rounded-md hover:opacity-90 transition"
            >
              Request
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}
