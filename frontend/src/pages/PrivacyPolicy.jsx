import React from 'react';
import { Helmet } from 'react-helmet-async';

const PrivacyPolicy = () => {
  const sections = [
    {
      id: 1,
      title: 'INTRODUCTION',
      content: 'AI Tools Directory is committed to protecting your privacy. This policy explains how we collect use and share information when you visit our website: ai-tools-directory-orpin.vercel.app'
    },
    {
      id: 2,
      title: 'INFORMATION WE COLLECT',
      subsections: [
        { label: 'Information you provide:', items: ['Name and email (newsletter/account)', 'Tool submissions', 'Contact form messages'] },
        { label: 'Automatically collected:', items: ['Browser type and version', 'Pages visited and time spent', 'Referring website address', 'Anonymized IP address', 'Device type (mobile/desktop)'] }
      ]
    },
    {
      id: 3,
      title: 'HOW WE USE YOUR INFORMATION',
      items: ['Provide and improve our services', 'Send newsletter (if subscribed)', 'Respond to your inquiries', 'Analyze website performance', 'Show relevant advertisements']
    },
    {
      id: 4,
      title: 'GOOGLE ADSENSE & COOKIES',
      content: 'We use Google AdSense for advertising. Google uses cookies to show ads based on your interests and browsing history.',
      subsections: [
        { label: 'Cookie types we use:', items: ['→ Essential: Site functionality', '→ Analytics: Google Analytics tracking', '→ Advertising: Google AdSense ads'] }
      ],
      extra: 'To opt out of personalized ads visit: google.com/settings/ads'
    },
    {
      id: 5,
      title: 'THIRD PARTY SERVICES',
      items: ['→ Google AdSense (advertising)', '→ Google Analytics (traffic analysis)', '→ MongoDB Atlas (secure database)', '→ Vercel (website hosting)', '→ Railway (backend hosting)']
    },
    {
      id: 6,
      title: 'DATA SECURITY',
      content: 'We implement industry standard security measures to protect your data. No internet transmission is 100% secure but we do our best to protect your information.'
    },
    {
      id: 7,
      title: 'YOUR RIGHTS',
      subsections: [
        { label: 'You have the right to:', items: ['→ Access your personal data', '→ Correct inaccurate information', '→ Request deletion of your data', '→ Opt out of marketing emails', '→ Disable cookies in your browser'] }
      ]
    },
    {
      id: 8,
      title: 'CHILDRENS PRIVACY',
      content: 'Our website is not directed to children under 13 years of age. We do not knowingly collect data from children.'
    },
    {
      id: 9,
      title: 'CHANGES TO THIS POLICY',
      content: 'We may update this Privacy Policy at any time. Changes are effective immediately when posted. Last update date is shown at top of this page.'
    },
    {
      id: 10,
      title: 'CONTACT US',
      content: 'Questions about this Privacy Policy?',
      details: [
        '📧 Email: mibtisam097@gmail.com',
        '🌐 Website: ai-tools-directory-orpin.vercel.app',
        '📍 Location: Pakistan'
      ]
    }
  ];

  return (
    <div className="bg-[#0A0F1E] text-white py-12 px-4 md:py-20">
      <Helmet>
        <title>Privacy Policy - AI Tools Directory | How We Protect Your Data</title>
        <meta name="description" content="Read our complete privacy policy. Learn how AI Tools Directory collects, uses and protects your personal information including Google AdSense cookies." />
        <meta name="keywords" content="privacy policy, AI tools directory privacy, data protection" />
        <meta property="og:title" content="Privacy Policy - AI Tools Directory | How We Protect Your Data" />
        <meta property="og:description" content="Read our complete privacy policy. Learn how AI Tools Directory collects, uses and protects your personal information including Google AdSense cookies." />
        <meta property="og:url" content="https://YOUR-DOMAIN.com/privacy-policy" />
        <meta name="twitter:title" content="Privacy Policy - AI Tools Directory | How We Protect Your Data" />
        <meta name="twitter:description" content="Read our complete privacy policy. Learn how AI Tools Directory collects, uses and protects your personal information including Google AdSense cookies." />
      </Helmet>
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-gray-500 font-medium">Last Updated: April 2026</p>
        </div>

        <div className="space-y-8">
          {sections.map((section) => (
            <div key={section.id} className="p-8 rounded-3xl bg-[#111827] border border-gray-800">
              <div className="flex items-start space-x-4">
                <span className="text-2xl font-black text-purple-500">{section.id}.</span>
                <div className="flex-1">
                  <h2 className="text-xl font-bold mb-4 text-purple-400">{section.title}</h2>
                  
                  {section.content && <p className="text-gray-400 leading-relaxed mb-4">{section.content}</p>}
                  
                  {section.items && (
                    <ul className="space-y-2 mb-4">
                      {section.items.map((item, i) => (
                        <li key={i} className="text-gray-400 flex items-center">
                          <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-3"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}

                  {section.subsections && section.subsections.map((sub, i) => (
                    <div key={i} className="mt-4">
                      <div className="text-sm font-bold text-gray-300 mb-2">{sub.label}</div>
                      <ul className="space-y-2">
                        {sub.items.map((item, j) => (
                          <li key={j} className="text-gray-400 pl-4 border-l border-gray-800">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}

                  {section.extra && <p className="text-sm italic text-gray-500 mt-4">{section.extra}</p>}
                  
                  {section.details && (
                    <div className="mt-4 space-y-2">
                      {section.details.map((detail, i) => (
                        <div key={i} className="text-gray-300 font-medium">{detail}</div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
