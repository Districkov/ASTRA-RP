// ========== src/pages/DonatePage.tsx ==========
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DonatePage.css";
import { CreditCard, Mail, User, DollarSign, Shield, CheckCircle2, Loader2, AlertCircle, X } from 'lucide-react';
import DiscordIcon from "./../assets/DS.svg";
import VkIcon from "./../assets/Vk.svg";
import YoutubeIcon from "./../assets/Youtobe.svg";
import TelegramIcon from "./../assets/telega.svg";

// Типы для ответа API
interface PaymentResponse {
  success: boolean;
  paymentId?: string;
  paymentUrl?: string;
  orderId?: string;
  environment?: string;
  error?: string;
  details?: string;
  errorCode?: string;
}

function DonatePage() {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [amount, setAmount] = useState(100);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: '' });

  const exchangeRate = "1₽ = 2$ = 300 игровой валюты";

  // Конфигурация API для Vercel - ИСПРАВЛЕННЫЙ ENDPOINT
  const API_CONFIG = {
    baseUrl: 'https://astra-rp-backend.vercel.app/api',
    endpoints: {
      payment: '/payment', // Правильный endpoint
    }
  };

  // Функция для отправки платежа в API
  const processPayment = async (paymentData: any): Promise<PaymentResponse> => {
    try {
      console.log('🔄 Отправка запроса к Vercel API:', `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.payment}`);
      
      const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.payment}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });

      console.log('📊 Статус ответа:', response.status, response.statusText);

      if (!response.ok) {
        let errorText = '';
        try {
          const errorData = await response.json();
          errorText = JSON.stringify(errorData);
        } catch {
          errorText = await response.text();
        }
        
        console.error('❌ Ошибка API:', response.status, errorText);
        
        if (response.status === 500) {
          throw new Error('Внутренняя ошибка сервера платежной системы. Попробуйте позже.');
        } else {
          throw new Error(`Ошибка сервера: ${response.status}`);
        }
      }

      const result = await response.json();
      console.log('✅ Ответ от Vercel API:', result);
      return result;

    } catch (error) {
      console.error('🔥 Payment API error:', error);
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error('Не удалось подключиться к платежной системе. Проверьте соединение и попробуйте позже.');
      }
    }
  };

  const handlePayment = async () => {
    // Валидация
    if (!email || !username || !agreeTerms || !agreePrivacy) {
      setPaymentStatus({
        type: 'error',
        message: 'Заполните все обязательные поля и согласия!'
      });
      setTimeout(() => setPaymentStatus({ type: null, message: '' }), 5000);
      return;
    }

    if (amount < 10 || amount > 50000) {
      setPaymentStatus({
        type: 'error',
        message: 'Сумма должна быть от 10₽ до 50,000₽'
      });
      setTimeout(() => setPaymentStatus({ type: null, message: '' }), 5000);
      return;
    }

    // Валидация email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setPaymentStatus({
        type: 'error',
        message: 'Введите корректный email адрес'
      });
      setTimeout(() => setPaymentStatus({ type: null, message: '' }), 5000);
      return;
    }

    setIsProcessing(true);
    setPaymentStatus({ type: null, message: '' });

    try {
      // Подготовка данных для платежа
      const paymentData = {
        amount,
        email,
        username,
        paymentMethod
      };

      console.log('📦 Отправка платежных данных:', paymentData);
      
      // Вызов реального платежного API
      const result = await processPayment(paymentData);
      
      if (result.success && result.paymentUrl) {
        setPaymentStatus({
          type: 'success',
          message: `Платеж на сумму ${amount}₽ успешно создан! Перенаправляем на страницу оплаты Т-Банка...`
        });

        // Редирект на платежный шлюз Т-Банка
        setTimeout(() => {
          console.log('🔗 Перенаправление на:', result.paymentUrl);
          window.location.href = result.paymentUrl!;
        }, 2000);

      } else {
        const errorMessage = result.error || result.details || 'Неизвестная ошибка при создании платежа';
        console.error('❌ Ошибка платежа:', errorMessage);
        throw new Error(errorMessage);
      }

    } catch (error) {
      console.error('💥 Payment processing error:', error);
      setPaymentStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Произошла ошибка при обработке платежа. Попробуйте позже.'
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const scrollToSection = (sectionId: string) => {
    navigate('/');
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const paymentMethods = [
    { id: 'card', label: 'Банковская карта' },
    { id: 'sbp', label: 'СБП' },
    { id: 'qiwi', label: 'QIWI' },
    { id: 'yoomoney', label: 'ЮMoney' },
    { id: 'crypto', label: 'Криптовалюта' }
  ];

  return (
    <div className="donate-page">
      <div className="donate-container">
        {/* Заголовок страницы */}
        <div className="donate-header">
          <div className="donate-badge">
            <Shield size={16} />
            БЕЗОПАСНЫЕ ПЛАТЕЖИ
          </div>
          <h1 className="donate-title">ПОПОЛНЕНИЕ СЧЁТА</h1>
          <p className="donate-subtitle">
            Быстрое и безопасное пополнение игрового счета. Мгновенное зачисление средств
          </p>
        </div>

        <div className="donate-content">
          {/* Форма оплаты с УМЕНЬШЕННЫМ отступом справа */}
          <div className="payment-form-wrapper">
            <div className="payment-section">
              <h2 className="section-title">ФОРМА ОПЛАТЫ</h2>
              
              {/* Способ оплаты */}
              <div className="form-group">
                <label className="form-label">
                  <CreditCard size={18} />
                  Способ оплаты
                </label>
                <div className="methods-grid">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      className={`method-btn ${paymentMethod === method.id ? 'active' : ''}`}
                      onClick={() => setPaymentMethod(method.id)}
                      type="button"
                    >
                      {method.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Email */}
              <div className="form-group">
                <label className="form-label">
                  <Mail size={18} />
                  Введите вашу почту *
                </label>
                <input
                  type="email"
                  className="form-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@mail.ru"
                  required
                />
              </div>

              {/* Логин */}
              <div className="form-group">
                <label className="form-label">
                  <User size={18} />
                  Ваш логин *
                </label>
                <input
                  type="text"
                  className="form-input"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Ваш игровой никнейм"
                  required
                />
              </div>

              {/* Сумма */}
              <div className="form-group">
                <label className="form-label">
                  <DollarSign size={18} />
                  Введите сумму *
                </label>
                <div className="amount-input-group">
                  <input
                    type="number"
                    className="form-input amount-input"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    min="10"
                    max="50000"
                    required
                  />
                  <span className="currency">₽</span>
                </div>
                <div className="amount-presets">
                  {[100, 500, 1000, 2500, 5000].map((preset) => (
                    <button
                      key={preset}
                      className={`amount-preset ${amount === preset ? 'active' : ''}`}
                      onClick={() => setAmount(preset)}
                      type="button"
                    >
                      {preset}₽
                    </button>
                  ))}
                </div>
              </div>

              {/* Курс валют */}
              <div className="exchange-rate">
                <strong>Курс валют:</strong> {exchangeRate}
              </div>

              {/* Соглашения */}
              <div className="agreements">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    required
                  />
                  <span className="checkmark"></span>
                  Принимаю условия <a href="#" className="link">пользовательского соглашения</a> *
                </label>

                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={agreePrivacy}
                    onChange={(e) => setAgreePrivacy(e.target.checked)}
                    required
                  />
                  <span className="checkmark"></span>
                  Согласен на обработку персональных данных, в порядке, на условиях и в объёме, 
                  указанной в согласии, текст которого прочитан мною полностью *
                </label>
              </div>

              {/* Сообщения о статусе платежа */}
              {paymentStatus.type && (
                <div className={`payment-status ${paymentStatus.type}`}>
                  <div className="status-content">
                    {paymentStatus.type === 'success' ? (
                      <CheckCircle2 size={20} />
                    ) : (
                      <AlertCircle size={20} />
                    )}
                    <span>{paymentStatus.message}</span>
                    <button 
                      className="status-close"
                      onClick={() => setPaymentStatus({ type: null, message: '' })}
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              )}

              {/* Кнопка оплаты */}
              <button 
                className="payment-btn"
                onClick={handlePayment}
                disabled={!agreeTerms || !agreePrivacy || !email || !username || isProcessing}
              >
                {isProcessing ? (
                  <>
                    <Loader2 size={20} className="spinning" />
                    ПОДКЛЮЧЕНИЕ К Т-БАНК...
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={20} />
                    ПЕРЕЙТИ К ОПЛАТЕ
                  </>
                )}
              </button>

              {/* Информация о тестовом режиме */}
              <div style={{ 
                marginTop: '1rem', 
                padding: '0.75rem', 
                background: 'rgba(255, 193, 7, 0.1)', 
                border: '1px solid rgba(255, 193, 7, 0.3)',
                borderRadius: '0.5rem',
                color: '#ffc107',
                fontSize: '0.8rem',
                textAlign: 'center'
              }}>
                ⚠️ <strong>ТЕСТОВЫЙ РЕЖИМ</strong> - Используются демо-данные Т-Банка
              </div>
            </div>

            {/* Информационные карточки */}
            <div className="payment-info-section">
              <div className="info-card">
                <div className="info-icon">
                  <Shield size={24} />
                </div>
                <div className="info-content">
                  <h3>Безопасность платежей</h3>
                  <p>Все транзакции защищены Т-Банком и современными методами шифрования</p>
                </div>
              </div>
              <div className="info-card">
                <div className="info-icon">
                  <CheckCircle2 size={24} />
                </div>
                <div className="info-content">
                  <h3>Мгновенное зачисление</h3>
                  <p>Средства поступают на ваш счет сразу после подтверждения платежа</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Футер */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="footer-logo">ASTRA RP</div>
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
                  <li><a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('hero'); }}>Главная</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>О проекте</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('how-to-play'); }}>Как играть</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('/donate'); }}>Донат</a></li>
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
    </div>
  );
}

export default DonatePage;