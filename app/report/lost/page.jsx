'use client';

import Image from "next/image";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function ReportLost() {
  const router = useRouter();
  const fileRef = useRef(null);

  const [image, setImage] = useState("/watch-placeholder.png");
  const [itemName, setItemName] = useState("");
  const [date, setDate] = useState("");
  const [details, setDetails] = useState("");

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const newItem = {
      id: Date.now(),
      image,
      description: `${itemName} - ${details} (${date})`,
    };

    const existingItems = JSON.parse(localStorage.getItem("lostItems")) || [];
    localStorage.setItem("lostItems", JSON.stringify([...existingItems, newItem]));

    router.push("/lost_And_found");
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
