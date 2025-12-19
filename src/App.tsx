import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, type FC } from "react";
import "./App.css";
import AstraLogo from "./assets/Astra.svg";
import HomePage from "./pages/HomePage";
import DonatePage from "./pages/DonatePage";
<<<<<<< HEAD
import LegalPage from "./pages/LegalPage";
=======
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import OfferAgreement from "./pages/OfferAgreement";
>>>>>>> f16f0afe5dbd959c5d6e093b7b78aad7c14252f6
import {
  Home,
  Info,
  Gamepad,
  Newspaper,
  MessageCircle,
  Gem
} from "lucide-react";

interface NavigationProps {}

const Navigation: FC<NavigationProps> = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [showHeaderNav, setShowHeaderNav] = useState<boolean>(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = (): void => {
      const scrollPosition = window.scrollY || document.documentElement.scrollTop;
      setIsScrolled(scrollPosition > 50);

      if (location.pathname === "/") {
        const sections = ["hero", "about", "how-to-play", "gallery", "faq"];
        const scrollPos = window.scrollY + 200;
        let current = "hero";

        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const { offsetTop, offsetHeight } = element;
            if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
              current = section;
              break;
            }
          }
        }

        setActiveSection(current);
        
        // Хедер показывается ТОЛЬКО на секции hero
        setShowHeaderNav(current === "hero");
      }
    };

    if (location.pathname !== "/") {
      setIsScrolled(true);
      setShowHeaderNav(false);
    } else {
      window.addEventListener("scroll", handleScroll);
      handleScroll();
    }

    return () => {
      if (location.pathname === "/") {
        window.removeEventListener("scroll", handleScroll);
      }
      // Восстанавливаем скролл при размонтировании
      document.body.style.overflow = '';
    };
  }, [location.pathname]);

  const scrollToSection = (sectionId: string): void => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleLogoClick = (): void => {
    navigate("/");
  };

  const handleDonateClick = (): void => {
    navigate("/donate");
  };

  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string): void => {
    e.preventDefault();
    scrollToSection(sectionId);
    setIsMobileMenuOpen(false);
    document.body.style.overflow = '';
  };

  const toggleMobileMenu = (): void => {
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);
    // Блокируем скролл body при открытом меню
    if (newState) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  return (
    <>
      {/* Мобильное меню оверлей */}
      {isMobileMenuOpen && (
        <div 
          className="mobile-menu-overlay" 
          onClick={toggleMobileMenu}
        />
      )}

      {/* HEADER */}
      <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
        <div 
          className="logo" 
          onClick={handleLogoClick}
          style={{ cursor: "pointer" }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleLogoClick();
            }
          }}
        >
          <img src={AstraLogo} alt="ASTRA RP" />
        </div>

        {/* Бургер меню для мобильных */}
        <button 
          className={`burger-menu ${isMobileMenuOpen ? "open" : ""}`}
          onClick={toggleMobileMenu}
          aria-label="Меню"
          type="button"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Навигация показывается ТОЛЬКО на секции hero */}
        {showHeaderNav && (
          <div className={`nav-links ${isMobileMenuOpen ? "open" : ""}`}>
            <a
              href="#hero"
              className={activeSection === "hero" ? "active" : ""}
              onClick={(e) => handleNavLinkClick(e, "hero")}
            >
              <Home size={18} />
              Главная
            </a>
            <a
              href="#about"
              className={activeSection === "about" ? "active" : ""}
              onClick={(e) => handleNavLinkClick(e, "about")}
            >
              <Info size={18} />
              О проекте
            </a>
            <a
              href="#how-to-play"
              className={activeSection === "how-to-play" ? "active" : ""}
              onClick={(e) => handleNavLinkClick(e, "how-to-play")}
            >
              <Gamepad size={18} />
              Как играть
            </a>
            <a
              href="https://forum.astra-rp.fun"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                setIsMobileMenuOpen(false);
                document.body.style.overflow = '';
              }}
            >
              <Newspaper size={18} />
              Форум
            </a>
            <a
              href="https://t.me/astrarp5"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                setIsMobileMenuOpen(false);
                document.body.style.overflow = '';
              }}
            >
              <MessageCircle size={18} />
              Discord
            </a>
            <button 
              className="donate-btn mobile" 
              onClick={() => {
                handleDonateClick();
                setIsMobileMenuOpen(false);
                document.body.style.overflow = '';
              }}
              type="button"
            >
              <Gem size={18} />
              Пополнить счёт
            </button>
          </div>
        )}

        {/* Кнопка "Пополнить счёт" — всегда видна на десктопе */}
        <button 
          className="donate-btn desktop" 
          onClick={handleDonateClick}
          type="button"
        >
          <Gem size={18} />
          Пополнить счёт
        </button>
      </nav>
    </>
  );
};

interface AppProps {}

const App: FC<AppProps> = () => {
  return (
    <div className="app">
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/donate" element={<DonatePage />} />
<<<<<<< HEAD
        <Route path="/legal/:page?" element={<LegalPage />} />
=======
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/offer-agreement" element={<OfferAgreement />} />
>>>>>>> f16f0afe5dbd959c5d6e093b7b78aad7c14252f6
      </Routes>
    </div>
  );
};

export default App;