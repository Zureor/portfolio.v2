import Head from 'next/head';
import { useRouter } from 'next/router';

const siteUrl = process.env.NEXT_PUBLIC_WEBSITE_URL;
const name = 'Md. Shoaib Rana';
const twitterHandle = '@evanahmedshoaib';
const defaultOgImage = `${siteUrl}/social-image.png`;

const person = {
  '@type': 'Person',
  '@id': `${siteUrl}/#person`,
  name,
  alternateName: ['Shoaib', 'evanahmedshoaib', 'Zureor'],
  url: `${siteUrl}/`,
  jobTitle: 'Packaging Infrastructure System Developer',
  worksFor: {
    '@type': 'Organization',
    name: 'PAC-D',
    url: 'https://allportcs.com/pac-d/',
  },
  alumniOf: { '@type': 'CollegeOrUniversity', name: 'Southeast University' },
  knowsAbout: [
    'Internal systems',
    'Live dashboards',
    'PostgreSQL',
    'AWS',
    'Business intelligence',
    'LLM evaluation',
    'Item Response Theory',
  ],
  sameAs: [
    'https://github.com/Zureor',
    'https://www.linkedin.com/in/md-shoaib-rana-28928b215/',
    'https://www.twitter.com/evanahmedshoaib',
    'https://www.facebook.com/evanahmedshoaib/',
    'https://www.instagram.com/absolutely_not_shoaib',
  ],
};

const website = {
  '@type': 'WebSite',
  '@id': `${siteUrl}/#website`,
  url: `${siteUrl}/`,
  name,
  publisher: { '@id': `${siteUrl}/#person` },
  inLanguage: 'en',
};

/**
 * Page head: title, description, canonical, Open Graph, Twitter and JSON-LD.
 * `schema` adds page-specific JSON-LD node(s) to the site-wide Person + WebSite graph.
 */
export const Meta = ({
  title,
  description = '',
  ogImage = defaultOgImage,
  type = 'website',
  publishedTime,
  noindex = false,
  schema,
}) => {
  const { asPath } = useRouter();
  const url = `${siteUrl}${asPath.split(/[?#]/)[0]}`;
  const titleText = title ? `${title} – ${name}` : name;
  const descriptionText = description.replace(/\s+/g, ' ').trim();

  const pageNodes = [].concat(schema || []).map(node => ({
    url,
    mainEntityOfPage: url,
    ...node,
  }));
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [person, website, ...pageNodes],
  };

  return (
    <Head>
      <title key="title">{titleText}</title>
      <meta key="description" name="description" content={descriptionText} />
      <meta name="author" content={name} />
      {noindex ? (
        <meta name="robots" content="noindex" />
      ) : (
        <link rel="canonical" href={url} />
      )}

      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content={titleText} />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1280" />
      <meta property="og:image:height" content="675" />

      <meta property="og:title" content={titleText} />
      <meta property="og:site_name" content={name} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:description" content={descriptionText} />
      {publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:description" content={descriptionText} />
      <meta name="twitter:title" content={titleText} />
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:creator" content={twitterHandle} />
      <meta name="twitter:image" content={ogImage} />

      {!noindex && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
          }}
        />
      )}
    </Head>
  );
};
