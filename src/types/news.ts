export interface ArticleSource {
  id: string | null;
  name: string;
}

export interface Article {
  source: ArticleSource;
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

export interface NewsApiResponse {
  status: 'ok' | 'error';
  totalResults: number;
  articles: Article[];
  code?: string;
  message?: string;
}

export interface Source {
  id: string;
  name: string;
  description: string;
  url: string;
  category: Category;
  language: string;
  country: string;
}

export interface SourcesApiResponse {
  status: 'ok' | 'error';
  sources: Source[];
  code?: string;
  message?: string;
}

export type Category =
  | 'general'
  | 'business'
  | 'entertainment'
  | 'health'
  | 'science'
  | 'sports'
  | 'technology';

export type SortBy = 'relevancy' | 'popularity' | 'publishedAt';

export interface TopHeadlinesParams {
  country?: string;
  category?: Category;
  sources?: string;
  q?: string;
  pageSize?: number;
  page?: number;
}

export interface EverythingParams {
  q: string;
  searchIn?: string;
  sources?: string;
  domains?: string;
  from?: string;
  to?: string;
  language?: string;
  sortBy?: SortBy;
  pageSize?: number;
  page?: number;
}

export interface BookmarkedArticle extends Article {
  bookmarkedAt: string;
}
