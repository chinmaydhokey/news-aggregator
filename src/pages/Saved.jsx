import React, { useEffect, useState } from "react";
import { getSavedArticles } from "../utils/localStorage";
import NewsCard from "../components/NewsCard";

function Saved() {
  const [savedArticles, setSavedArticles] = useState([]);

  useEffect(() => {
    setSavedArticles(getSavedArticles());
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-4">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Saved Articles</h1>
          <p className="text-gray-600">
            {savedArticles.length > 0 
              ? `${savedArticles.length} saved article${savedArticles.length !== 1 ? 's' : ''}`
              : 'No saved articles yet'
            }
          </p>
        </div>

        {/* Content Section */}
        {savedArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {savedArticles.map((article, index) => (
              <NewsCard key={index} article={article} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <svg
                className="mx-auto h-12 w-12 text-gray-400 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>
              <p className="text-gray-500 text-lg mb-2">No saved articles yet</p>
              <p className="text-gray-400">
                Start exploring news and save articles you want to read later!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Saved;