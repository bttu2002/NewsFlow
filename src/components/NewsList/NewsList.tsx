import type { Article } from '../../types/news';
import NewsCard from '../NewsCard/NewsCard';
import './NewsList.css';

interface NewsListProps {
  articles: Article[];
  loading?: boolean;
  title?: string;
  showSeeAll?: boolean;
  layout?: 'grid' | 'list';
}

function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton skeleton-image" />
      <div className="skeleton-card-body">
        <div className="skeleton skeleton-text short" />
        <div className="skeleton skeleton-title" />
        <div className="skeleton skeleton-text" />
        <div className="skeleton skeleton-text short" />
      </div>
    </div>
  );
}

export default function NewsList({
  articles,
  loading,
  title,
  showSeeAll,
  layout = 'grid',
}: NewsListProps) {
  if (loading) {
    return (
      <section className="news-list-section" id="news-list-section">
        <div className="container">
          {title && (
            <div className="section-header">
              <h2 className="section-title">{title}</h2>
            </div>
          )}
          <div className={`news-grid ${layout}`}>
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (articles.length === 0) {
    return (
      <section className="news-list-section" id="news-list-section">
        <div className="container">
          <div className="empty-state">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.3">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            <h3>No articles found</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="news-list-section" id="news-list-section">
      <div className="container">
        {title && (
          <div className="section-header">
            <h2 className="section-title">{title}</h2>
            {showSeeAll && (
              <span className="section-link">
                See all →
              </span>
            )}
          </div>
        )}
        <div className={`news-grid ${layout}`}>
          {articles.map((article, index) => (
            <NewsCard
              key={article.url + index}
              article={article}
              variant={layout === 'list' ? 'horizontal' : 'default'}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
