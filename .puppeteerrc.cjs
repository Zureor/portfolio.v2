const { join } = require('path');

// Keep the downloaded Chrome inside node_modules so Netlify's dependency cache
// restores it along with puppeteer (used to render article OG images at build).
module.exports = {
  cacheDirectory: join(__dirname, 'node_modules', '.cache', 'puppeteer'),
};
