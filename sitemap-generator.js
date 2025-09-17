const fs = require('fs');
const path = require('path');

const DIRECTUS_URL = 'https://kopilot.sliplane.app';
const DIRECTUS_TOKEN = '3h9pr1rXhkBhbF7xFj6QwUkDKeCmcUzS';

async function generateSitemap() {
  try {
    const response = await fetch(
      `${DIRECTUS_URL}/items/posts?fields=slugs&filter[status][_eq]=published&filter[titles][_nnull]=true`,
      {
        headers: {
          'Authorization': `Bearer ${DIRECTUS_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.errors[0]?.message || 'Failed to fetch posts from Directus');
    }

    const data = await response.json();
    const posts = data.data;

    let sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    sitemapContent += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    // Add static pages
    const staticPages = [
      '/',
      '/impressum',
      '/privacy-policy',
      '/terms-of-service',
      '/cookie-policy',
      '/about-us',
      '/learn-more',
      '/blog'
    ];

    staticPages.forEach(page => {
      sitemapContent += `  <url>\n`;
      sitemapContent += `    <loc>https://www.yourdomain.com${page}</loc>\n`; // Replace with your actual domain
      sitemapContent += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`;
      sitemapContent += `    <changefreq>monthly</changefreq>\n`;
      sitemapContent += `    <priority>0.8</priority>\n`;
      sitemapContent += `  </url>\n`;
    });

    // Add blog posts
    posts.forEach(post => {
      sitemapContent += `  <url>\n`;
      sitemapContent += `    <loc>https://www.yourdomain.com/blog/${post.slugs}</loc>\n`; // Replace with your actual domain
      sitemapContent += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`;
      sitemapContent += `    <changefreq>weekly</changefreq>\n`;
      sitemapContent += `    <priority>0.9</priority>\n`;
      sitemapContent += `  </url>\n`;
    });

    sitemapContent += `</urlset>`;

    const sitemapPath = path.resolve(__dirname, 'public', 'sitemap.xml');
    fs.writeFileSync(sitemapPath, sitemapContent);
    console.log('sitemap.xml generated successfully!');
  } catch (error) {
    console.error('Error generating sitemap:', error.message);
  }
}

generateSitemap();
