
// ========== src/App.tsx ==========
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import AstraLogo from "./assets/astra.png";
import HomePage from "./pages/HomePage";
import DonatePage from "./pages/DonatePage";

// Импорт иконок из lucide-react
import { 
  Home,
  Info,
  Gamepad,
  Newspaper,
  MessageCircle,
  Gem
} from 'lucide-react';

function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY || document.documentElement.scrollTop;
      setIsScrolled(scrollPosition > 50);
    };

    // Если мы не на главной странице, navbar всегда должен быть с фоном
    if (location.pathname !== '/') {
      setIsScrolled(true);
    } else {
      window.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (location.pathname === '/') {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, [location.pathname]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const scrollToSection = (sectionId: string) => {
    closeMobileMenu();
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="logo" onClick={() => { navigate('/'); closeMobileMenu(); }} style={{ cursor: 'pointer' }}>
          <img src={AstraLogo} alt="ASTRA RP" />
        </div>
        <div className={`nav-links ${isMobileMenuOpen ? 'open' : ''}`}>
          <a href="#" onClick={(e) => { e.preventDefault(); navigate('/'); scrollToSection('hero'); }}>
            <Home size={18} />
            Главная
          </a>
          <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>
            <Info size={18} />
            О Проекте
          </a>
          <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('how-to-play'); }}>
            <Gamepad size={18} />
            Как играть
          </a>
          <a href="https://forum.astra-rp.fun" target="_blank" rel="noopener noreferrer" onClick={closeMobileMenu}>
            <Newspaper size={18} />
            Форум
          </a>
          <a href="https://discord.gg/astra-rp" target="_blank" rel="noopener noreferrer" onClick={closeMobileMenu}>
            <MessageCircle size={18} />
            Discord
          </a>
          <button className="donate-btn mobile" onClick={() => { navigate('/donate'); closeMobileMenu(); }}>
            <Gem size={18} />
            Пополнить счёт
          </button>
        </div>
        <button className="donate-btn desktop" onClick={() => navigate('/donate')}>
          <Gem size={18} />
          Пополнить счёт
        </button>
        <button 
          className={`burger-menu ${isMobileMenuOpen ? 'open' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>
      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={closeMobileMenu}></div>
      )}
    </>
  );
}

function App() {
  return (
    <div className="app">
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/donate" element={<DonatePage />} />
      </Routes>
    </div>
  );
}

export default App;
