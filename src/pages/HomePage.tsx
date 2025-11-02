// ========== src/pages/HomePage.tsx ==========
import { useState } from "react";
import {
  Star,
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
  Gamepad2,
  Cpu,
  Shield,
  CheckCircle,
  Image,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Video
} from 'lucide-react';
import backgroundVideo from "../assets/Start.mp4";
import AstraLogo from "../assets/astra.png";
import DiscordIcon from "../assets/DS.svg";
import VkIcon from "../assets/Vk.svg";
import YoutubeIcon from "../assets/Youtobe.svg";
import TelegramIcon from "../assets/telega.svg";

function HomePage() {
  const [copied, setCopied] = useState(false);
  const [currentGalleryImage, setCurrentGalleryImage] = useState(0);
  const [galleryTab, setGalleryTab] = useState<'screenshots' | 'videos'>('screenshots');

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
    { value: "5,000+", label: "Игроков онлайн" },
    { value: "24/7", label: "Работа сервера" },
    { value: "99.8%", label: "Uptime" },
    { value: "512", label: "Слотов" }
  ];

  // Данные для фич
  const featuresData = [
    {
      icon: <Gamepad2 size={32} />,
      title: "Реалистичный геймплей",
      description: "Продвинутая экономическая система и глубокие механики RP. Уникальные профессии, динамическая экономика и полноценная система бизнесов."
    },
    {
      icon: <Users size={32} />,
      title: "Активное сообщество",
      description: "Тысячи игроков онлайн 24/7, регулярные ивенты, турниры и конкурсы. Дружелюбная атмосфера и активная поддержка новичков."
    },
    {
      icon: <Cpu size={32} />,
      title: "Современные технологии",
      description: "Оптимизированные серверы с низкой задержкой, кастомные скрипты, улучшенная графика и стабильная работа без лагов."
    },
    {
      icon: <Shield size={32} />,
      title: "Защита от читеров",
      description: "Многоуровневая система античита с мониторингом 24/7, автоматический бан читеров и активная администрация."
    },
    {
      icon: <Rocket size={32} />,
      title: "Регулярные обновления",
      description: "Постоянное развитие сервера с новыми функциями, исправлениями и улучшениями. Ваше мнение важно для нас!"
    },
    {
      icon: <CheckCircle size={32} />,
      title: "Уникальный контент",
      description: "Эксклюзивные локации, кастомные машины, оружие и одежда. Сотни часов контента для полного погружения в RP."
    }
  ];

  // Данные для галереи скриншотов
  const galleryImages = [
    { id: 1, title: "Городской центр", description: "Современный мегаполис с активной жизнью" },
    { id: 2, title: "Криминальный район", description: "Темные улицы под контролем банд" },
    { id: 3, title: "Элитный район", description: "Роскошные особняки и виллы" },
    { id: 4, title: "Промзона", description: "Индустриальные локации для бизнеса" },
    { id: 5, title: "Пригород", description: "Спокойные районы для семьи" },
    { id: 6, title: "Пляж", description: "Отдых и развлечения на побережье" },
    { id: 7, title: "Горы", description: "Природные локации и скрытые места" },
    { id: 8, title: "Аэропорт", description: "Транспортный узел сервера" }
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

  // Карта сервера - основные локации
  const mapLocations = [
    { id: 1, name: "Центр города", x: 50, y: 50, description: "Основной торговый и деловой район" },
    { id: 2, name: "LSPD", x: 30, y: 60, description: "Штаб полиции Лос-Сантоса" },
    { id: 3, name: "EMS", x: 60, y: 40, description: "Медицинская служба" },
    { id: 4, name: "Порт", x: 80, y: 70, description: "Морской транспортный узел" },
    { id: 5, name: "Аэропорт", x: 90, y: 20, description: "Международный аэропорт" },
    { id: 6, name: "Казино", x: 70, y: 50, description: "Развлекательный комплекс" },
    { id: 7, name: "Тюрьма", x: 20, y: 80, description: "Исправительное учреждение" },
    { id: 8, name: "Автосалон", x: 40, y: 30, description: "Покупка транспорта" }
  ];

  const nextGalleryImage = () => {
    setCurrentGalleryImage((prev) => (prev + 1) % galleryImages.length);
  };

  const prevGalleryImage = () => {
    setCurrentGalleryImage((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
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
          <div className="badge">
            <Star size={16} />
            ЛУЧШИЙ RP СЕРВЕР 2025
          </div>
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
          
          <div className="hero-stats fade-in delay-3">
            {statsData.map((stat, index) => (
              <div key={index} className="stat">
                <div className="stat-number">{stat.value}</div>
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

          {/* Секция "О проекте" */}
          <section id="about" className="about-section">
            <div className="section-container">
              <div className="section-header">
                <h2 className="section-title">Почему выбирают ASTRA RP?</h2>
                <p className="section-subtitle">
                  Мы создали проект, в котором каждый игрок почувствует себя частью большого живого мира. 
                  Более 5000 активных игроков ежедневно, стабильная работа 24/7 и постоянно развивающийся контент.
                </p>
              </div>
              
              <div className="features-grid">
                {featuresData.map((feature, index) => (
                  <div key={index} className="feature-card">
                    <div className="feature-icon">
                      {feature.icon}
                    </div>
                    <h3>{feature.title}</h3>
                    <p>{feature.description}</p>
                  </div>
                ))}
              </div>

              {/* Дополнительная информация о сервере */}
              <div className="about-additional" style={{ marginTop: '4rem', padding: '2rem', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '1rem', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#fff' }}>Что делает ASTRA RP особенным?</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>
                  <div>
                    <h4 style={{ color: '#ff1e1e', marginBottom: '0.5rem', fontSize: '1.1rem' }}>Уникальная экономика</h4>
                    <p style={{ color: '#94a3b8', lineHeight: '1.6' }}>Реалистичная система бизнесов, недвижимости и транспорта. Зарабатывайте честным трудом или создайте криминальную империю!</p>
                  </div>
                  <div>
                    <h4 style={{ color: '#ff1e1e', marginBottom: '0.5rem', fontSize: '1.1rem' }}>Разнообразие профессий</h4>
                    <p style={{ color: '#94a3b8', lineHeight: '1.6' }}>Более 50 уникальных профессий: от простого водителя до владельца крупного бизнеса. Каждая профессия имеет свою механику и возможности.</p>
                  </div>
                  <div>
                    <h4 style={{ color: '#ff1e1e', marginBottom: '0.5rem', fontSize: '1.1rem' }}>Активные ивенты</h4>
                    <p style={{ color: '#94a3b8', lineHeight: '1.6' }}>Регулярные события, турниры, розыгрыши призов и специальные акции. Никогда не бывает скучно на ASTRA RP!</p>
                  </div>
                </div>
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
                  <button className="btn-single btn-buy">
                    <ShoppingCart size={16} />
                    КУПИТЬ
                  </button>
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
                <button className="btn-single btn-download">
                  <Download size={16} />
                  СКАЧАТЬ
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
                  <a href="https://discord.gg/astra-rp" className="social-link-single" target="_blank" rel="noopener noreferrer">
                    <div className="social-icon-wrapper">
                      <img src={DiscordIcon} alt="Discord" width={252} height={92} />
                    </div>
                  </a>

                  <a href="https://vk.com/astra-rp" className="social-link-single" target="_blank" rel="noopener noreferrer">
                    <div className="social-icon-wrapper">
                      <img src={VkIcon} alt="VKontakte" width={252} height={92} />
                    </div>
                  </a>

                  <a href="https://youtube.com/astra-rp" className="social-link-single" target="_blank" rel="noopener noreferrer">
                    <div className="social-icon-wrapper">
                      <img  src={YoutubeIcon} alt="YouTube" width={252} height={92} />
                    </div>
                  </a>

                  <a href="https://t.me/astra-rp" className="social-link-single" target="_blank" rel="noopener noreferrer">
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
                  <div className="gallery-container">
                    <button className="gallery-nav-btn gallery-prev" onClick={prevGalleryImage} aria-label="Предыдущее изображение" title="Предыдущее изображение">
                      <ChevronLeft size={24} />
                    </button>
                    
                    <div className="gallery-main">
                      <div className="gallery-item active">
                        <div className="gallery-image-placeholder">
                          <Image size={64} />
                          <span>{galleryImages[currentGalleryImage].title}</span>
                        </div>
                        <div className="gallery-item-info">
                          <h3>{galleryImages[currentGalleryImage].title}</h3>
                          <p>{galleryImages[currentGalleryImage].description}</p>
                        </div>
                      </div>
                    </div>

                    <button className="gallery-nav-btn gallery-next" onClick={nextGalleryImage} aria-label="Следующее изображение" title="Следующее изображение">
                      <ChevronRight size={24} />
                    </button>
                  </div>

                  <div className="gallery-thumbnails">
                    {galleryImages.map((img, index) => (
                      <div
                        key={img.id}
                        className={`gallery-thumbnail ${index === currentGalleryImage ? 'active' : ''}`}
                        onClick={() => setCurrentGalleryImage(index)}
                      >
                        <div className="thumbnail-placeholder">
                          <Image size={20} />
                        </div>
                        <span>{img.title}</span>
                      </div>
                    ))}
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
                      <ChevronLeft size={24} />
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
                      <ChevronRight size={24} />
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

          {/* Карта сервера */}
          <section id="map" className="map-section">
            <div className="section-container">
              <div className="section-header">
                <div className="section-icon">
                  <MapPin size={32} />
                </div>
                <h2 className="section-title">Карта сервера</h2>
                <p className="section-subtitle">
                  Исследуйте основные локации нашего игрового мира
                </p>
              </div>

              <div className="map-container">
                <div className="map-image">
                  <div className="map-placeholder">
                    <MapPin size={64} />
                    <span>Интерактивная карта сервера</span>
                  </div>
                  
                  {mapLocations.map((location) => (
                    <div
                      key={location.id}
                      className="map-marker"
                      style={{
                        left: `${location.x}%`,
                        top: `${location.y}%`
                      }}
                      title={location.name}
                    >
                      <MapPin size={24} />
                      <div className="map-marker-tooltip">
                        <h4>{location.name}</h4>
                        <p>{location.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="map-legend">
                  <h3>Основные локации</h3>
                  <div className="map-locations-list">
                    {mapLocations.map((location) => (
                      <div key={location.id} className="map-location-item">
                        <MapPin size={16} />
                        <div>
                          <strong>{location.name}</strong>
                          <p>{location.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
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
                    <h3>Как работает донат на сервере?</h3>
                    <p>Донат позволяет пополнить игровой счет и получить игровую валюту. Все платежи обрабатываются автоматически и безопасно. Средства зачисляются мгновенно после подтверждения платежа. Подробнее на странице пополнения счета.</p>
                  </div>

                  <div className="faq-item-single">
                    <h3>Какие требования к компьютеру?</h3>
                    <p>Для комфортной игры на Astra RP требуется компьютер с GTA V, которая способна работать на средних настройках. Сервер оптимизирован и работает стабильно даже на слабых системах благодаря нашей инфраструктуре.</p>
                  </div>

                  <div className="faq-item-single">
                    <h3>Есть ли поддержка на сервере?</h3>
                    <p>Да! Наша команда поддержки работает 24/7 и готова помочь вам с любыми вопросами. Вы можете связаться с нами через Discord, форум или систему поддержки в игре. Мы всегда рады помочь!</p>
                  </div>

                  <div className="faq-item-single">
                    <h3>Как стать частью команды сервера?</h3>
                    <p>Мы постоянно ищем активных и ответственных игроков для пополнения команды администрации, модераторов и разработчиков. Если вы хотите помочь развитию проекта, свяжитесь с нами через Discord или форум!</p>
                  </div>
               
                </div>
              </div>
            </div>
          </section>

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
                <a href="https://discord.gg/astra-rp" className="social-icon" title="Discord" target="_blank" rel="noopener noreferrer">
                  <img src={DiscordIcon} alt="Discord" />
                </a>
                <a href="https://vk.com/astra-rp" className="social-icon" title="VK" target="_blank" rel="noopener noreferrer">
                  <img src={VkIcon} alt="VKontakte" />
                </a>
                <a href="https://youtube.com/astra-rp" className="social-icon" title="YouTube" target="_blank" rel="noopener noreferrer">
                  <img src={YoutubeIcon} alt="YouTube" />
                </a>
                <a href="https://t.me/astra-rp" className="social-icon" title="Telegram" target="_blank" rel="noopener noreferrer">
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
                  <li><a href="https://discord.gg/astra-rp" target="_blank" rel="noopener noreferrer">Discord сервер</a></li>
                  <li><a href="https://forum.astra-rp.fun" target="_blank" rel="noopener noreferrer">Форум</a></li>
                  <li><a href="#">База знаний</a></li>
                  <li><a href="#">Поддержка</a></li>
                </ul>
              </div>

              <div className="footer-column">
                <h4>Правовая информация</h4>
                <ul className="footer-links">
                  <li><a href="https://forum.astra-rp.fun" target="_blank" rel="noopener noreferrer">Правила сервера</a></li>
                  <li><a href="#">Политика конфиденциальности</a></li>
                  <li><a href="#">Пользовательское соглашение</a></li>
                  <li><a href="#">Контакты</a></li>
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
            </div>
            <div className="footer-badges">
              <div className="badge">18+</div>
              <div className="badge">RP</div>
              <div className="badge">GTA V</div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default HomePage;

