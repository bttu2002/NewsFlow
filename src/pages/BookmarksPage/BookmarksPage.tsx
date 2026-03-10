import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getBookmarks, removeBookmark } from '../../utils/bookmarks';
import type { BookmarkedArticle } from '../../types/news';
import { formatRelativeTime, estimateReadingTime } from '../../utils/formatDate';
import './BookmarksPage.css';

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState<BookmarkedArticle[]>(getBookmarks);

  const handleRemove = (url: string) => {
    removeBookmark(url);
    setBookmarks(getBookmarks());
  };

  if (bookmarks.length === 0) {
    return (
      <main className="bookmarks-page" id="bookmarks-page">
        <div className="container">
          <h1 className="page-title">Saved Articles</h1>
          <div className="empty-bookmarks">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.3">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
            <h3>No saved articles yet</h3>
            <p>Click the bookmark icon on any article to save it here</p>
            <Link to="/" className="btn btn-primary">
              Browse Articles
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="bookmarks-page" id="bookmarks-page">
      <div className="container">
        <div className="bookmarks-header">
          <h1 className="page-title">Saved Articles</h1>
          <span className="bookmarks-count">{bookmarks.length} article{bookmarks.length > 1 ? 's' : ''}</span>
        </div>

        <div className="bookmarks-list">
          {bookmarks.map((article) => (
            <div className="bookmark-item" key={article.url}>
              <Link
                to={`/article/${encodeURIComponent(article.url)}`}
                className="bookmark-content"
              >
                <div className="bookmark-image">
                  <img
                    src={article.urlToImage || 'https://placehold.co/200x130/e8e8e8/999?text=NEWS'}
                    alt={article.title}
                    loading="lazy"
                  />
                </div>
                <div className="bookmark-info">
                  <span className="card-source">{article.source.name}</span>
                  <h3 className="bookmark-title">{article.title}</h3>
                  <p className="bookmark-desc">{article.description}</p>
                  <div className="card-meta">
                    <span>{formatRelativeTime(article.publishedAt)}</span>
                    <span className="dot">·</span>
                    <span>{estimateReadingTime(article.content)}</span>
                  </div>
                </div>
              </Link>
              <button
                className="remove-bookmark-btn"
                onClick={() => handleRemove(article.url)}
                aria-label="Remove bookmark"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
