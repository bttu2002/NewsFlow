import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchNews } from '../../services/newsService';
import type { Article, SortBy } from '../../types/news';
import NewsList from '../../components/NewsList/NewsList';
import './SearchPage.css';

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [inputValue, setInputValue] = useState(query);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState<SortBy>('publishedAt');
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const doSearch = useCallback(async (q: string, sort: SortBy, p: number) => {
    if (!q.trim()) return;
    setLoading(true);
    try {
      const res = await searchNews({
        q: q.trim(),
        sortBy: sort,
        pageSize: 12,
        page: p,
      });
      const valid = res.articles.filter(
        (a) => a.title && a.title !== '[Removed]'
      );
      if (p === 1) {
        setArticles(valid);
      } else {
        setArticles((prev) => [...prev, ...valid]);
      }
      setTotalResults(res.totalResults);
    } catch (err) {
      console.error('Search failed:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setPage(1);
    setInputValue(query);
    doSearch(query, sortBy, 1);
  }, [query, sortBy, doSearch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setSearchParams({ q: inputValue.trim() });
    }
  };

  const hasMore = articles.length < totalResults;

  return (
    <main className="search-page" id="search-page">
      <div className="search-hero">
        <div className="container">
          <h1 className="search-hero-title">Search News</h1>
          <form className="search-hero-form" onSubmit={handleSubmit}>
            <div className="search-input-large-wrapper">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.4">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                className="search-input-large"
                placeholder="Search for news articles..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                id="search-page-input"
                autoFocus
              />
              <button type="submit" className="btn btn-primary" id="search-page-submit">
                Search
              </button>
            </div>
          </form>

          {query && (
            <div className="search-filters">
              <span className="search-results-count">
                {totalResults.toLocaleString()} results for "<strong>{query}</strong>"
              </span>
              <div className="sort-buttons">
                {(['publishedAt', 'relevancy', 'popularity'] as SortBy[]).map((s) => (
                  <button
                    key={s}
                    className={`sort-btn ${sortBy === s ? 'active' : ''}`}
                    onClick={() => setSortBy(s)}
                  >
                    {s === 'publishedAt' ? 'Latest' : s === 'relevancy' ? 'Relevant' : 'Popular'}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <NewsList
        articles={articles}
        loading={loading && page === 1}
        title={query ? undefined : 'Enter a search term above'}
      />

      {hasMore && !loading && query && (
        <div className="load-more-wrapper container">
          <button
            className="btn btn-outline load-more-btn"
            onClick={() => {
              const nextPage = page + 1;
              setPage(nextPage);
              doSearch(query, sortBy, nextPage);
            }}
            id="search-load-more"
          >
            Load More Results
          </button>
        </div>
      )}
    </main>
  );
}
