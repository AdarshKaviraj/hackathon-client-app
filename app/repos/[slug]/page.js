'use client';
import { code } from '@/utils/code';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Repo() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug;
  const [repo, setRepo] = useState(null);
  const [suggestion, setSuggestion] = useState(null);
  const [loading, setLoading] = useState(false);
  const [setReview, setSetReview] = useState(false);

  useEffect(() => {
    setRepo(code?.find((item) => item.slug === slug));
  }, []);

  useEffect(() => {
    async function getSuggestions() {
      let originalCode = code?.find((item) => item.slug === slug);

      try {
        setLoading(true);
        const response = await fetch(
          'http://localhost:8000/suggestion',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              code: originalCode?.code,
            }),
          },
          {
            cache: 'no-cache',
          }
        );
        const data = await response.json();

        setSuggestion(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }

    getSuggestions();
  }, []);

  const handleSendReview = async () => {
    setSetReview(false);
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:8000/review/${suggestion?.codeId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            code: suggestion?.suggestion,
          }),
        },
        {
          cache: 'no-cache',
        }
      );

      const data = await response.json();
      console.log('Review Got', data);
      setSuggestion(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleMerge = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:8000/merge/${suggestion?.codeId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            final: suggestion?.suggestion,
          }),
        },
        {
          cache: 'no-cache',
        }
      );

      const data = await response.json();
      console.log('Review Got', data);
      setSuggestion(data);
      setLoading(false);
      router.push('/');
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <section>
      <div className="max-w-screen-xl gap-12 px-4 mx-auto text-gray-600 py-28 md:px-8">
        <div className="max-w-4xl mx-auto space-y-5 text-center">
          <h2 className="mx-auto text-4xl font-extrabold text-gray-800 md:text-5xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] to-[#E114E5]">
              Repository : {slug}
            </span>
          </h2>
          <p className="max-w-2xl mx-auto">
            Sed ut perspiciatis unde omnis iste natus voluptatem accusantium
            doloremque laudantium, totam rem aperiam, eaque ipsa quae.
          </p>
          <div className="items-center justify-center space-y-3 gap-x-3 sm:flex sm:space-y-0">
            <button
              onClick={() => {
                window.confirm(
                  'Are you sure you want to merge this pull request?'
                ) && handleMerge();
              }}
              className="block px-4 py-2 font-medium text-white duration-150 bg-indigo-600 rounded-lg shadow-lg hover:bg-indigo-500 active:bg-indigo-700 hover:shadow-none"
            >
              Merge pull request
            </button>
            <button
              onClick={() => setSetReview(!setReview)}
              className="block px-4 py-2 font-medium text-gray-700 duration-150 border rounded-lg hover:text-gray-500 active:bg-gray-100"
            >
              {setReview ? 'Hide review' : 'Show review'}
            </button>
          </div>
        </div>
        <div className="flex justify-between mt-14">
          <div className="flex flex-row w-full max-w-5xl mx-auto gap-x-2">
            <div className="flex flex-col w-1/2 h-full">
              <h3 className="mb-4 text-xl font-semibold text-center text-gray-800">
                Your code
              </h3>
              <code
                className="block w-full p-4 overflow-x-auto font-mono text-sm text-gray-800 bg-gray-100 rounded-lg"
                dangerouslySetInnerHTML={{ __html: repo?.code }}
              />
            </div>
            <div className="flex flex-col w-1/2 h-full">
              <h3 className="mb-4 text-xl font-semibold text-center text-gray-800">
                Suggestion
              </h3>
              {loading ? (
                <div className="flex flex-col items-center justify-center w-full h-full bg-gray-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 animate-spin"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                    />
                  </svg>
                </div>
              ) : (
                <>
                  {setReview ? (
                    <div className="flex flex-col items-center justify-center w-full h-full bg-gray-100">
                      <textarea
                        value={suggestion?.suggestion}
                        onChange={(e) =>
                          setSuggestion({
                            ...suggestion,
                            suggestion: e.target.value,
                          })
                        }
                        className="w-full h-full px-4 py-2 text-gray-800 bg-gray-100 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                        placeholder="Write your review here..."
                      />
                      <button
                        onClick={() => {
                          window.confirm(
                            'Are you sure you want to send this for further review?'
                          ) && handleSendReview();
                        }}
                        className="px-4 py-2 mt-4 font-medium text-white duration-150 bg-indigo-600 rounded-lg shadow-lg hover:bg-indigo-500 active:bg-indigo-700 hover:shadow-none"
                      >
                        Send review
                      </button>
                    </div>
                  ) : (
                    <code
                      className="block w-full p-4 overflow-x-auto font-mono text-sm text-gray-800 bg-gray-100 rounded-lg"
                      dangerouslySetInnerHTML={{
                        __html: suggestion?.suggestion,
                      }}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
