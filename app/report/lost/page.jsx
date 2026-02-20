"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ReportLost() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const fileRef = useRef(null);

  const [image, setImage] = useState("/watch-placeholder.png");
  const [itemName, setItemName] = useState("");
  const [date, setDate] = useState("");
  const [details, setDetails] = useState("");
  const [category, setCategory] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

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

  // Convert image to Base64 so it never disappears
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/lost-and-found", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: itemName,
          description: details,
          category,
          phone,
          email,
          location,
          date,
          imageUrl: image,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to report lost item");
      router.push("/lost_And_found");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="bg-white border rounded-xl shadow-sm w-full max-w-5xl p-10">
        <h1 className="text-3xl font-bold text-center mb-10">
          Report Lost Item
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* LEFT IMAGE */}
          <div className="flex justify-center">
            <Image
              src={image}
              alt="item"
              width={300}
              height={300}
              className="cursor-pointer object-contain"
              onClick={() => fileRef.current.click()}
            />
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              hidden
              onChange={handleImage}
            />
          </div>

          {/* RIGHT FORM */}
          <form className="space-y-5" onSubmit={handleSubmit}>

            <div>
              <label className="block mb-1 font-medium">Category</label>
              <select
                className="w-full border rounded-md p-3"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">Select Category</option>
                <option value="Electronics">Electronics</option>
                <option value="Clothing">Clothing</option>
                <option value="Books">Books</option>
                <option value="Accessories">Accessories</option>
                <option value="ID/Document">ID/Document</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium">Item Name</label>
              <input
                type="text"
                className="w-full border rounded-md p-3"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Lost-Date</label>
              <input
                type="date"
                className="w-full border rounded-md p-3"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Phone Number</label>
              <input
                type="tel"
                className="w-full border rounded-md p-3"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input
                type="email"
                className="w-full border rounded-md p-3"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Location</label>
              <input
                type="text"
                className="w-full border rounded-md p-3"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Details</label>
              <textarea
                rows="3"
                className="w-full border rounded-md p-3"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-40 bg-black text-white py-3 rounded-md hover:opacity-90 transition"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
