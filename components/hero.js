'use client';

import { signIn } from 'next-auth/react';

export default function Hero() {
  return (
    <div className="min-h-[60vh]">
      <section className="max-w-screen-xl px-4 pb-4 mx-auto mt-24 sm:px-8">
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold text-gray-800 md:text-5xl">
            Optimize your development with
            <span className="text-indigo-600">
              {' '}
              Git <span className="text-indigo-500">AI</span>
            </span>
          </h1>
          <p className="max-w-xl mx-auto leading-relaxed text-gray-500">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            euismod, diam sit amet dictum ultricies, nunc nisl ultricies nunc,
            quis aliquam nisl nunc quis nisl. Sed euismod, diam sit amet dictum
            ultricies, nunc nisl ultricies nunc, quis aliquam nisl nunc quis
            nisl.
          </p>
        </div>
        <div className="items-center justify-center mt-12 space-y-3 sm:space-x-6 sm:space-y-0 sm:flex">
          <button
            onClick={() => signIn()}
            className="px-10 py-3.5 w-full bg-indigo-600 text-white text-center rounded-md shadow-md block sm:w-auto"
          >
            Get started
          </button>
        </div>
      </section>
    </div>
  );
}
