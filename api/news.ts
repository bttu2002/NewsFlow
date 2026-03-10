import type { VercelRequest, VercelResponse } from '@vercel/node';

const API_KEY = process.env.VITE_NEWS_API_KEY;
const BASE_URL = 'https://newsapi.org/v2';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { endpoint, ...params } = req.query;

  if (!endpoint || typeof endpoint !== 'string') {
    return res.status(400).json({ error: 'Missing endpoint parameter' });
  }

  // Only allow known endpoints
  const allowedEndpoints = ['top-headlines', 'everything', 'top-headlines/sources'];
  if (!allowedEndpoints.includes(endpoint)) {
    return res.status(400).json({ error: 'Invalid endpoint' });
  }

  // Build query string
  const queryParams = new URLSearchParams();
  queryParams.set('apiKey', API_KEY || '');

  for (const [key, value] of Object.entries(params)) {
    if (typeof value === 'string') {
      queryParams.set(key, value);
    }
  }

  try {
    const response = await fetch(`${BASE_URL}/${endpoint}?${queryParams.toString()}`);
    const data = await response.json();

    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');

    return res.status(response.status).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch from NewsAPI' });
  }
}
