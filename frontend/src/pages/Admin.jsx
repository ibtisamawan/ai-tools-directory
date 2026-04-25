import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import API from '../api';
import toast from 'react-hot-toast';
import { HiTrash, HiPencil, HiCheck, HiX, HiStar, HiEye, HiClock } from 'react-icons/hi';

export default function Admin() {
  const { darkMode } = useTheme();
  const [loggedIn, setLoggedIn] = useState(false);
  const [creds, setCreds] = useState({ username: '', password: '' });
  const [tab, setTab] = useState('dashboard');
  const [stats, setStats] = useState({});
  const [tools, setTools] = useState([]);
  const [pending, setPending] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      API.get('/auth/verify').then(() => { setLoggedIn(true); fetchAll(); }).catch(() => localStorage.removeItem('adminToken'));
    }
  }, []);

  const login = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', creds);
      localStorage.setItem('adminToken', res.data.token);
      setLoggedIn(true);
      toast.success('Logged in!');
      fetchAll();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    setLoggedIn(false);
    toast.success('Logged out');
  };

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [statsRes, toolsRes, pendingRes] = await Promise.all([
        API.get('/tools/stats'),
        API.get('/tools?approved=true&limit=100'),
        API.get('/tools?approved=false&limit=100'),
      ]);
      setStats(statsRes.data.data);
      setTools(toolsRes.data.data);
      setPending(pendingRes.data.data);
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  const approveTool = async (id) => {
    try {
      await API.put(`/tools/${id}`, { approved: true, status: 'approved' });
      toast.success('Tool approved!');
      fetchAll();
    } catch (err) { toast.error('Failed'); }
  };

  const rejectTool = async (id) => {
    try {
      await API.delete(`/tools/${id}`);
      toast.success('Tool rejected and deleted');
      fetchAll();
    } catch (err) { toast.error('Failed'); }
  };

  const toggleFeatured = async (id, current) => {
    try {
      await API.put(`/tools/${id}`, { featured: !current });
      toast.success(current ? 'Unfeatured' : 'Featured!');
      fetchAll();
    } catch (err) { toast.error('Failed'); }
  };

  const deleteTool = async (id) => {
    if (!confirm('Delete this tool?')) return;
    try {
      await API.delete(`/tools/${id}`);
      toast.success('Deleted');
      fetchAll();
    } catch (err) { toast.error('Failed'); }
  };

  const inputClass = `w-full px-4 py-3 rounded-xl border-2 text-sm outline-none transition-all ${darkMode ? 'bg-dark-bg border-dark-border text-white focus:border-primary' : 'bg-white border-gray-200 focus:border-primary'}`;
  const cardClass = `rounded-2xl border p-6 ${darkMode ? 'bg-dark-card border-dark-border' : 'bg-white border-gray-200'}`;

  if (!loggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <form onSubmit={login} className={`${cardClass} max-w-sm w-full space-y-5`}>
          <div className="text-center">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">A</div>
            <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Admin Login</h1>
            <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Restricted Access</p>
          </div>
          <input type="text" placeholder="Username" value={creds.username} onChange={e => setCreds({...creds, username: e.target.value})} className={inputClass} required />
          <input type="password" placeholder="Password" value={creds.password} onChange={e => setCreds({...creds, password: e.target.value})} className={inputClass} required />
          <button type="submit" className="w-full py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold hover:shadow-lg transition-all">Login</button>
        </form>
      </div>
    );
  }

  const tabs = [
    { key: 'dashboard', label: 'Dashboard', icon: '📊' },
    { key: 'tools', label: 'Manage Tools', icon: '🔧' },
    { key: 'pending', label: `Pending (${pending.length})`, icon: '⏳' },
  ];

  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Admin Panel</h1>
        <button onClick={logout} className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${darkMode ? 'border-red-500/50 text-red-400 hover:bg-red-500/10' : 'border-red-200 text-red-600 hover:bg-red-50'}`}>Logout</button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {tabs.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${tab === t.key ? 'bg-primary text-white shadow-lg shadow-primary/25' : darkMode ? 'bg-dark-card text-gray-300 hover:bg-white/10' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'}`}>
            <span>{t.icon}</span>{t.label}
          </button>
        ))}
      </div>

      {/* Dashboard */}
      {tab === 'dashboard' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { label: 'Total Tools', value: stats.totalTools || 0, icon: '🔧', color: 'from-primary to-secondary' },
            { label: 'Featured', value: stats.featuredTools || 0, icon: '⭐', color: 'from-amber-500 to-orange-500' },
            { label: 'Pending', value: stats.pendingTools || 0, icon: '⏳', color: 'from-blue-500 to-cyan-500' },
            { label: 'Reviews', value: stats.totalReviews || 0, icon: '💬', color: 'from-pink-500 to-rose-500' },
          ].map(s => (
            <div key={s.label} className={cardClass}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-xs font-medium ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{s.label}</p>
                  <p className={`text-3xl font-bold mt-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{s.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center text-xl`}>{s.icon}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Manage Tools */}
      {tab === 'tools' && (
        <div className="space-y-3">
          {tools.map(tool => (
            <div key={tool._id} className={`${cardClass} flex items-center justify-between gap-4 flex-wrap`}>
              <div className="flex items-center gap-3 min-w-0">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${darkMode ? 'bg-white/10' : 'bg-gray-100'}`}>
                  <span className="font-bold text-primary">{tool.name?.charAt(0)}</span>
                </div>
                <div className="min-w-0">
                  <h3 className={`font-semibold text-sm truncate ${darkMode ? 'text-white' : 'text-gray-900'}`}>{tool.name}</h3>
                  <p className={`text-xs truncate ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{tool.category} • {tool.pricing}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => toggleFeatured(tool._id, tool.featured)} className={`p-2 rounded-lg transition-all ${tool.featured ? 'text-amber-400 bg-amber-500/10' : darkMode ? 'text-gray-500 hover:text-amber-400' : 'text-gray-400 hover:text-amber-500'}`} title={tool.featured ? 'Unfeature' : 'Feature'}>
                  <HiStar className="w-5 h-5" />
                </button>
                <button onClick={() => deleteTool(tool._id)} className={`p-2 rounded-lg transition-all ${darkMode ? 'text-gray-500 hover:text-red-400 hover:bg-red-500/10' : 'text-gray-400 hover:text-red-600 hover:bg-red-50'}`}>
                  <HiTrash className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pending */}
      {tab === 'pending' && (
        pending.length === 0 ? (
          <div className={`${cardClass} text-center py-16`}>
            <p className="text-4xl mb-3">✅</p>
            <p className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>No pending submissions</p>
          </div>
        ) : (
          <div className="space-y-3">
            {pending.map(tool => (
              <div key={tool._id} className={`${cardClass} flex items-center justify-between gap-4 flex-wrap`}>
                <div className="min-w-0">
                  <h3 className={`font-semibold text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>{tool.name}</h3>
                  <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{tool.website}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => approveTool(tool._id)} className="p-2 rounded-lg bg-green-500/10 text-green-400 hover:bg-green-500/20 transition-all"><HiCheck className="w-5 h-5" /></button>
                  <button onClick={() => rejectTool(tool._id)} className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all"><HiX className="w-5 h-5" /></button>
                </div>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
}
