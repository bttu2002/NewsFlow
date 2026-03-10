import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { formatFullDate, estimateReadingTime } from '../../utils/formatDate';
import { toggleBookmark, isBookmarked } from '../../utils/bookmarks';
import type { Article } from '../../types/news';
import './ArticlePage.css';

export default function ArticlePage() {
  const { id } = useParams<{ id: string }>();
  const articleUrl = decodeURIComponent(id || '');

  // Build a basic article object from URL (since NewsAPI doesn't have a single-article endpoint)
  // In a real app, we'd pass state via router or cache
  const [bookmarked, setBookmarked] = useState(() => isBookmarked(articleUrl));

  // Try to get article from session storage (set by NavigateToArticle)
  const storedArticle = sessionStorage.getItem('newsflow_current_article');
  const article: Article | null = storedArticle ? JSON.parse(storedArticle) : null;

  const handleBookmark = () => {
    if (article) {
      const result = toggleBookmark(article);
      setBookmarked(result);
    }
  };

  if (!article) {
    return (
      <main className="article-page" id="article-page">
        <div className="container">
          <div className="article-not-found">
            <h2>Article Not Found</h2>
            <p>The article you're looking for couldn't be loaded.</p>
            <div className="article-actions-fallback">
              <a
                href={articleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Read on Original Site →
              </a>
              <Link to="/" className="btn btn-outline">
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="article-page" id="article-page">
      {/* Hero Image */}
      {article.urlToImage && (
        <div className="article-hero-image">
          <img src={article.urlToImage} alt={article.title} />
          <div className="article-hero-overlay" />
        </div>
      )}

      <div className="container">
        <article className="article-content">
          {/* Breadcrumb */}
          <nav className="article-breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>{article.source.name}</span>
          </nav>

          {/* Header */}
          <header className="article-header">
            <span className="tag">{article.source.name}</span>
            <h1 className="article-title">{article.title}</h1>

            <div className="article-meta-bar">
              <div className="article-meta-left">
                {article.author && (
                  <span className="article-author">
                    <strong>By {article.author}</strong>
                  </span>
                )}
                <span className="article-date">
                  {formatFullDate(article.publishedAt)}
                </span>
                <span className="article-read-time">
                  {estimateReadingTime(article.content)}
                </span>
              </div>
              <div className="article-meta-right">
                <button
                  className={`icon-btn-article ${bookmarked ? 'active' : ''}`}
                  onClick={handleBookmark}
                  aria-label="Bookmark"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill={bookmarked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                  </svg>
                </button>
                <button
                  className="icon-btn-article"
                  onClick={() => {
                    navigator.clipboard.writeText(articleUrl);
                  }}
                  aria-label="Copy link"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                  </svg>
                </button>
              </div>
            </div>
          </header>

          {/* Body */}
          <div className="article-body">
            {article.description && (
              <p className="article-lead">{article.description}</p>
            )}
            {article.content && (
              <p className="article-text">{article.content}</p>
            )}
            <div className="article-cta">
              <a
                href={articleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                id="read-full-article"
              >
                Read Full Article on {article.source.name} →
              </a>
            </div>
          </div>

          {/* Back */}
          <div className="article-back">
            <Link to="/" className="btn btn-outline">
              ← Back to Home
            </Link>
          </div>
        </article>
      </div>
    </main>
  );
}
