'use client';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
export default function Navbar() {
  const [state, setState] = useState(false);
  const { data: session } = useSession();
  return (
    <header>
      <nav className="items-center max-w-screen-xl px-4 pt-5 mx-auto sm:px-8 md:flex md:space-x-6">
        <div className="flex justify-between">
          <Link href="/">
            <img
              src="/logo.png"
              className="mix-blend-multiply"
              width={120}
              height={50}
              alt="Git AI logo"
            />
          </Link>
          <button
            className="text-gray-500 outline-none md:hidden"
            onClick={() => setState(!state)}
          >
            {state ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
        <ul
          className={`flex-1 justify-between mt-12 md:flex md:mt-0 ${
            state ? '' : 'hidden'
          }`}
        >
          <li className="order-2 pb-5 md:pb-0">
            {session ? (
              <div className="flex items-center">
                <img
                  src={session.user.image}
                  className="w-10 h-10 rounded-full"
                />
                <span className="ml-2 text-gray-800">{session.user.name}</span>
              </div>
            ) : null}
          </li>
          <li className="order-2 pb-5 md:pb-0">
            {session ? (
              <div className="flex items-center">
                <button
                  onClick={() => signOut()}
                  className="block w-full px-3 py-1 text-center rounded-md shadow-md sm:w-auto"
                >
                  Sign out
                </button>
              </div>
            ) : null}
          </li>
        </ul>
      </nav>
    </header>
  );
}
