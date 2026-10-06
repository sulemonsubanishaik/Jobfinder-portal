import React, { createContext, useContext, useState, useEffect } from 'react';

const BookmarkContext = createContext();

const STORAGE_KEY = 'jobfinder_bookmarks';

export function BookmarkProvider({ children }) {
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
    } catch (err) {
      console.error('Failed to save bookmarks to localStorage', err);
    }
  }, [bookmarks]);

  const toggleBookmark = (job) => {
    setBookmarks((prev) => {
      const exists = prev.some((b) => b.id === job.id);
      if (exists) {
        return prev.filter((b) => b.id !== job.id);
      } else {
        return [...prev, job];
      }
    });
  };

  const isBookmarked = (jobId) => {
    return bookmarks.some((b) => b.id === jobId);
  };

  const removeBookmark = (jobId) => {
    setBookmarks((prev) => prev.filter((b) => b.id !== jobId));
  };

  return (
    <BookmarkContext.Provider
      value={{
        bookmarks,
        bookmarkedCount: bookmarks.length,
        toggleBookmark,
        isBookmarked,
        removeBookmark
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}

export function useBookmarks() {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error('useBookmarks must be used within a BookmarkProvider');
  }
  return context;
}
