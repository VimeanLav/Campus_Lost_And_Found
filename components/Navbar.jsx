"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between px-12 py-6 ">

      {/* Logo */}
      <img
        src="https://static.wixstatic.com/media/20f66a_9e92da8295b14b12b29e40bddf3cddab~mv2.png"
        className="w-32"
      />

      {/* Menu */}
      <ul className="ml-150 flex gap-10 font-semibold italic relative">

        <li>
          <Link href="/home">Home</Link>
        </li>

        <li>
          <Link href="/lost_And_found">Lost/Found item</Link>
        </li>

        {/* REPORT MENU */}
        <li className="relative">
          <button onClick={() => setOpen(!open)}>
            Report
          </button>

          {open && (
            <div className="absolute top-8 left-0 bg-white shadow-md border rounded p-2 w-40">
              <Link href="/report/lost" className="block p-2 hover:bg-gray-100">
                Lost item
              </Link>

              <Link href="/report/found" className="block p-2 hover:bg-gray-100">
                Request Found item
              </Link>
            </div>
          )}
        </li>

        <li>
          <Link href="/home#about">About</Link>
        </li>

      </ul>

      {/* Icons */}
      <div className="flex gap-4">
          <Link href="/login">👤</Link>
          <Link href="/search">🔍</Link>
      </div>

    </nav>
  );
}
