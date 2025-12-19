import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, type FC } from "react";
import "./App.css";
import AstraLogo from "./assets/Astra.svg";
import HomePage from "./pages/HomePage";
import DonatePage from "./pages/DonatePage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import OfferAgreement from "./pages/OfferAgreement";
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
  };

  return (
    <>
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

        {/* Навигация показывается ТОЛЬКО на секции hero */}
        {showHeaderNav && (
          <div className="nav-links">
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
            >
              <Newspaper size={18} />
              Форум
            </a>
            <a
              href="https://t.me/astrarp5"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle size={18} />
              Discord
            </a>
          </div>
        )}

        {/* Кнопка "Пополнить счёт" — всегда видна */}
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
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/offer-agreement" element={<OfferAgreement />} />
      </Routes>
    </div>
  );
};

export default App;