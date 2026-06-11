import { MetadataRoute } from 'next';
import { events } from '@/data/events';
import { societies } from '@/data/societies';

const BASE_URL = 'https://ieeesbnssce.in';

export default function sitemap(): MetadataRoute.Sitemap {
  // Base routes
  const routes = [
    '',
    '/team',
    '/events',
    '/gallery',
    '/achievements',
    '/societies',
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Dynamic Event Routes
  const eventRoutes = events.map((event) => ({
    url: `${BASE_URL}/events/${event.slug}`,
    lastModified: new Date(event.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Dynamic Society Routes
  const societyRoutes = societies.map((society) => ({
    url: `${BASE_URL}/societies/${society.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  return [...routes, ...eventRoutes, ...societyRoutes];
}
