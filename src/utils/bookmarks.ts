import type { Article, BookmarkedArticle } from '../types/news';

const STORAGE_KEY = 'newsflow_bookmarks';

export function getBookmarks(): BookmarkedArticle[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function addBookmark(article: Article): void {
  const bookmarks = getBookmarks();
  const exists = bookmarks.some((b) => b.url === article.url);
  if (!exists) {
    const bookmarked: BookmarkedArticle = {
      ...article,
      bookmarkedAt: new Date().toISOString(),
    };
    bookmarks.unshift(bookmarked);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
  }
}

export function removeBookmark(articleUrl: string): void {
  const bookmarks = getBookmarks().filter((b) => b.url !== articleUrl);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
}

export function isBookmarked(articleUrl: string): boolean {
  return getBookmarks().some((b) => b.url === articleUrl);
}

export function toggleBookmark(article: Article): boolean {
  if (isBookmarked(article.url)) {
    removeBookmark(article.url);
    return false;
  } else {
    addBookmark(article);
    return true;
  }
}
