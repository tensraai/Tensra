import type { MetadataRoute } from 'next'
import { site, services } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ['', '/services', ...services.map((s) => s.href), '/solutions', '/case-studies', '/case-studies/brikline', '/demo', '/process', '/about', '/contact']
  return paths.map((p) => ({ url: `${site.url}${p}`, priority: p === '' ? 1 : 0.7 }))
}
