// ========== components/HowToPlayExact.tsx ==========
import { useState } from "react";
import { ShoppingCart, Download, Server, Copy, CheckCircle2, Play, Users, MessageCircle, Send } from 'lucide-react';

const HowToPlayExact = () => {
  const [copied, setCopied] = useState(false);

  const copyServerAddress = () => {
    navigator.clipboard.writeText('connect astrapp.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="how-to-play-exact">
      <div className="section-container-exact">
        {/* Заголовок */}
        <div className="how-to-play-header-exact">
          <h1>КАК НАЧАТЬ ИГРАТЬ?</h1>
          <p>Всего два простых шага и ты готов к игры!</p>
        </div>

        <div className="steps-grid-exact">
          {/* Шаг 1 - Купить GTA V */}
          <div className="step-exact">
            <div className="step-content-exact">
              <h3>Купи Grand Theft Auto V Legacy</h3>
              <p>Если у вас еще нет лицензионной версии</p>
            </div>
            <div className="price-action-exact">
              <div className="price-exact">1000 ₽</div>
              <button className="step-btn-exact buy-exact">
                <ShoppingCart size={16} />
                КУПИТЬ
              </button>
            </div>
          </div>

          {/* Шаг 2 - Скачать RAGE MP */}
          <div className="step-exact">
            <div className="step-content-exact">
              <h3>Скачай Rage MP</h3>
              <p>Самый быстрый способ начать играть.</p>
            </div>
            <button className="step-btn-exact download-exact">
              <Download size={16} />
              СКАЧАТЬ
            </button>
          </div>
        </div>

        {/* Дополнительная информация */}
        <div className="additional-info-exact">
          <div className="info-block-exact">
            <p>Вопросы или проблемы? Посмотри видеоинструкцию.</p>
            <button className="video-btn-exact">
              <Play size={16} />
              Видеоинструкция
            </button>
          </div>

          <div className="server-address-exact">
            <div className="address-content-exact">
              <Server size={16} />
              <code>connect astrapp.com</code>
            </div>
            <button 
              className={`copy-btn-exact ${copied ? 'copied' : ''}`}
              onClick={copyServerAddress}
            >
              {copied ? <CheckCircle2 size={16} /> : <Copy size={16} />}
              {copied ? 'Скопировано!' : 'Копировать'}
            </button>
          </div>
        </div>

        {/* Социальные сети */}
        <div className="social-section-exact">
          <div className="social-header-exact">
            <Users size={18} />
            <h3>ДВИГАЙСЯ С НАМИ</h3>
          </div>
          <p className="social-subtitle-exact">Узнавай первым об акциях и новостях</p>
          
          <div className="social-row">
            <a href="#" className="social-link-exact">
              <MessageCircle size={16} />
              Discord
            </a>
            <a href="#" className="social-link-exact">
              <Users size={16} />
              VKONTAKTE
            </a>
            <a href="#" className="social-link-exact">
              <Play size={16} />
              YouTube
            </a>
            <a href="#" className="social-link-exact">
              <Send size={16} />
              Telegram
            </a>
          </div>

          <p className="partner-text-exact">
            Хочешь стать юш-партнёром? <a href="#" className="partner-link-exact">Напиши нам!</a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowToPlayExact;