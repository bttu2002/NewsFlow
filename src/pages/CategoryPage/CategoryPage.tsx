import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCategoryNews } from '../../services/newsService';
import type { Article, Category } from '../../types/news';
import NewsList from '../../components/NewsList/NewsList';
import Newsletter from '../../components/Newsletter/Newsletter';
import './CategoryPage.css';

const CATEGORY_META: Record<string, { title: string; icon: string; description: string }> = {
  business: { title: 'Business', icon: '💼', description: 'Markets, economy, and corporate news' },
  technology: { title: 'Technology', icon: '💻', description: 'Tech innovations, startups, and digital trends' },
  sports: { title: 'Sports', icon: '⚽', description: 'Scores, highlights, and sports stories' },
  entertainment: { title: 'Entertainment', icon: '🎬', description: 'Movies, music, celebrities, and pop culture' },
  health: { title: 'Health', icon: '🏥', description: 'Medical breakthroughs, wellness, and health tips' },
  science: { title: 'Science', icon: '🔬', description: 'Discoveries, space exploration, and research' },
  general: { title: 'General', icon: '📰', description: 'Top stories from around the world' },
};

export default function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const meta = CATEGORY_META[category || 'general'] || CATEGORY_META.general;

  useEffect(() => {
    async function fetchCategoryNews() {
      setLoading(true);
      try {
        const res = await getCategoryNews(
          (category || 'general') as Category,
          'us',
          page,
          12
        );
        const valid = res.articles.filter(
          (a) => a.title && a.title !== '[Removed]'
        );
        if (page === 1) {
          setArticles(valid);
        } else {
          setArticles((prev) => [...prev, ...valid]);
        }
        setTotalResults(res.totalResults);
      } catch (err) {
        console.error('Failed to fetch category news:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchCategoryNews();
  }, [category, page]);

  useEffect(() => {
    setArticles([]);
    setPage(1);
    window.scrollTo(0, 0);
  }, [category]);

  const hasMore = articles.length < totalResults;

  return (
    <main className="category-page" id="category-page">
      <div className="category-hero">
        <div className="container">
          <div className="category-hero-content">
            <span className="category-icon">{meta.icon}</span>
            <h1 className="category-title">{meta.title}</h1>
            <p className="category-desc">{meta.description}</p>
          </div>
        </div>
      </div>

      <NewsList
        articles={articles}
        loading={loading && page === 1}
        title={`${meta.title} News`}
      />

      {hasMore && !loading && (
        <div className="load-more-wrapper container">
          <button
            className="btn btn-outline load-more-btn"
            onClick={() => setPage((p) => p + 1)}
            id="load-more-btn"
          >
            {loading ? 'Loading...' : 'Load More Articles'}
          </button>
        </div>
      )}

      <Newsletter />
    </main>
  );
}
