import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
    }, 1500);
  };

  const faqs = [
    { q: 'How do I submit an AI tool?', a: 'Click Submit Tool in navbar and fill the form. We review within 48hrs.' },
    { q: 'Is AI Tools Directory free?', a: 'Yes! 100% free forever. No account needed.' },
    { q: 'How often are new tools added?', a: 'We add new tools every week.' },
    { q: 'Can I advertise on your site?', a: 'Yes! Contact us for advertising options.' },
    { q: 'How do I report incorrect info?', a: 'Use contact form with subject "Report an Issue".' },
    { q: 'Do you have an API?', a: 'API coming soon! Contact us for early access.' },
  ];

  return (
    <div className="bg-[#0A0F1E] text-white py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          {/* Left Side - Form */}
          <div>
            <h1 className="text-4xl font-bold mb-2">Get in Touch</h1>
            <p className="text-gray-400 mb-8">We reply within 24 hours</p>

            {success ? (
              <div className="p-6 rounded-2xl bg-green-500/10 border border-green-500/50 text-green-400">
                <div className="text-xl font-bold mb-2">✅ Message sent successfully!</div>
                <p>We will reply within 24 hours.</p>
                <button 
                  onClick={() => setSuccess(false)}
                  className="mt-4 text-sm underline font-bold"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    className="w-full px-5 py-4 bg-[#111827] border border-gray-800 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="your@email.com"
                    className="w-full px-5 py-4 bg-[#111827] border border-gray-800 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Subject *</label>
                  <select
                    className="w-full px-5 py-4 bg-[#111827] border border-gray-800 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  >
                    <option>General Inquiry</option>
                    <option>Submit an AI Tool</option>
                    <option>Report an Issue</option>
                    <option>Partnership Opportunity</option>
                    <option>Advertising Inquiry</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Message *</label>
                  <textarea
                    required
                    rows="6"
                    placeholder="Write your message here..."
                    className="w-full px-5 py-4 bg-[#111827] border border-gray-800 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-purple-600/20 disabled:opacity-50"
                >
                  {loading ? 'Sending...' : 'Send Message 📨'}
                </button>
              </form>
            )}
          </div>

          {/* Right Side - Info */}
          <div className="space-y-8">
            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
            
            <div className="grid grid-cols-1 gap-6">
              <div className="p-6 rounded-2xl bg-[#111827] border border-gray-800">
                <div className="text-purple-400 font-bold mb-1">📧 Email Us</div>
                <a href="mailto:mibtisam097@gmail.com" className="text-gray-300 hover:text-purple-400 transition-colors">
                  mibtisam097@gmail.com
                </a>
              </div>
              <div className="p-6 rounded-2xl bg-[#111827] border border-gray-800">
                <div className="text-purple-400 font-bold mb-1">🌐 Website</div>
                <div className="text-gray-300">ai-tools-directory-orpin.vercel.app</div>
              </div>
              <div className="p-6 rounded-2xl bg-[#111827] border border-gray-800">
                <div className="text-purple-400 font-bold mb-1">📍 Based In</div>
                <div className="text-gray-300">Abbottabad, Pakistan 🇵🇰</div>
              </div>
              <div className="p-6 rounded-2xl bg-[#111827] border border-gray-800">
                <div className="text-purple-400 font-bold mb-1">⏰ Response Time</div>
                <div className="text-gray-300">Within 24 hours</div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Follow Us</h3>
              <div className="flex flex-wrap gap-4">
                {['𝕏 Twitter', '💼 LinkedIn', '🐙 GitHub'].map(social => (
                  <button key={social} className="px-6 py-2 border border-gray-800 rounded-full text-sm hover:border-purple-500 transition-all">
                    {social}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="pt-20 border-t border-gray-800">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {faqs.map((faq, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-[#111827]/50 border border-gray-800/50">
                <div className="text-lg font-bold text-purple-400 mb-2">Q: {faq.q}</div>
                <div className="text-gray-400">A: {faq.a}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
