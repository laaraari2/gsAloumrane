import React, { useState, useEffect } from 'react';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { addBookmark, removeBookmark, isBookmarked, getBookmarks } from '../lib/storage';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

interface BookmarkButtonProps {
  section: string;
  title: string;
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({ section, title }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    setBookmarked(isBookmarked(location.pathname));
  }, [location.pathname]);

  const handleToggle = () => {
    if (bookmarked) {
      const bookmarks = getBookmarks();
      const bookmark = bookmarks.find((b) => b.url === location.pathname);
      if (bookmark) {
        removeBookmark(bookmark.id);
      }
    } else {
      addBookmark({
        section,
        title,
        url: location.pathname,
      });
    }
    setBookmarked(!bookmarked);
  };

  return (
    <button
      onClick={handleToggle}
      className={`p-2 rounded-lg transition ${
        bookmarked
          ? 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30'
          : 'bg-slate-700/50 text-slate-400 hover:bg-slate-600/50'
      }`}
      title={bookmarked ? t('bookmarks.remove') : t('bookmarks.add')}
    >
      {bookmarked ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
    </button>
  );
};

export default BookmarkButton;

