import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NewsCard from "../components/NewsCard";
import { getSavedArticles } from "../utils/localStorage";

const categories = [
  "general",
  "business", 
  "entertainment",
  "health",
  "science",
  "sports",
  "technology",
];

const categoryIcons = {
  general: "🌐",
  business: "💼", 
  entertainment: "🎭",
  health: "🏥",
  science: "🔬",
  sports: "⚽",
  technology: "💻"
};

function Home() {
  const [selectedCategory, setSelectedCategory] = useState("general");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savedCount, setSavedCount] = useState(0);
  const navigate = useNavigate();

  const fetchArticles = async (category) => {
  setLoading(true);
  try {
    const response = await fetch(`/news-data/${category}.json`);
    const data = await response.json();
    setArticles(data.articles || []);
  } catch (error) {
    console.error("Error loading static news data:", error);
    setArticles([]);
  } finally {
    setLoading(false);
  }
};

  // Update saved count whenever component mounts or articles change
  useEffect(() => {
    setSavedCount(getSavedArticles().length);
  }, [articles]);

  useEffect(() => {
    fetchArticles(selectedCategory);
  }, [selectedCategory]);

  const handleViewSaved = () => {
    navigate('/saved');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-32 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-32 w-96 h-96 bg-gradient-to-tr from-cyan-400/10 to-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-violet-400/5 to-pink-400/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto p-6 lg:p-8">
        {/* Glassmorphism Header Section */}
        <div className="mb-12 backdrop-blur-md bg-white/70 border border-white/20 rounded-3xl p-8 shadow-2xl shadow-blue-500/10">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            {/* Title and Category Section */}
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-2xl">{categoryIcons[selectedCategory]}</span>
                </div>
                <div>
                  <h1 className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent leading-tight">
                    Top Headlines
                  </h1>
                  <p className="text-lg text-gray-600 font-medium capitalize">
                    {selectedCategory} News
                  </p>
                </div>
              </div>
              
              {/* Category Selector */}
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full md:w-auto px-6 py-4 text-lg font-semibold bg-gradient-to-r from-white to-gray-50 border-2 border-gray-200/50 rounded-2xl shadow-lg shadow-blue-500/5 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 backdrop-blur-sm appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: 'right 1rem center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '1.5em 1.5em',
                  }}
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat} className="py-2">
                      {categoryIcons[cat]} {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Saved Articles Button */}
            <div className="flex items-center lg:items-start">
              <button
                onClick={handleViewSaved}
                className="group relative overflow-hidden px-8 py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 text-white font-bold rounded-2xl shadow-2xl shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1"
              >
                {/* Animated Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Button Content */}
                <div className="relative flex items-center gap-3">
                  {/* Bookmark Icon with Animation */}
                  <div className="relative">
                    <svg 
                      className="w-6 h-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"></path>
                    </svg>
                    
                    {/* Pulse Ring for Icon */}
                    <div className="absolute inset-0 bg-white/30 rounded-full animate-ping opacity-0 group-hover:opacity-100"></div>
                  </div>
                  
                  <div className="text-left">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">Saved Articles</span>
                      {/* Count Badge */}
                      {savedCount > 0 && (
                        <div className="relative">
                          <div className="px-2 py-1 bg-white/90 text-purple-600 text-sm font-black rounded-full shadow-lg transform transition-all duration-300 group-hover:scale-110">
                            {savedCount}
                          </div>
                          {/* Badge Glow */}
                          <div className="absolute inset-0 bg-white/50 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                      )}
                    </div>
                    <div className="text-sm opacity-90 font-medium">
                      {savedCount === 0 ? 'No saved articles yet' : `${savedCount} article${savedCount !== 1 ? 's' : ''} saved`}
                    </div>
                  </div>
                  
                  {/* Arrow Icon */}
                  <svg 
                    className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>

                {/* Shimmer Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-full group-hover:translate-x-[-200%] transition-transform duration-700 ease-in-out"></div>
                
                {/* Border Glow */}
                <div className="absolute inset-0 rounded-2xl border-2 border-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>
        </div>

        {/* Content Section */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              {/* Advanced Loading Animation */}
              <div className="relative mb-8">
                <div className="w-20 h-20 border-4 border-blue-200 rounded-full animate-spin mx-auto"></div>
                <div className="w-20 h-20 border-4 border-blue-600 border-t-transparent rounded-full animate-spin absolute top-0 left-1/2 transform -translate-x-1/2"></div>
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full absolute top-2 left-1/2 transform -translate-x-1/2 animate-pulse"></div>
              </div>
              <div className="space-y-2">
                <p className="text-xl font-semibold text-gray-700">Fetching Latest News</p>
                <p className="text-gray-500">Please wait while we gather the headlines...</p>
              </div>
            </div>
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-20">
            <div className="backdrop-blur-md bg-white/70 border border-white/20 rounded-3xl p-12 shadow-2xl shadow-red-500/10 max-w-md mx-auto">
              <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-4xl">📰</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">No Articles Found</h3>
              <p className="text-gray-600">We couldn't find any articles for this category. Try selecting a different category.</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {articles.map((article, index) => (
              <div
                key={index}
                className="transform transition-all duration-500 hover:scale-105"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: 'fadeInUp 0.6s ease-out forwards'
                }}
              >
                <NewsCard 
                  article={article} 
                  onSave={() => {
                    // Update saved count when an article is saved
                    setTimeout(() => {
                      setSavedCount(getSavedArticles().length);
                    }, 100);
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export default Home;
