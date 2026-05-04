import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CookieConsent from './components/CookieConsent';
import NewsletterPopup from './components/NewsletterPopup';
import BackToTop from './components/BackToTop';
import NewsletterBanner from './components/NewsletterBanner';

// Lazy-load all page components for better performance (code splitting)
const Home = lazy(() => import('./pages/Home'));
const Tools = lazy(() => import('./pages/Tools'));
const ToolDetail = lazy(() => import('./pages/ToolDetail'));
const Categories = lazy(() => import('./pages/Categories'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Admin = lazy(() => import('./pages/Admin'));
const SubmitTool = lazy(() => import('./pages/Submit'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));

// Global site constants
const SITE_URL = 'https://ai-tools-directory-orpin.vercel.app';
const SITE_NAME = 'AI Tools Directory';

// Scroll to top on navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Loading fallback for lazy pages
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

export default function App() {
  return (
    <HelmetProvider>
      {/* Global default SEO - individual pages override these */}
      <Helmet defaultTitle={SITE_NAME} titleTemplate={`%s | ${SITE_NAME}`}>
        <meta name="description" content="Discover 120+ best AI tools across 25 categories. Find the perfect AI tool for writing, coding, design, marketing, and more — completely free." />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:image" content={`${SITE_URL}/logo.png`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@aitoolsdirectory" />
        <link rel="canonical" href={SITE_URL} />
        {/* Global Organization JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": SITE_NAME,
            "url": SITE_URL,
            "logo": `${SITE_URL}/logo.png`,
            "contactPoint": {
              "@type": "ContactPoint",
              "email": "mibtisam097@gmail.com",
              "contactType": "customer support"
            },
            "sameAs": [
              "https://www.instagram.com/i.awannn/",
              "https://www.linkedin.com/in/malik-ibtisam-awan-458b93265/",
              "https://github.com/ibtisamawan"
            ]
          })}
        </script>
        {/* WebSite JSON-LD with SearchAction */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "url": `${SITE_URL}/`,
            "name": SITE_NAME,
            "potentialAction": {
              "@type": "SearchAction",
              "target": `${SITE_URL}/tools?q={search_term_string}`,
              "query-input": "required name=search_term_string"
            }
          })}
        </script>
      </Helmet>

      <ThemeProvider>
        <Router>
          <ScrollToTop />
          <NewsletterPopup />
          <BackToTop />
          <NewsletterBanner />
          <CookieConsent />
          <div className="min-h-screen flex flex-col bg-[#0A0F1E] text-white">
            <Navbar />
            <main className="flex-grow">
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/tools" element={<Tools />} />
                  <Route path="/categories" element={<Categories />} />
                  <Route path="/tools/:slug" element={<ToolDetail />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/admin" element={<Admin />} />
                  <Route path="/submit" element={<SubmitTool />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:slug" element={<BlogPost />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                </Routes>
              </Suspense>
            </main>
            <Footer />
          </div>
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                borderRadius: '12px',
                background: '#1E293B',
                color: '#E2E8F0',
                fontSize: '14px',
              },
            }}
          />
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
}
