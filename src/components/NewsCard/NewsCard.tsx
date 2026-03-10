import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Article } from '../../types/news';
import { formatRelativeTime, estimateReadingTime } from '../../utils/formatDate';
import { toggleBookmark, isBookmarked } from '../../utils/bookmarks';
import './NewsCard.css';

interface NewsCardProps {
  article: Article;
  variant?: 'default' | 'horizontal' | 'compact';
  index?: number;
}

export default function NewsCard({ article, variant = 'default', index = 0 }: NewsCardProps) {
  const [bookmarked, setBookmarked] = useState(() => isBookmarked(article.url));

  const storeArticle = () => {
    sessionStorage.setItem('newsflow_current_article', JSON.stringify(article));
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const result = toggleBookmark(article);
    setBookmarked(result);
  };

  if (variant === 'horizontal') {
    return (
      <Link
        to={`/article/${encodeURIComponent(article.url)}`}
        className="news-card-horizontal animate-fadeInUp"
        style={{ animationDelay: `${index * 80}ms` }}
        id={`news-card-h-${index}`}
        onClick={storeArticle}
      >
        <div className="card-h-image">
          <img
            src={article.urlToImage || 'https://placehold.co/300x200/e8e8e8/999?text=NEWS'}
            alt={article.title}
            loading="lazy"
          />
        </div>
        <div className="card-h-content">
          <span className="card-source">{article.source.name}</span>
          <h3 className="card-h-title">{article.title}</h3>
          <p className="card-h-desc">{article.description}</p>
          <div className="card-meta">
            <span>{formatRelativeTime(article.publishedAt)}</span>
            <span className="dot">·</span>
            <span>{estimateReadingTime(article.content)}</span>
          </div>
        </div>
        <button
          className={`bookmark-btn ${bookmarked ? 'active' : ''}`}
          onClick={handleBookmark}
          aria-label={bookmarked ? 'Remove bookmark' : 'Add bookmark'}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill={bookmarked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          </svg>
        </button>
      </Link>
    );
  }

  if (variant === 'compact') {
    return (
      <Link
        to={`/article/${encodeURIComponent(article.url)}`}
        className="news-card-compact animate-fadeInUp"
        style={{ animationDelay: `${index * 80}ms` }}
        id={`news-card-c-${index}`}
        onClick={storeArticle}
      >
        <span className="compact-number">{String(index + 1).padStart(2, '0')}</span>
        <div className="compact-content">
          <span className="card-source">{article.source.name}</span>
          <h4 className="compact-title">{article.title}</h4>
          <span className="compact-date">{formatRelativeTime(article.publishedAt)}</span>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/article/${encodeURIComponent(article.url)}`}
      className="news-card animate-fadeInUp"
      style={{ animationDelay: `${index * 80}ms` }}
      id={`news-card-${index}`}
      onClick={storeArticle}
    >
      <div className="card-image">
        <img
          src={article.urlToImage || 'https://placehold.co/400x250/e8e8e8/999?text=NEWS'}
          alt={article.title}
          loading="lazy"
        />
        <button
          className={`bookmark-btn ${bookmarked ? 'active' : ''}`}
          onClick={handleBookmark}
          aria-label={bookmarked ? 'Remove bookmark' : 'Add bookmark'}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill={bookmarked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          </svg>
        </button>
      </div>
      <div className="card-body">
        <span className="card-source">{article.source.name}</span>
        <h3 className="card-title">{article.title}</h3>
        <p className="card-desc">{article.description}</p>
        <div className="card-meta">
          {article.author && <span className="card-author">{article.author}</span>}
          <span>{formatRelativeTime(article.publishedAt)}</span>
          <span className="dot">·</span>
          <span>{estimateReadingTime(article.content)}</span>
        </div>
      </div>
    </Link>
  );
}
