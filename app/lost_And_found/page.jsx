'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function LostFoundPage() {
  const router = useRouter();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("lostItems")) || [];
    setItems(storedItems);
  }, []);

  const handleClick = (item) => {
    localStorage.setItem("selectedItem", JSON.stringify(item));
    router.push("/report/found"); // page to request found item
  };

  const handleReset = () => {
    localStorage.removeItem("lostItems");
    setItems([]);
  };

  return (
    <div id="lost_And_found" className="px-10 py-12">
      <div className="border rounded-xl p-10">
        <button
          onClick={handleReset}
          className="mb-6 bg-red-500 text-white px-4 py-2 rounded"
        >
          Reset Items
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {items.map((item) => (
            <div
              key={item.id}
              className="text-center cursor-pointer"
              onClick={() => handleClick(item)}
            >
              <img
                src={item.image || "/watch.png"}
                alt="item"
                className="w-full h-[200px] object-contain"
              />

              <p className="mt-6 text-gray-700 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}
