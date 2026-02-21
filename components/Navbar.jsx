"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();

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
          <Link href="/">Home</Link>
        </li>

        <li>
          {session ? (
            <Link href="/lost_And_found">Lost/Found item</Link>
          ) : (
            <span
              className="text-gray-400 cursor-not-allowed"
              title="Please login first"
            >
              Lost/Found item
            </span>
          )}
        </li>

        {/* REPORT MENU */}
        <li className="relative">
          {session ? (
            <>
              <button onClick={() => setOpen(!open)}>Report</button>

              {open && (
                <div className="absolute top-8 left-0 bg-white shadow-md border rounded p-2 w-40 z-10">
                  <Link
                    href="/report/lost"
                    className="block p-2 hover:bg-gray-100"
                  >
                    Lost item
                  </Link>

                  <Link
                    href="/report/found"
                    className="block p-2 hover:bg-gray-100"
                  >
                    Request Found item
                  </Link>
                </div>
              )}
            </>
          ) : (
            <span
              className="text-gray-400 cursor-not-allowed"
              title="Please login first"
            >
              Report
            </span>
          )}
        </li>

        <li>
          <Link href="/#about">About</Link>
        </li>
      </ul>

      {/* Icons */}
      <div className="flex gap-4 items-center">
        {session ? (
          <>
            <Link href="/profile" title={session.user?.email}>
              👤
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="text-sm bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
            >
              Logout
            </button>
          </>
        ) : (
          <Link href="/login">👤</Link>
        )}
        <Link href="/search">🔍</Link>
      </div>
    </nav>
  );
}
