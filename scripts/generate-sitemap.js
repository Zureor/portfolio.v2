const fs = require('fs');
const { execSync } = require('child_process');
const { bundleMDX } = require('mdx-bundler');

const siteUrl = process.env.NEXT_PUBLIC_WEBSITE_URL;

// Last commit date of a file, so <lastmod> tracks real edits rather than build time.
function lastCommitDate(file) {
  try {
    return execSync(`git log -1 --format=%cs -- "${file}"`, {
      encoding: 'utf-8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
  } catch {
    return '';
  }
}

function urlEntry(path, lastmod) {
  return `  <url>
    <loc>${siteUrl}${path}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''}
  </url>`;
}

function addPage(page) {
  const route = page
    .replace('src/pages', '')
    .replace('.page.js', '')
    .replace('.page.mdx', '')
    .replace(/\/index$/, '/');

  // Exclude 404 page and generated `[]` pages
  if (route.includes('[') || route.includes('404')) return;

  // next.config uses `trailingSlash: true`, so list the final URLs, not the redirecting ones
  return urlEntry(route.endsWith('/') ? route : `${route}/`, lastCommitDate(page));
}

async function addPost(post) {
  const source = fs.readFileSync(post, 'utf-8');
  const { frontmatter } = await bundleMDX({ source });

  if (process.env.NODE_ENV === 'production' && frontmatter.draft) return;

  const path = post.replace('src/posts', '/articles').replace('.mdx', '/');
  const lastmod = lastCommitDate(post) || String(frontmatter.date).slice(0, 10);

  return urlEntry(path, lastmod);
}

async function generateSitemap() {
  const { globby } = await import('globby');
  // Ignore Next.js specific files (e.g., _app.js) and API routes.
  const pages = await globby([
    'src/pages/**/*{.page.js,.page.mdx}',
    '!src/pages/_*.js',
    '!src/pages/api',
  ]);
  const postUrls = await globby(['src/posts/**/*.mdx']);
  const posts = await Promise.all(postUrls.map(addPost));

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(addPage).filter(Boolean).join('\n')}
${posts.filter(Boolean).join('\n')}
</urlset>\n`;

  fs.writeFileSync('public/sitemap.xml', sitemap);
}

generateSitemap();
