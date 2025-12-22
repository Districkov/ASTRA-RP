// ========== src/pages/HomePage.tsx ==========
import { useState, useEffect, useRef } from "react";
import {
  ArrowDown,
  Rocket,
  BookOpen,
  Server,
  Copy,
  CheckCircle2,
  Play,
  Users,
  ShoppingCart,
  Download,
  CheckCircle,
  Image,
  ChevronLeft,
  ChevronRight,
  Video,
  TrendingUp,
  Clock,
  ShieldCheck,
  Users2,
  Building,
  Car,
  Briefcase,
  Gem
} from 'lucide-react';
import { Link } from 'react-router-dom';
import backgroundVideo from "../assets/Start.mp4";
import AstraLogo from "../assets/astra.png";
import DiscordIcon from "../assets/DS.svg";
import VkIcon from "../assets/Vk.svg";
import YoutubeIcon from "../assets/Youtobe.svg";
import TelegramIcon from "../assets/telega.svg";

// Импорты картинок для галереи
import cityCenter from "../assets/gallery/screenshots/city-center.jpg";
import criminalDistrict from "../assets/gallery/screenshots/criminal-district.jpg";
import eliteArea from "../assets/gallery/screenshots/elite-area.jpg";
import industrialZone from "../assets/gallery/screenshots/industrial-zone.jpg";
import suburb from "../assets/gallery/screenshots/suburb.jpg";
import beach from "../assets/gallery/screenshots/beach.jpg";
import mountains from "../assets/gallery/screenshots/mountains.jpg";
import airport from "../assets/gallery/screenshots/airport.jpg";

function HomePage() {
  const [copied, setCopied] = useState(false);
  const [currentGalleryImage, setCurrentGalleryImage] = useState(0);
  const [galleryTab, setGalleryTab] = useState<'screenshots' | 'videos'>('screenshots');
  const [activeSection, setActiveSection] = useState('hero');
  const [animatedStats, setAnimatedStats] = useState<{ [key: number]: number }>({});
  const [showRightMenu, setShowRightMenu] = useState(false);
  
  const statsRef = useRef<HTMLDivElement>(null);
  const aboutSectionRef = useRef<HTMLDivElement>(null);
  const animationStartedRef = useRef(false);
  const autoPlayRef = useRef<number | null>(null);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const copyServerAddress = () => {
    navigator.clipboard.writeText('connect astrapp.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Данные для статистики
  const statsData = [
    { value: 112, label: "Игроков онлайн", suffix: "+", isNumber: true },
    { value: "24/7", label: "Работа сервера", suffix: "", isNumber: false },
    { value: 512, label: "Слотов", suffix: "", isNumber: false }
  ];

  // Анимация возрастающих цифр
  useEffect(() => {
    if (!statsRef.current || animationStartedRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animationStartedRef.current) {
            animationStartedRef.current = true;
            
            const currentStats = [
              { value: 112, label: "Игроков онлайн", suffix: "+", isNumber: true },
              { value: "24/7", label: "Работа сервера", suffix: "", isNumber: false },
              { value: 512, label: "Слотов", suffix: "", isNumber: false }
            ];

            currentStats.forEach((stat, index) => {
              if (stat.isNumber && typeof stat.value === 'number') {
                const targetValue = stat.value;
                let current = 0;
                const increment = targetValue / 50;
                const duration = 2000;
                const stepTime = duration / 50;

                const timer = setInterval(() => {
                  current += increment;
                  if (current >= targetValue) {
                    current = targetValue;
                    clearInterval(timer);
                  }
                  setAnimatedStats((prev) => ({
                    ...prev,
                    [index]: Math.floor(current)
                  }));
                }, stepTime);
              }
            });
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(statsRef.current);

    return () => observer.disconnect();
  }, []);

  // Автоплей слайдера
  useEffect(() => {
    if (galleryTab === 'screenshots') {
      autoPlayRef.current = window.setInterval(() => {
        setCurrentGalleryImage((prev) => (prev + 1) % galleryImages.length);
      }, 4000); // Смена каждые 4 секунды
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
        autoPlayRef.current = null;
      }
    };
  }, [galleryTab]);

  // Отслеживание активной секции при скролле
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'how-to-play', 'gallery', 'faq'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            // Правое меню показывается ТОЛЬКО после hero
            setShowRightMenu(section !== 'hero');
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Данные для уникальных особенностей
  const uniqueFeatures = [
    {
      icon: <ShieldCheck size={32} />,
      title: "Продвинутая система античита",
      description: "Многоуровневая защита 24/7 с автоматическим баном нарушителей. Ваша игра в полной безопасности.",
      color: "#ff1e1e"
    },
    {
      icon: <TrendingUp size={32} />,
      title: "Динамическая экономика",
      description: "Реалистичные цены, инфляция, кризисы и биржевые торги. Экономика, которая живет своей жизнью.",
      color: "#10b981"
    },
    {
      icon: <Users2 size={32} />,
      title: "Система фракций",
      description: "Полиция, EMS, банды, правительство с уникальными механиками для каждой фракции.",
      color: "#3b82f6"
    },
    {
      icon: <Building size={32} />,
      title: "Недвижимость и бизнесы",
      description: "Покупайте дома, открывайте бизнесы, управляйте империей. От маленького магазина до корпорации.",
      color: "#f59e0b"
    },
    {
      icon: <Car size={32} />,
      title: "Кастомный транспорт",
      description: "Более 200 уникальных автомобилей с детальной проработкой. Тюнинг и уникальные возможности.",
      color: "#8b5cf6"
    },
    {
      icon: <Briefcase size={32} />,
      title: "50+ профессий",
      description: "От таксиста до пилота, от механика до адвоката. Каждая профессия с уникальной механикой.",
      color: "#ec4899"
    }
  ];

  // Данные для статистики проекта
  const projectStats = [
    { number: "50+", label: "уникальных профессий", icon: <Briefcase size={24} /> },
    { number: "200+", label: "кастомных транспорта", icon: <Car size={24} /> },
    { number: "1000+", label: "игровых предметов", icon: <Gem size={24} /> },
    { number: "24/7", label: "поддержка", icon: <Clock size={24} /> },
  ];

  // Данные для галереи скриншотов с реальными картинками
  const galleryImages = [
    { 
      id: 1, 
      title: "Городской центр", 
      description: "Современный мегаполис с активной жизнью",
      image: cityCenter
    },
    { 
      id: 2, 
      title: "Криминальный район", 
      description: "Темные улицы под контролем банд",
      image: criminalDistrict
    },
    { 
      id: 3, 
      title: "Элитный район", 
      description: "Роскошные особняки и виллы",
      image: eliteArea
    },
    { 
      id: 4, 
      title: "Промзона", 
      description: "Индустриальные локации для бизнеса",
      image: industrialZone
    },
    { 
      id: 5, 
      title: "Пригород", 
      description: "Спокойные районы для семьи",
      image: suburb
    },
    { 
      id: 6, 
      title: "Пляж", 
      description: "Отдых и развлечения на побережье",
      image: beach
    },
    { 
      id: 7, 
      title: "Горы", 
      description: "Природные локации и скрытые места",
      image: mountains
    },
    { 
      id: 8, 
      title: "Аэропорт", 
      description: "Транспортный узел сервера",
      image: airport
    }
  ];

  // Данные для видео геймплея
  const gameplayVideos = [
    { id: 1, title: "Обзор сервера", description: "Полное знакомство с ASTRA RP", thumbnail: "📹", youtubeId: "dQw4w9WgXcQ" },
    { id: 2, title: "Гайд для новичков", description: "Как начать играть на сервере", thumbnail: "🎮", youtubeId: "dQw4w9WgXcQ" },
    { id: 3, title: "RP моменты", description: "Лучшие ролевые ситуации", thumbnail: "🎭", youtubeId: "dQw4w9WgXcQ" },
    { id: 4, title: "Обновления сервера", description: "Что нового на ASTRA RP", thumbnail: "✨", youtubeId: "dQw4w9WgXcQ" },
    { id: 5, title: "Турниры и ивенты", description: "События и соревнования", thumbnail: "🏆", youtubeId: "dQw4w9WgXcQ" },
    { id: 6, title: "Экономика сервера", description: "Система бизнесов и работы", thumbnail: "💼", youtubeId: "dQw4w9WgXcQ" }
  ];

  const nextGalleryImage = () => {
    setCurrentGalleryImage((prev) => (prev + 1) % galleryImages.length);
    // Сбрасываем автоплей при ручном переключении
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
    autoPlayRef.current = window.setInterval(() => {
      setCurrentGalleryImage((prev) => (prev + 1) % galleryImages.length);
    }, 4000);
  };

  const prevGalleryImage = () => {
    setCurrentGalleryImage((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
    // Сбрасываем автоплей при ручном переключении
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
    autoPlayRef.current = window.setInterval(() => {
      setCurrentGalleryImage((prev) => (prev + 1) % galleryImages.length);
    }, 4000);
  };

  const goToSlide = (index: number) => {
    setCurrentGalleryImage(index);
    // Сбрасываем автоплей при ручном переключении
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
    autoPlayRef.current = window.setInterval(() => {
      setCurrentGalleryImage((prev) => (prev + 1) % galleryImages.length);
    }, 4000);
  };

  return (
    <>
      {/* Hero секция */}
      <section
        id="hero"
        className="hero"
      >
        <video 
          className="hero-video"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={backgroundVideo} type="video/mp4" />
        </video>
        <div className="hero-overlay"></div>
        <div className="content">
          <h1 className="fade-in">
            Добро пожаловать в <span className="gradient-text">ASTRA RP</span>
          </h1>
          <p className="fade-in delay-1">
            Самый атмосферный и технологичный ролевой проект на платформе GTA V. 
            Присоединяйся к сообществу, где каждый может создать свою уникальную историю.
          </p>
          <div className="hero-buttons fade-in delay-2">
            <button className="cta-btn primary" onClick={() => scrollToSection('how-to-play')}>
              <Rocket size={20} />
              Начать играть
            </button>
            <button className="cta-btn secondary" onClick={() => scrollToSection('about')}>
              <BookOpen size={20} />
              Узнать больше
            </button>
          </div>
          
          <div className="hero-stats fade-in delay-3" ref={statsRef}>
            {statsData.map((stat, index) => (
              <div key={index} className="stat">
                <div className="stat-number">
                  {stat.isNumber 
                    ? (typeof stat.value === 'number' 
                        ? `${animatedStats[index] !== undefined ? animatedStats[index] : 0}${stat.suffix}` 
                        : stat.value)
                    : stat.value}
                </div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="scroll-indicator" onClick={() => scrollToSection('about')}>
          <div className="scroll-text">Узнать больше</div>
          <ArrowDown size={20} className="scroll-arrow" />
        </div>
      </section>

      {/* Секция "О проекте" - ПЕРЕРАБОТАННАЯ */}
      <section id="about" className="about-section" ref={aboutSectionRef}>
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">ASTRA RP — НОВЫЙ СТАНДАРТ GTA ROLEPLAY</h2>
            <p className="section-subtitle">
              Самый технологичный и проработанный ролевой проект, объединяющий лучшие черты ведущих RP-серверов 
              с уникальными инновациями. Здесь каждый найдет свой путь — от законопослушного гражданина до криминального авторитета.
            </p>
          </div>
          
          {/* Уникальные особенности */}
          <div className="unique-features-grid">
            {uniqueFeatures.map((feature, index) => (
              <div key={index} className="unique-feature-card">
                <div className="feature-icon-wrapper" style={{ backgroundColor: `${feature.color}20` }}>
                  <div style={{ color: feature.color }}>
                    {feature.icon}
                  </div>
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Статистика проекта */}
          <div className="project-stats-grid">
            {projectStats.map((stat, index) => (
              <div key={index} className="project-stat-item">
                <div className="stat-icon">
                  {stat.icon}
                </div>
                <div className="stat-number-large">{stat.number}</div>
                <div className="stat-label-large">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Секция "Как начать играть" - ДВЕ КОЛОНКИ */}
      <section id="how-to-play" className="how-to-play-single-column">
        <div className="section-container-single">
          
          {/* Заголовок */}
          <div className="single-header">
            <h1>КАК НАЧАТЬ ИГРАТЬ?</h1>
            <p className="single-subtitle">Всего два простых шага и ты готов к игре!</p>
          </div>

          {/* Две колонки: слева шаги, справа соц.сети */}
          <div className="two-column-layout">
            
            {/* Левая колонка - Шаги */}
            <div className="left-column">
              {/* Шаг 1 с иконкой V */}
              <div className="single-step">
                <div className="step-content-single">
                  <div className="step-icon">
                    <CheckCircle size={20} strokeWidth={3} />
                  </div>
                  <div className="step-text">
                    <h3>Купи Grand Theft Auto V Legacy</h3>
                    <p>Если у вас еще нет лицензионной версии</p>
                  </div>
                </div>
                <div className="step-action-single">
                  <div className="price-single">1200 ₽</div>
                  <a 
                    href="https://store.steampowered.com/app/271590/Grand_Theft_Auto_V/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn-single btn-buy"
                  >
                    <ShoppingCart size={16} />
                    КУПИТЬ
                  </a>
                </div>
              </div>

              {/* Шаг 2 с иконкой V */}
              <div className="single-step">
                <div className="step-content-single">
                  <div className="step-icon">
                    <CheckCircle size={20} strokeWidth={3} />
                  </div>
                  <div className="step-text">
                    <h3>Скачай Rage MP</h3>
                    <p>Самый быстрый способ начать играть</p>
                  </div>
                </div>
                <a 
                  href="https://rage.mp/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-single btn-download"
                >
                  <Download size={16} />
                  СКАЧАТЬ
                </a>
              </div>

              {/* Адрес сервера */}
              <div className="single-server">
                <div className="server-content">
                  <Server size={16} />
                  <code>connect astrapp.com</code>
                </div>
                <button 
                  className={`btn-single btn-copy ${copied ? 'copied' : ''}`}
                  onClick={copyServerAddress}
                >
                  {copied ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                  {copied ? 'Скопировано!' : 'Копировать'}
                </button>
              </div>

              {/* Дополнительная информация */}
              <div className="single-help">
                <p className="help-text">Вопросы или проблемы? Посмотри видеоинструкцию</p>
                <button className="btn-single btn-video">
                  <Play size={16} />
                  Видеоинструкция
                </button>
              </div>
            </div>

            {/* Правая колонка - Социальные сети */}
            <div className="right-column">
              <div className="single-social">
                <div className="social-header-single">
                  <Users size={18} />
                  <h3>ДВИГАЙСЯ С НАМИ</h3>
                </div>
                <p className="social-subtitle-single">Узнавай первым об акциях и новостях</p>
                
                <div className="social-grid-single">
                  <a href="https://discord.gg/WMa32mvWhg" className="social-link-single" target="_blank" rel="noopener noreferrer">
                    <div className="social-icon-wrapper">
                      <img src={DiscordIcon} alt="Discord" width={252} height={92} />
                    </div>
                  </a>

                  <a href="https://vk.com/astra-rp" className="social-link-single" target="_blank" rel="noopener noreferrer">
                    <div className="social-icon-wrapper">
                      <img src={VkIcon} alt="VKontakte" width={252} height={92} />
                    </div>
                  </a>

                  <a href="https://www.youtube.com/@AstraRP-gta5" className="social-link-single" target="_blank" rel="noopener noreferrer">
                    <div className="social-icon-wrapper">
                      <img  src={YoutubeIcon} alt="YouTube" width={252} height={92} />
                    </div>
                  </a>

                  <a href="https://t.me/astrarp5" className="social-link-single" target="_blank" rel="noopener noreferrer">
                    <div className="social-icon-wrapper">
                      <img src={TelegramIcon} alt="Telegram" width={252} height={92} />
                    </div>
                  </a>
                </div>

                <p className="partner-text-single">
                  Хочешь стать частью команды? <a href="mailto:team@astra-rp.com" className="partner-link-single">Напиши нам!</a>
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Галерея скриншотов и видео геймплея */}
      <section id="gallery" className="gallery-section">
        <div className="section-container">
          <div className="section-header">
            <div className="section-icon">
              <Image size={32} />
            </div>
            <h2 className="section-title">Галерея и Геймплей</h2>
            <p className="section-subtitle">
              Посмотрите на красоту нашего игрового мира и погрузитесь в атмосферу сервера
            </p>
          </div>

          {/* Переключатель между скриншотами и видео */}
          <div className="gallery-tabs">
            <button 
              className={`gallery-tab ${galleryTab === 'screenshots' ? 'active' : ''}`}
              onClick={() => {
                setGalleryTab('screenshots');
                setCurrentGalleryImage(0);
              }}
            >
              <Image size={20} />
              Скриншоты
            </button>
            <button 
              className={`gallery-tab ${galleryTab === 'videos' ? 'active' : ''}`}
              onClick={() => {
                setGalleryTab('videos');
                setCurrentGalleryImage(0);
              }}
            >
              <Video size={20} />
              Видео геймплея
            </button>
          </div>

          {galleryTab === 'screenshots' ? (
            <>
              {/* СЛАЙДЕР ДЛЯ СКРИНШОТОВ */}
              <div className="slider-container">
                <div className="slider-wrapper">
                  <button 
                    className="slider-nav-btn slider-prev" 
                    onClick={prevGalleryImage}
                    aria-label="Предыдущее изображение"
                  >
                    <ChevronLeft size={32} />
                  </button>
                  
                  <div className="slider-main">
                    <div className="slider-track">
                      {galleryImages.map((image, index) => (
                        <div
                          key={image.id}
                          className={`slider-slide ${index === currentGalleryImage ? 'active' : ''} ${
                            index === currentGalleryImage - 1 ? 'prev' : ''
                          } ${
                            index === currentGalleryImage + 1 ? 'next' : ''
                          }`}
                        >
                          <img 
                            src={image.image} 
                            alt={image.title}
                            className="slider-image"
                          />
                          <div className="slider-overlay">
                            <div className="slider-content">
                              <h3>{image.title}</h3>
                              <p>{image.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button 
                    className="slider-nav-btn slider-next" 
                    onClick={nextGalleryImage}
                    aria-label="Следующее изображение"
                  >
                    <ChevronRight size={32} />
                  </button>
                </div>

                {/* Индикаторы слайдов */}
                <div className="slider-indicators">
                  {galleryImages.map((_, index) => (
                    <button
                      key={index}
                      className={`slider-indicator ${index === currentGalleryImage ? 'active' : ''}`}
                      onClick={() => goToSlide(index)}
                      aria-label={`Перейти к слайду ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="gallery-container">
                <button 
                  className="gallery-nav-btn gallery-prev" 
                  onClick={() => setCurrentGalleryImage((prev) => (prev - 1 + gameplayVideos.length) % gameplayVideos.length)}
                  aria-label="Предыдущее видео" title="Предыдущее видео"
                >
                  <ChevronLeft size={40} />
                </button>
                
                <div className="gallery-main">
                  <div className="gallery-item active">
                    <div className="gallery-video-placeholder">
                      <div className="video-thumbnail">
                        <Video size={64} />
                        <div className="video-play-overlay">
                          <Play size={48} fill="white" />
                        </div>
                        <span>{gameplayVideos[currentGalleryImage].title}</span>
                      </div>
                    </div>
                    <div className="gallery-item-info">
                      <h3>{gameplayVideos[currentGalleryImage].title}</h3>
                      <p>{gameplayVideos[currentGalleryImage].description}</p>
                      <a 
                        href={`https://www.youtube.com/watch?v=${gameplayVideos[currentGalleryImage].youtubeId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="watch-video-btn"
                      >
                        <Play size={18} />
                        Смотреть на YouTube
                      </a>
                    </div>
                  </div>
                </div>

                <button 
                  className="gallery-nav-btn gallery-next" 
                  onClick={() => setCurrentGalleryImage((prev) => (prev + 1) % gameplayVideos.length)}
                  aria-label="Следующее видео" title="Следующее видео"
                >
                  <ChevronRight size={40} />
                </button>
              </div>

              <div className="gallery-thumbnails">
                {gameplayVideos.map((video, index) => (
                  <div
                    key={video.id}
                    className={`gallery-thumbnail ${index === currentGalleryImage ? 'active' : ''}`}
                    onClick={() => setCurrentGalleryImage(index)}
                  >
                    <div className="thumbnail-placeholder video-thumbnail-icon">
                      <Video size={20} />
                      <span className="video-icon-badge">{video.thumbnail}</span>
                    </div>
                    <span>{video.title}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* FAQ секция - 3 КОЛОНКИ НА ВСЮ ШИРИНУ */}
      <section id="faq" className="faq-section">
        <div className="section-container-single">
          <div className="single-faq">
            <div className="faq-header-single">
              <h2>ОТВЕТЫ НА ЧАСТЫЕ ВОПРОСЫ</h2>
            </div>
            
            <div className="faq-grid-single">
              <div className="faq-item-single">
                <h3>Что такое Astra RP?</h3>
                <p>Это уникальный проект на базе GTA V, позволяющий тысячам игроков взаимодействовать друг с другом в реальном времени. Мы создали полноценный виртуальный мир с экономикой, профессиями и бесконечными возможностями для ролевой игры.</p>
              </div>
              
              <div className="faq-item-single">
                <h3>Как начать играть на Astra RP?</h3>
                <p>Для начала необходимо приобрести лицензионную GTA V Legacy, установить Rage MP клиент и подключиться к нашему серверу используя адрес "connect astrapp.com". После подключения пройдите регистрацию и начните свое приключение!</p>
              </div>
              
              <div className="faq-item-single">
                <h3>Что такое Role Play?</h3>
                <p>Role Play (RP) - это игровой режим, где участники создают персонажей и сценарии, а затем действуют согласно своим ролям в рамках игрового процесса. Вы можете стать полицейским, врачом, бизнесменом, преступником или кем угодно другим!</p>
              </div>
              
              <div className="faq-item-single">
                <h3>Чем заняться на сервере?</h3>
                <p>На сервере доступны десятки профессий: от таксиста и водителя до бизнесмена и политика. Вы можете покупать недвижимость, транспорт, заниматься бизнесом, участвовать в криминальной деятельности или работать на законопослушных работах. Также проводятся регулярные ивенты и турниры!</p>
              </div>

              <div className="faq-item-single">
                <h3>Где найти правила сервера?</h3>
                <p>
                  Информацию о правилах сервера, подаче жалоб на игроков и другие важные темы можно найти на 
                  <a href="https://forum.astra-rp.fun" style={{color: '#ff1e1e', textDecoration: 'none', fontWeight: '600', marginLeft: '4px'}}>
                    форуме проекта
                  </a>. Правила обязательны к соблюдению всеми игроками.
                </p>
              </div>

              <div className="faq-item-single">
                <h3>Какие требования к компьютеру?</h3>
                <p>Для комфортной игры на Astra RP требуется компьютер с GTA V, которая способна работать на средних настройках. Сервер оптимизирован и работает стабильно даже на слабых системах благодаря нашей инфраструктуре.</p>
              </div>

              <div className="faq-item-single">
                <h3>Есть ли поддержка на сервере?</h3>
                <p>Да! Наша команда поддержки работает 24/7 и готова помочь вам с любыми вопросами. Вы можете связаться с нами через Discord или форум. Мы всегда рады помочь!</p>
              </div>

              <div className="faq-item-single">
                <h3>Как стать частью команды сервера?</h3>
                <p>Мы постоянно ищем активных и ответственных игроков для пополнения команды администрации, модераторов и разработчиков. Если вы хотите помочь развитию проекта, свяжитесь с нами через форум!</p>
              </div>

              <div className="faq-item-single">
                <h3>Где найти правовую информацию?</h3>
                <p>
                  Ознакомиться с нашей 
                  <Link to="/privacy-policy" style={{color: '#ff1e1e', textDecoration: 'none', fontWeight: '600', margin: '0 4px'}}>
                    политикой конфиденциальности
                  </Link>,
                  <Link to="/terms-of-service" style={{color: '#ff1e1e', textDecoration: 'none', fontWeight: '600', margin: '0 4px'}}>
                    пользовательским соглашением
                  </Link> и 
                  <Link to="/offer-agreement" style={{color: '#ff1e1e', textDecoration: 'none', fontWeight: '600', margin: '0 4px'}}>
                    публичной офертой
                  </Link>
                  вы можете в соответствующих разделах.
                </p>
              </div>
           
            </div>
          </div>
        </div>
      </section>

      {/* Боковые уведомления с индикатором текущей секции - ПОКАЗЫВАЕТСЯ ТОЛЬКО ПОСЛЕ HERO */}
      {showRightMenu && (
        <div className="section-indicator-sidebar">
          <div className="sidebar-nav">
            <a 
              href="#hero" 
              className={`sidebar-nav-item ${activeSection === 'hero' ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); scrollToSection('hero'); }}
              title="Главная"
            >
              <div className="sidebar-nav-dot"></div>
              <span className="sidebar-nav-label">Главная</span>
            </a>
            <a 
              href="#about" 
              className={`sidebar-nav-item ${activeSection === 'about' ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}
              title="О проекте"
            >
              <div className="sidebar-nav-dot"></div>
              <span className="sidebar-nav-label">О проекте</span>
            </a>
            <a 
              href="#how-to-play" 
              className={`sidebar-nav-item ${activeSection === 'how-to-play' ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); scrollToSection('how-to-play'); }}
              title="Как играть"
            >
              <div className="sidebar-nav-dot"></div>
              <span className="sidebar-nav-label">Как играть</span>
            </a>
            <a 
              href="#gallery" 
              className={`sidebar-nav-item ${activeSection === 'gallery' ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); scrollToSection('gallery'); }}
              title="Галерея"
            >
              <div className="sidebar-nav-dot"></div>
              <span className="sidebar-nav-label">Галерея</span>
            </a>
            <a 
              href="#faq" 
              className={`sidebar-nav-item ${activeSection === 'faq' ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); scrollToSection('faq'); }}
              title="FAQ"
            >
              <div className="sidebar-nav-dot"></div>
              <span className="sidebar-nav-label">FAQ</span>
            </a>
          </div>
        </div>
      )}

      {/* Футер */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-content">
            <div className="footer-brand">
              <img src={AstraLogo} alt="ASTRA RP" className="footer-logo" />
              <p className="footer-description">
                Ведущий ролевой проект GTA V с 2023 года. 
                Мы создаём уникальный игровой опыт для каждого участника нашего сообщества.
              </p>
              <div className="social-links">
                <a href="https://discord.gg/WMa32mvWhg" className="social-icon" title="Discord" target="_blank" rel="noopener noreferrer">
                  <img src={DiscordIcon} alt="Discord" />
                </a>
                <a href="https://vk.com/astra-rp" className="social-icon" title="VK" target="_blank" rel="noopener noreferrer">
                  <img src={VkIcon} alt="VKontakte" />
                </a>
                <a href="https://www.youtube.com/@AstraRP-gta5" className="social-icon" title="YouTube" target="_blank" rel="noopener noreferrer">
                  <img src={YoutubeIcon} alt="YouTube" />
                </a>
                <a href="https://t.me/astrarp5" className="social-icon" title="Telegram" target="_blank" rel="noopener noreferrer">
                  <img src={TelegramIcon} alt="Telegram" />
                </a>
              </div>
            </div>

            <div className="footer-links-group">
              <div className="footer-column">
                <h4>Навигация</h4>
                <ul className="footer-links">
                  <li><a href="#" onClick={() => scrollToSection('hero')}>Главная</a></li>
                  <li><a href="#" onClick={() => scrollToSection('about')}>О проекте</a></li>
                  <li><a href="#" onClick={() => scrollToSection('how-to-play')}>Как играть</a></li>
                  <li><a href="/donate">Донат</a></li>
                </ul>
              </div>

              <div className="footer-column">
                <h4>Сообщество</h4>
                <ul className="footer-links">
                  <li><a href="https://discord.gg/WMa32mvWhg" target="_blank" rel="noopener noreferrer">Discord сервер</a></li>
                  <li><a href="https://forum.astra-rp.fun" target="_blank" rel="noopener noreferrer">Форум</a></li>
                </ul>
              </div>

              <div className="footer-column">
                <h4>Правовая информация</h4>
                <ul className="footer-links">
                  <li><a href="https://forum.astra-rp.fun" target="_blank" rel="noopener noreferrer">Правила сервера</a></li>
                  <li><Link to="/privacy-policy">Политика конфиденциальности</Link></li>
                  <li><Link to="/terms-of-service">Пользовательское соглашение</Link></li>
                  <li><Link to="/offer-agreement">Публичная оферта</Link></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="footer-copyright">
              <p>&copy; 2025 ASTRA RP. Все права защищены.</p>
              <p className="footer-disclaimer">
                ASTRA RP не связан с Rockstar Games, Take-Two Interactive или RAGE MP. 
                Все торговые марки принадлежат их правообладателям.
              </p>
              <p className="footer-company-info">
                <strong>ИП Сололмин Иван Витальевич</strong> | ИНН: 772593116674 | ОГРН: 325774600774297
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default HomePage;