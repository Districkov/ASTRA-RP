// ========== src/pages/DonatePage.tsx ==========
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DonatePage.css";
import { CreditCard, Mail, User, DollarSign, Shield, CheckCircle2, Loader2, AlertCircle, X, AlertTriangle } from 'lucide-react';
import AstraLogo from "./../assets/astra.png";
import DiscordIcon from "./../assets/DS.svg";
import VkIcon from "./../assets/Vk.svg";
import YoutubeIcon from "./../assets/Youtobe.svg";
import TelegramIcon from "./../assets/telega.svg";

// Интерфейсы валидации
interface ValidationError {
  field: string;
  message: string;
}

interface DonateFormData {
  email: string;
  username: string;
  amount: number;
  paymentMethod: string;
}

function DonatePage() {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [amount, setAmount] = useState(100);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [agreeOffer, setAgreeOffer] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: '' });
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);

  const exchangeRate = "1₽ = 2$ = 300 игровой валюты";

  // Расширенная валидация
  const validateForm = (formData: DonateFormData): ValidationError[] => {
    const errors: ValidationError[] = [];

    // Email валидация
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      errors.push({ field: 'email', message: 'Email обязателен' });
    } else if (!emailRegex.test(formData.email)) {
      errors.push({ field: 'email', message: 'Некорректный формат email' });
    } else if (formData.email.length > 100) {
      errors.push({ field: 'email', message: 'Email слишком длинный (максимум 100 символов)' });
    }

    // Username валидация
    if (!formData.username) {
      errors.push({ field: 'username', message: 'Имя пользователя обязательно' });
    } else if (formData.username.length < 3) {
      errors.push({ field: 'username', message: 'Имя пользователя должно быть не менее 3 символов' });
    } else if (formData.username.length > 32) {
      errors.push({ field: 'username', message: 'Имя пользователя не может быть более 32 символов' });
    } else if (!/^[a-zA-Z0-9_-]+$/.test(formData.username)) {
      errors.push({ field: 'username', message: 'Имя может содержать только буквы, цифры, подчеркивание и дефис' });
    }

    // Amount валидация
    if (!formData.amount || formData.amount === 0) {
      errors.push({ field: 'amount', message: 'Укажите сумму' });
    } else if (formData.amount < 10) {
      errors.push({ field: 'amount', message: 'Минимальная сумма 10₽' });
    } else if (formData.amount > 50000) {
      errors.push({ field: 'amount', message: 'Максимальная сумма 50,000₽' });
    } else if (!Number.isInteger(formData.amount)) {
      errors.push({ field: 'amount', message: 'Сумма должна быть целым числом' });
    }

    // Payment method валидация
    if (!formData.paymentMethod) {
      errors.push({ field: 'paymentMethod', message: 'Выберите способ оплаты' });
    }

    return errors;
  };

  const handlePayment = async () => {
    // Проверка всех согласий
    if (!agreeTerms || !agreePrivacy || !agreeOffer) {
      setPaymentStatus({
        type: 'error',
        message: 'Пожалуйста, согласитесь со всеми условиями и документами'
      });
      setValidationErrors([]);
      setTimeout(() => setPaymentStatus({ type: null, message: '' }), 5000);
      return;
    }

    // Валидация всех полей формы
    const formData: DonateFormData = {
      email,
      username,
      amount,
      paymentMethod
    };

    const errors = validateForm(formData);

    if (errors.length > 0) {
      setValidationErrors(errors);
      const errorMessages = errors.map(e => e.message).join(', ');
      setPaymentStatus({
        type: 'error',
        message: `Ошибка валидации: ${errorMessages}`
      });
      setTimeout(() => setPaymentStatus({ type: null, message: '' }), 6000);
      return;
    }

    // Очистка ошибок валидации если всё ОК
    setValidationErrors([]);
    setIsProcessing(true);
    setPaymentStatus({ type: null, message: '' });

    try {
      // ЗАГЛУШКА вместо реального платежа
      console.log('Payment data:', { email, username, amount, paymentMethod });
      
      // Имитация обработки платежа
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Расчет игровой валюты
      const gameBalance = amount * 300;
      
      // В реальном приложении здесь будет вызов API платежного шлюза
      setPaymentStatus({
        type: 'success',
        message: `✓ Платеж на сумму ${amount}₽ успешно создан! Вы получите ${gameBalance} игровой валюты. Спасибо за поддержку ASTRA-RP!`
      });
      
      // Очистка формы после успешного платежа (в демо режиме)
      setTimeout(() => {
        setEmail('');
        setUsername('');
        setAmount(100);
        setAgreeTerms(false);
        setAgreePrivacy(false);
        setAgreeOffer(false);
        setPaymentStatus({ type: null, message: '' });
        setValidationErrors([]);
      }, 5000);

    } catch (error) {
      console.error('Payment error:', error);
      setPaymentStatus({
        type: 'error',
        message: 'Произошла ошибка при обработке платежа. Попробуйте позже.'
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
                  Введите вашу почту
                </label>
                <input
                  type="email"
                  className={`form-input ${validationErrors.find(e => e.field === 'email') ? 'error' : ''}`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@mail.ru"
                />
                {validationErrors.find(e => e.field === 'email') && (
                  <span className="error-message">
                    <AlertTriangle size={14} />
                    {validationErrors.find(e => e.field === 'email')?.message}
                  </span>
                )}
              </div>

              {/* Логин */}
              <div className="form-group">
                <label className="form-label">
                  <User size={18} />
                  Ваш логин
                </label>
                <input
                  type="text"
                  className={`form-input ${validationErrors.find(e => e.field === 'username') ? 'error' : ''}`}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Ваш игровой никнейм"
                />
                {validationErrors.find(e => e.field === 'username') && (
                  <span className="error-message">
                    <AlertTriangle size={14} />
                    {validationErrors.find(e => e.field === 'username')?.message}
                  </span>
                )}
              </div>

              {/* Сумма */}
              <div className="form-group">
                <label className="form-label">
                  <DollarSign size={18} />
                  Введите сумму
                </label>
                <div className="amount-input-group">
                  <input
                    type="number"
                    className={`form-input amount-input ${validationErrors.find(e => e.field === 'amount') ? 'error' : ''}`}
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    min="10"
                    max="50000"
                  />
                  <span className="currency">₽</span>
                </div>
                {validationErrors.find(e => e.field === 'amount') && (
                  <span className="error-message">
                    <AlertTriangle size={14} />
                    {validationErrors.find(e => e.field === 'amount')?.message}
                  </span>
                )}
                <div className="amount-presets">
                  {[100, 500, 1000, 2500, 5000].map((preset) => (
                    <button
                      key={preset}
                      className={`amount-preset ${amount === preset ? 'active' : ''}`}
                      onClick={() => setAmount(preset)}
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
                  />
                  <span className="checkmark"></span>
                  Я прочитал и согласен с <a href="/terms-of-service" target="_blank" rel="noopener noreferrer" className="link">Пользовательским соглашением</a>
                </label>

                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={agreePrivacy}
                    onChange={(e) => setAgreePrivacy(e.target.checked)}
                  />
                  <span className="checkmark"></span>
                  Я согласен с <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="link">Политикой конфиденциальности</a> и даю согласие на обработку моих персональных данных
                </label>

                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={agreeOffer}
                    onChange={(e) => setAgreeOffer(e.target.checked)}
                  />
                  <span className="checkmark"></span>
                  Я ознакомлен с <a href="/offer-agreement" target="_blank" rel="noopener noreferrer" className="link">Публичной офертой</a> и принимаю условия оказания услуг
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
                disabled={!agreeTerms || !agreePrivacy || !agreeOffer || !email || !username || isProcessing}
              >
                {isProcessing ? (
                  <>
                    <Loader2 size={20} className="spinning" />
                    ОБРАБОТКА...
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={20} />
                    ПЕРЕЙТИ К ОПЛАТЕ
                  </>
                )}
              </button>
            </div>

            {/* Информационные карточки */}
            <div className="payment-info-section">
              <div className="info-card">
                <div className="info-icon">
                  <Shield size={24} />
                </div>
                <div className="info-content">
                  <h3>Безопасность платежей</h3>
                  <p>Все транзакции защищены современными методами шифрования</p>
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
                      <li><a href="/privacy-policy" target="_blank" rel="noopener noreferrer">Политика конфиденциальности</a></li>
                      <li><a href="/terms-of-service" target="_blank" rel="noopener noreferrer">Пользовательское соглашение</a></li>
                      <li><a href="/offer-agreement" target="_blank" rel="noopener noreferrer">Публичная оферта</a></li>
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