import axios from 'axios';
import type {
  NewsApiResponse,
  SourcesApiResponse,
  TopHeadlinesParams,
  EverythingParams,
  Category,
} from '../types/news';

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const isDev = import.meta.env.DEV;

// In development: call NewsAPI directly (localhost is allowed)
// In production: call our Vercel serverless proxy to avoid CORS
const api = isDev
  ? axios.create({
      baseURL: 'https://newsapi.org/v2',
      params: { apiKey: API_KEY },
    })
  : axios.create({
      baseURL: '/api',
    });

function buildParams(endpoint: string, params: Record<string, unknown>) {
  if (isDev) {
    return params;
  }
  // In production, pass endpoint as a query param to our proxy
  return { endpoint, ...params };
}

export async function getTopHeadlines(
  params: TopHeadlinesParams = {}
): Promise<NewsApiResponse> {
  const queryParams = {
    country: params.country || 'us',
    category: params.category,
    q: params.q,
    pageSize: params.pageSize || 20,
    page: params.page || 1,
  };

  const { data } = await api.get<NewsApiResponse>(
    isDev ? '/top-headlines' : '/news',
    { params: buildParams('top-headlines', queryParams) }
  );
  return data;
}

export async function getCategoryNews(
  category: Category,
  country: string = 'us',
  page: number = 1,
  pageSize: number = 20
): Promise<NewsApiResponse> {
  const queryParams = {
    country,
    category,
    pageSize,
    page,
  };

  const { data } = await api.get<NewsApiResponse>(
    isDev ? '/top-headlines' : '/news',
    { params: buildParams('top-headlines', queryParams) }
  );
  return data;
}

export async function searchNews(
  params: EverythingParams
): Promise<NewsApiResponse> {
  const queryParams = {
    q: params.q,
    searchIn: params.searchIn,
    sources: params.sources,
    domains: params.domains,
    from: params.from,
    to: params.to,
    language: params.language || 'en',
    sortBy: params.sortBy || 'publishedAt',
    pageSize: params.pageSize || 20,
    page: params.page || 1,
  };

  const { data } = await api.get<NewsApiResponse>(
    isDev ? '/everything' : '/news',
    { params: buildParams('everything', queryParams) }
  );
  return data;
}

export async function getSources(
  category?: Category,
  language?: string,
  country?: string
): Promise<SourcesApiResponse> {
  const queryParams = {
    category,
    language,
    country,
  };

  const { data } = await api.get<SourcesApiResponse>(
    isDev ? '/top-headlines/sources' : '/news',
    { params: buildParams('top-headlines/sources', queryParams) }
  );
  return data;
}
