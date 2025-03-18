import { Helmet } from 'react-helmet';

const SEO = ({ title, description, image, url }) => {
  return (
    <Helmet>
      {/* Standard Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content="job search, employment, hiring, career, job portal, JobSeek, apply for jobs, work opportunities" />
      <meta name="author" content="JobSeek Team" />

      {/* Open Graph Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="JobSeek" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:image:width" content="1200" /> {/* Add dimensions */}
      <meta property="og:image:height" content="630" />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@JobSeekOfficial" /> {/* Replace with your actual handle */}
    </Helmet>
  );
};

export default SEO;