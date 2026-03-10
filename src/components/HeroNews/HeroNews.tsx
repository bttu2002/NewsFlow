import { Link } from 'react-router-dom';
import type { Article } from '../../types/news';
import { formatRelativeTime } from '../../utils/formatDate';
import './HeroNews.css';

interface HeroNewsProps {
  articles: Article[];
  loading?: boolean;
}

export default function HeroNews({ articles, loading }: HeroNewsProps) {
  if (loading) {
    return (
      <section className="hero-section" id="hero-section">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-main skeleton skeleton-image" style={{ aspectRatio: '16/9' }} />
            <div className="hero-side">
              <div className="skeleton skeleton-image" style={{ aspectRatio: '16/9' }} />
              <div className="skeleton skeleton-image" style={{ aspectRatio: '16/9' }} />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (articles.length === 0) return null;

  const mainArticle = articles[0];
  const sideArticles = articles.slice(1, 3);

  return (
    <section className="hero-section" id="hero-section">
      <div className="container">
        <div className="hero-grid">
          {/* Main Hero Article */}
          <Link
            to={`/article/${encodeURIComponent(mainArticle.url)}`}
            className="hero-main"
            id="hero-main-article"
            onClick={() => sessionStorage.setItem('newsflow_current_article', JSON.stringify(mainArticle))}
          >
            <div className="hero-image-wrapper">
              <img
                src={mainArticle.urlToImage || 'https://placehold.co/800x450/e8e8e8/999?text=NEWS+24'}
                alt={mainArticle.title}
                className="hero-img"
                loading="eager"
              />
              <div className="hero-overlay" />
            </div>
            <div className="hero-content">
              <span className="tag">{mainArticle.source.name}</span>
              <h1 className="hero-title">{mainArticle.title}</h1>
              <p className="hero-description">{mainArticle.description}</p>
              <div className="hero-meta">
                {mainArticle.author && (
                  <span className="hero-author">By {mainArticle.author}</span>
                )}
                <span className="hero-date">
                  {formatRelativeTime(mainArticle.publishedAt)}
                </span>
              </div>
            </div>
          </Link>

          {/* Side Articles */}
          <div className="hero-side">
            {sideArticles.map((article, index) => (
              <Link
                to={`/article/${encodeURIComponent(article.url)}`}
                className="hero-side-card"
                key={article.url}
                id={`hero-side-${index}`}
                onClick={() => sessionStorage.setItem('newsflow_current_article', JSON.stringify(article))}
              >
                <div className="hero-side-image-wrapper">
                  <img
                    src={article.urlToImage || 'https://placehold.co/400x225/e8e8e8/999?text=NEWS+24'}
                    alt={article.title}
                    className="hero-side-img"
                    loading="eager"
                  />
                  <div className="hero-overlay" />
                </div>
                <div className="hero-side-content">
                  <span className="tag">{article.source.name}</span>
                  <h3 className="hero-side-title">{article.title}</h3>
                  <span className="hero-side-date">
                    {formatRelativeTime(article.publishedAt)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
