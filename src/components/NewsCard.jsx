import React, { useEffect, useState } from "react";
import {
  saveArticle,
  removeArticle,
  isArticleSaved,
} from "../utils/localStorage";

function NewsCard({ article }) {
  const [isSaved, setIsSaved] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setIsSaved(isArticleSaved(article.url));
  }, [article.url]);

  const handleSave = () => {
    saveArticle(article);
    setIsSaved(true);
  };

  const handleRemove = () => {
    removeArticle(article.url);
    setIsSaved(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getSourceName = (url) => {
    try {
      const domain = new URL(url).hostname;
      return domain.replace('www.', '').split('.')[0];
    } catch {
      return 'Unknown';
    }
  };

  return (
    <div 
      className="group relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-md border border-white/20 shadow-2xl shadow-blue-500/10 transition-all duration-500 hover:shadow-3xl hover:shadow-blue-500/20 hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Saved Status Badge */}
      {isSaved && (
        <div className="absolute top-4 right-4 z-30 flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm font-semibold rounded-full shadow-lg animate-pulse">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
          </svg>
          Saved
        </div>
      )}

      {/* Image Container with Advanced Effects */}
      <div className="relative overflow-hidden">
        {article.urlToImage ? (
          <div className="relative h-56 overflow-hidden">
            {/* Loading Shimmer */}
            {!isImageLoaded && (
              <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"></div>
            )}
            
            <img
              src={article.urlToImage}
              alt={article.title}
              className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
                isImageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setIsImageLoaded(true)}
              loading="lazy"
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Source Badge */}
            <div className="absolute bottom-4 left-4 px-3 py-1 bg-black/70 backdrop-blur-sm text-white text-xs font-medium rounded-full border border-white/20">
              {getSourceName(article.url)}
            </div>
          </div>
        ) : (
          <div className="h-56 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <div className="text-center">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              <p className="text-gray-500 text-sm">No Image Available</p>
            </div>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="relative z-10 p-6">
        {/* Article Metadata */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-500 font-medium">
              {article.publishedAt ? formatDate(article.publishedAt) : 'Recently'}
            </span>
          </div>
          {article.author && (
            <div className="text-xs text-gray-400 max-w-24 truncate">
              by {article.author}
            </div>
          )}
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-gray-900 mb-4 leading-tight line-clamp-3 group-hover:text-blue-800 transition-colors duration-300">
          {article.title}
        </h2>

        {/* Description */}
        <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">
          {article.description || "No description available for this article."}
        </p>

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          {/* Read More Link */}
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold transition-all duration-300 hover:gap-3"
          >
            <span>Read Article</span>
            <svg 
              className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>

          {/* Save/Remove Button */}
          {isSaved ? (
            <button
              onClick={handleRemove}
              className="group/btn flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <svg className="w-4 h-4 transition-transform duration-300 group-hover/btn:rotate-12" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" clipRule="evenodd"></path>
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 012 0v4a1 1 0 11-2 0V7zM12 7a1 1 0 10-2 0v4a1 1 0 102 0V7z" clipRule="evenodd"></path>
              </svg>
              <span className="hidden sm:inline">Remove</span>
            </button>
          ) : (
            <button
              onClick={handleSave}
              className="group/btn flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <svg className="w-4 h-4 transition-transform duration-300 group-hover/btn:scale-110" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"></path>
              </svg>
              <span className="hidden sm:inline">Save</span>
            </button>
          )}
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      
      {/* Border Glow */}
      <div className="absolute inset-0 rounded-3xl border border-transparent bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

      <style jsx>{`
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
        
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
}

export default NewsCard;