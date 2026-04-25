import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Tools from './pages/Tools';
import ToolDetail from './pages/ToolDetail';
import Category from './pages/Category';
import Submit from './pages/Submit';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Register from './pages/Register';

export default function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <Router>
          <ScrollToTop />
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 pt-28">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/tools" element={<Tools />} />
                <Route path="/tools/:id" element={<ToolDetail />} />
                <Route path="/category/:name" element={<Category />} />
                <Route path="/submit" element={<Submit />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Routes>
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
