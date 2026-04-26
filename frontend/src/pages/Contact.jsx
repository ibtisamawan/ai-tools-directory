import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import FAQ from '../components/FAQ';

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

  const contactFaqs = [
    { q: 'How do I submit an AI tool?', a: 'Click Submit Tool in navbar and fill the form. We review within 48hrs.' },
    { q: 'Is AI Tools Directory free?', a: 'Yes! 100% free forever. No account needed.' },
    { q: 'How often are new tools added?', a: 'We add new tools every week.' },
    { q: 'Can I advertise on your site?', a: 'Yes! Contact us for advertising options at mibtisam097@gmail.com.' },
    { q: 'How do I report incorrect info?', a: 'Use contact form with subject "Report an Issue".' },
    { q: 'Do you have an API?', a: 'API coming soon! Contact us for early access.' },
  ];

  return (
    <div className="bg-[#0A0F1E] text-white py-20 px-4">
      <Helmet>
        <title>Contact Us - AI Tools Directory | Support & Inquiries</title>
        <meta name="description" content="Contact the AI Tools Directory team for support, tool submissions, advertising inquiries, or partnership opportunities. We reply within 24 hours." />
      </Helmet>
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          {/* Left Side - Form */}
          <div>
            <h1 className="text-4xl font-black mb-2 uppercase tracking-tighter">Get in <span className="text-purple-400">Touch</span></h1>
            <p className="text-gray-400 mb-8">We usually reply within 24 hours.</p>

            {success ? (
              <div className="p-8 rounded-3xl bg-green-500/10 border border-green-500/50 text-green-400">
                <div className="text-xl font-bold mb-2">✅ Message sent successfully!</div>
                <p>Thank you for reaching out. We will get back to you shortly.</p>
                <button 
                  onClick={() => setSuccess(false)}
                  className="mt-6 px-6 py-2 bg-green-500 text-white rounded-xl font-bold hover:bg-green-400 transition-colors"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    className="w-full px-5 py-4 bg-[#111827] border border-gray-800 rounded-2xl focus:border-purple-500 focus:outline-none transition-all"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="john@example.com"
                    className="w-full px-5 py-4 bg-[#111827] border border-gray-800 rounded-2xl focus:border-purple-500 focus:outline-none transition-all"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Subject</label>
                  <select
                    className="w-full px-5 py-4 bg-[#111827] border border-gray-800 rounded-2xl focus:border-purple-500 focus:outline-none transition-all appearance-none"
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
                  <label className="block text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Your Message</label>
                  <textarea
                    required
                    rows="5"
                    placeholder="How can we help you?"
                    className="w-full px-5 py-4 bg-[#111827] border border-gray-800 rounded-2xl focus:border-purple-500 focus:outline-none transition-all resize-none"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black rounded-2xl transition-all shadow-xl shadow-purple-600/20 disabled:opacity-50 uppercase tracking-widest"
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>

          {/* Right Side - Info */}
          <div className="space-y-8">
            <h2 className="text-2xl font-black mb-6 uppercase tracking-tight">Contact <span className="text-purple-400">Info</span></h2>
            
            <div className="grid grid-cols-1 gap-6">
              <div className="p-8 rounded-[2rem] bg-[#111827] border border-gray-800 hover:border-purple-500/30 transition-all">
                <div className="text-purple-400 font-black uppercase text-xs tracking-[0.2em] mb-2">📧 Email Us</div>
                <a href="mailto:mibtisam097@gmail.com" className="text-xl font-bold text-gray-200 hover:text-white transition-colors">
                  mibtisam097@gmail.com
                </a>
              </div>
              <div className="p-8 rounded-[2rem] bg-[#111827] border border-gray-800 hover:border-purple-500/30 transition-all">
                <div className="text-purple-400 font-black uppercase text-xs tracking-[0.2em] mb-2">📍 Based In</div>
                <div className="text-xl font-bold text-gray-200">Abbottabad, Pakistan 🇵🇰</div>
              </div>
              <div className="p-8 rounded-[2rem] bg-[#111827] border border-gray-800 hover:border-purple-500/30 transition-all">
                <div className="text-purple-400 font-black uppercase text-xs tracking-[0.2em] mb-2">⏰ Response Time</div>
                <div className="text-xl font-bold text-gray-200">Within 24 Hours</div>
              </div>
            </div>

            <div className="p-8 rounded-[2rem] bg-gradient-to-br from-purple-900/20 to-indigo-900/20 border border-purple-500/20">
              <h3 className="text-lg font-bold mb-4">Follow Our Journey</h3>
              <div className="flex flex-wrap gap-3">
                <a href="https://www.instagram.com/i.awannn/" target="_blank" rel="noopener noreferrer" className="px-6 py-2 bg-[#111827] border border-gray-800 rounded-xl text-sm font-bold hover:border-purple-500 transition-all">Instagram</a>
                <a href="https://www.linkedin.com/in/malik-ibtisam-awan-458b93265/" target="_blank" rel="noopener noreferrer" className="px-6 py-2 bg-[#111827] border border-gray-800 rounded-xl text-sm font-bold hover:border-purple-500 transition-all">LinkedIn</a>
                <a href="https://github.com/ibtisamawan" target="_blank" rel="noopener noreferrer" className="px-6 py-2 bg-[#111827] border border-gray-800 rounded-xl text-sm font-bold hover:border-purple-500 transition-all">GitHub</a>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="pt-20 border-t border-gray-800">
           <FAQ title="Contact Page FAQ" faqs={contactFaqs} />
        </div>
      </div>
    </div>
  );
};

export default Contact;
