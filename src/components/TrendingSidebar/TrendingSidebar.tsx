import type { Article } from '../../types/news';
import NewsCard from '../NewsCard/NewsCard';
import './TrendingSidebar.css';

interface TrendingSidebarProps {
  articles: Article[];
  loading?: boolean;
}

export default function TrendingSidebar({ articles, loading }: TrendingSidebarProps) {
  if (loading) {
    return (
      <aside className="trending-sidebar" id="trending-sidebar">
        <h3 className="section-title">Trending Now</h3>
        <div className="trending-list">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="trending-skeleton">
              <div className="skeleton" style={{ width: 36, height: 28 }} />
              <div style={{ flex: 1 }}>
                <div className="skeleton skeleton-text short" />
                <div className="skeleton skeleton-title" />
              </div>
            </div>
          ))}
        </div>
      </aside>
    );
  }

  return (
    <aside className="trending-sidebar" id="trending-sidebar">
      <h3 className="section-title">Trending Now</h3>
      <div className="trending-list">
        {articles.slice(0, 5).map((article, index) => (
          <NewsCard
            key={article.url}
            article={article}
            variant="compact"
            index={index}
          />
        ))}
      </div>
    </aside>
  );
}
