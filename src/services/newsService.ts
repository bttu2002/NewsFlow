import axios from 'axios';
import type {
  NewsApiResponse,
  SourcesApiResponse,
  TopHeadlinesParams,
  EverythingParams,
  Category,
} from '../types/news';

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = 'https://newsapi.org/v2';

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    apiKey: API_KEY,
  },
});

export async function getTopHeadlines(
  params: TopHeadlinesParams = {}
): Promise<NewsApiResponse> {
  const { data } = await api.get<NewsApiResponse>('/top-headlines', {
    params: {
      country: params.country || 'us',
      category: params.category,
      q: params.q,
      pageSize: params.pageSize || 20,
      page: params.page || 1,
    },
  });
  return data;
}

export async function getCategoryNews(
  category: Category,
  country: string = 'us',
  page: number = 1,
  pageSize: number = 20
): Promise<NewsApiResponse> {
  const { data } = await api.get<NewsApiResponse>('/top-headlines', {
    params: {
      country,
      category,
      pageSize,
      page,
    },
  });
  return data;
}

export async function searchNews(
  params: EverythingParams
): Promise<NewsApiResponse> {
  const { data } = await api.get<NewsApiResponse>('/everything', {
    params: {
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
    },
  });
  return data;
}

export async function getSources(
  category?: Category,
  language?: string,
  country?: string
): Promise<SourcesApiResponse> {
  const { data } = await api.get<SourcesApiResponse>(
    '/top-headlines/sources',
    {
      params: {
        category,
        language,
        country,
      },
    }
  );
  return data;
}
