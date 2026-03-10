import { Link } from 'react-router-dom';
import type { Article } from '../../types/news';
import { formatRelativeTime, estimateReadingTime } from '../../utils/formatDate';
import './BlogSection.css';

interface BlogSectionProps {
  articles: Article[];
  loading?: boolean;
}

export default function BlogSection({ articles, loading }: BlogSectionProps) {
  if (loading) {
    return (
      <section className="blog-section section" id="blog-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Popular Stories</h2>
          </div>
          <div className="blog-grid">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="blog-card-skeleton">
                <div className="skeleton skeleton-image" />
                <div style={{ padding: 'var(--space-md)' }}>
                  <div className="skeleton skeleton-text short" />
                  <div className="skeleton skeleton-title" />
                  <div className="skeleton skeleton-text" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="blog-section section" id="blog-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Popular Stories</h2>
        </div>
        <div className="blog-grid">
          {articles.slice(0, 6).map((article, index) => (
            <Link
              to={`/article/${encodeURIComponent(article.url)}`}
              className="blog-card animate-fadeInUp"
              style={{ animationDelay: `${index * 100}ms` }}
              key={article.url + index}
              id={`blog-card-${index}`}
              onClick={() => sessionStorage.setItem('newsflow_current_article', JSON.stringify(article))}
            >
              <div className="blog-card-image">
                <img
                  src={article.urlToImage || 'https://placehold.co/400x250/e8e8e8/999?text=NEWS'}
                  alt={article.title}
                  loading="lazy"
                />
              </div>
              <div className="blog-card-body">
                <span className="card-source">{article.source.name}</span>
                <h3 className="blog-card-title">{article.title}</h3>
                <div className="blog-card-meta">
                  <span>{formatRelativeTime(article.publishedAt)}</span>
                  <span className="dot">·</span>
                  <span>{estimateReadingTime(article.content)}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
