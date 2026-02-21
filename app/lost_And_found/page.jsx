"use client";

import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LostFoundPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch("/api/lost-and-found");
        if (!res.ok) throw new Error("Failed to fetch items");
        const data = await res.json();
        setItems(data);
      } catch (err) {
        setItems([]);
      }
    };
    fetchItems();
  }, []);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  // No click handler needed, use Link below

  const handleItemClick = useCallback((id) => {
    router.push(`/report/found/${id}`);
  }, [router]);

  return (
    <div id="lost_And_found" className="px-10 py-12">
      <div className="border rounded-xl p-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {items.map((item) => (
            <div
              key={item._id}
              className="block text-center border rounded-lg p-4 shadow hover:bg-gray-50 transition cursor-pointer"
              onClick={() => handleItemClick(item._id)}
            >
              <img
                src={item.imageUrl || "/watch.png"}
                alt="item"
                className="w-full h-[200px] object-contain mx-auto"
              />
              <b>{item.title}</b>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
