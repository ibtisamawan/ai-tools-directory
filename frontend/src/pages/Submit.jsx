import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import API from '../api';
import toast from 'react-hot-toast';
import { HiCheckCircle } from 'react-icons/hi';


export default function Submit() {
  const { darkMode } = useTheme();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '', website: '', shortDescription: '', fullDescription: '',
    category: '', pricing: 'Free', logo: '', screenshots: '', tags: ''
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await API.get('/categories');
        if (res.data.success) {
          setCategories(res.data.data.map(c => c.name));
        }
      } catch (err) {
        console.error('Failed to fetch categories:', err);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.website || !form.category) {
      return toast.error('Please fill all required fields');
    }
    if (form.shortDescription.length > 150) {
      return toast.error('Short description must be 150 characters or less');
    }
    try {
      const payload = {
        ...form,
        screenshots: form.screenshots ? form.screenshots.split(',').map(s => s.trim()) : [],
        tags: form.tags ? form.tags.split(',').map(t => t.trim()) : [],
      };
      await API.post('/submit', payload);
      setSubmitted(true);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Submission failed');
    }
  };

  const inputClass = `w-full px-4 py-3 rounded-xl border-2 text-sm outline-none transition-all ${darkMode ? 'bg-dark-card border-dark-border text-white placeholder-gray-500 focus:border-primary' : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-primary'}`;
  const labelClass = `block text-sm font-medium mb-1.5 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`;

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className={`max-w-md w-full rounded-2xl border p-8 text-center ${darkMode ? 'bg-dark-card border-dark-border' : 'bg-white border-gray-200'}`}>
          <HiCheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Tool Submitted!</h2>
          <p className={`text-sm mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Your tool has been submitted for review. We'll notify you once it's approved.</p>
          <button onClick={() => { setSubmitted(false); setForm({ name: '', website: '', shortDescription: '', fullDescription: '', category: '', pricing: 'Free', logo: '', screenshots: '', tags: '' }); }}
            className="px-6 py-2.5 bg-gradient-to-r from-primary to-secondary text-white rounded-xl text-sm font-medium">Submit Another</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen max-w-2xl mx-auto px-4 sm:px-6 py-8">
      <h1 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Submit an AI Tool</h1>
      <p className={`text-sm mb-8 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Know an AI tool we're missing? Submit it for review.</p>

      <form onSubmit={handleSubmit} className={`rounded-2xl border p-6 sm:p-8 space-y-5 ${darkMode ? 'bg-dark-card border-dark-border' : 'bg-white border-gray-200'}`}>
        <div><label className={labelClass}>Tool Name *</label><input name="name" value={form.name} onChange={handleChange} placeholder="e.g. ChatGPT" className={inputClass} required /></div>
        <div><label className={labelClass}>Website URL *</label><input name="website" value={form.website} onChange={handleChange} placeholder="https://example.com" type="url" className={inputClass} required /></div>
        <div><label className={labelClass}>Short Description ({form.shortDescription.length}/150)</label><input name="shortDescription" value={form.shortDescription} onChange={handleChange} maxLength={150} placeholder="Brief description..." className={inputClass} /></div>
        <div><label className={labelClass}>Full Description</label><textarea name="fullDescription" value={form.fullDescription} onChange={handleChange} rows={5} placeholder="Detailed description..." className={inputClass + ' resize-none'} /></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div><label className={labelClass}>Category *</label>
            <select name="category" value={form.category} onChange={handleChange} className={inputClass} required>
              <option value="">Select category</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div><label className={labelClass}>Pricing</label>
            <select name="pricing" value={form.pricing} onChange={handleChange} className={inputClass}>
              <option value="Free">Free</option><option value="Paid">Paid</option><option value="Freemium">Freemium</option>
            </select>
          </div>
        </div>
        <div><label className={labelClass}>Logo URL</label><input name="logo" value={form.logo} onChange={handleChange} placeholder="https://example.com/logo.png" className={inputClass} /></div>
        <div><label className={labelClass}>Screenshot URLs (comma separated)</label><input name="screenshots" value={form.screenshots} onChange={handleChange} placeholder="url1, url2, url3" className={inputClass} /></div>
        <div><label className={labelClass}>Tags (comma separated)</label><input name="tags" value={form.tags} onChange={handleChange} placeholder="ai, chatbot, writing" className={inputClass} /></div>
        <button type="submit" className="w-full py-3.5 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all">Submit Tool for Review</button>
      </form>
    </div>
  );
}
