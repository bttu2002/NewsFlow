import { useState, useEffect } from 'react';
import { getTopHeadlines } from '../../services/newsService';
import type { Article } from '../../types/news';
import HeroNews from '../../components/HeroNews/HeroNews';
import NewsList from '../../components/NewsList/NewsList';
import TrendingSidebar from '../../components/TrendingSidebar/TrendingSidebar';
import BlogSection from '../../components/BlogSection/BlogSection';
import Newsletter from '../../components/Newsletter/Newsletter';
import './Home.css';

export default function Home() {
  const [heroArticles, setHeroArticles] = useState<Article[]>([]);
  const [latestArticles, setLatestArticles] = useState<Article[]>([]);
  const [trendingArticles, setTrendingArticles] = useState<Article[]>([]);
  const [blogArticles, setBlogArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNews() {
      setLoading(true);
      setError(null);
      try {
        const [generalRes, techRes, entertainmentRes] = await Promise.all([
          getTopHeadlines({ country: 'us', pageSize: 20 }),
          getTopHeadlines({ country: 'us', category: 'technology', pageSize: 10 }),
          getTopHeadlines({ country: 'us', category: 'entertainment', pageSize: 10 }),
        ]);

        const validGeneral = generalRes.articles.filter(
          (a) => a.title && a.title !== '[Removed]'
        );
        const validTech = techRes.articles.filter(
          (a) => a.title && a.title !== '[Removed]'
        );
        const validEnt = entertainmentRes.articles.filter(
          (a) => a.title && a.title !== '[Removed]'
        );

        setHeroArticles(validGeneral.slice(0, 3));
        setLatestArticles(validGeneral.slice(3, 12));
        setTrendingArticles(validTech.slice(0, 5));
        setBlogArticles(validEnt.slice(0, 6));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load news');
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, []);

  if (error) {
    return (
      <div className="error-page container">
        <div className="error-content">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.5">
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
          <h2>Something went wrong</h2>
          <p>{error}</p>
          <button className="btn btn-primary" onClick={() => window.location.reload()}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="home-page" id="home-page">
      <HeroNews articles={heroArticles} loading={loading} />

      <section className="content-with-sidebar section">
        <div className="container">
          <div className="content-grid">
            <div className="main-content">
              <NewsList
                articles={latestArticles}
                loading={loading}
                title="Latest News"
                showSeeAll
              />
            </div>
            <TrendingSidebar articles={trendingArticles} loading={loading} />
          </div>
        </div>
      </section>

      <BlogSection articles={blogArticles} loading={loading} />
      <Newsletter />
    </main>
  );
}
