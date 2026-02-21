"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function LostItemDetail() {
  const params = useParams();
  const id = params.id;
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await fetch(`/api/lost-and-found/${id}`);
        if (!res.ok) throw new Error("Not found");
        setItem(await res.json());
      } catch {
        setItem(null);
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [id]);

  const handleRequest = async () => {
    console.log('handleRequest called');
    try {
      const res = await fetch(`/api/lost-and-found/${id}`, {
        method: "PATCH",
      });
      console.log('PATCH response:', res);
      if (!res.ok) {
        // Try to get error message from backend
        let errorMsg = "Failed to request item";
        try {
          const data = await res.json();
          console.log('PATCH error data:', data);
          if (data && data.error) errorMsg = data.error;
        } catch (e) {
          console.log('Error parsing error response:', e);
        }
        throw new Error(errorMsg);
      }
      console.log('Redirecting to /report/found');
      router.push("/report/found");
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <div className="text-center p-10">Loading...</div>;
  if (!item) return <div className="text-center p-10">Item not found.</div>;
  return (
    <div className="max-w-xl mx-auto p-8 border rounded-xl mt-10">
      <img
        src={item.imageUrl || "/watch.png"}
        alt="item"
        className="w-full h-[300px] object-contain mb-6"
      />
      <div className="space-y-2">
        <div><b>Category:</b> {item.category}</div>
        <div><b>Item Name:</b> {item.title}</div>
        <div><b>Lost Date:</b> {item.date ? new Date(item.date).toLocaleDateString() : ""}</div>
        <div><b>Phone Number:</b> {item.phone}</div>
        <div><b>Email:</b> {item.email}</div>
        <div><b>Location:</b> {item.location}</div>
        <div><b>Details:</b> {item.description}</div>
      </div>
      <button
        onClick={handleRequest}
        className="mt-8 w-full bg-blue-600 text-white py-3 rounded-md hover:opacity-90 transition"
      >
        Request Item
      </button>
    </div>
  );
}
