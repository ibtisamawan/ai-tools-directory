import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEO({ 
  title, 
  description, 
  url, 
  image, 
  type = 'website',
  schema 
}) {
  const siteTitle = 'AI Tools Directory';
  const defaultDescription = 'Discover, search, and filter the best Artificial Intelligence tools. Your ultimate directory for AI software and applications.';
  const siteUrl = 'https://ai-tools-directory-orpin.vercel.app'; // Replace with actual production URL later
  const defaultImage = `${siteUrl}/logo.png`; // Assuming a logo exists

  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const metaDescription = description || defaultDescription;
  const metaUrl = url ? `${siteUrl}${url}` : siteUrl;
  const metaImage = image || defaultImage;

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={metaUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={metaUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />

      {/* Structured Data (JSON-LD) */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}
